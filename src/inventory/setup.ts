window.setup = window.setup || {};
// update inventory on stateChange if property addToInventory isn't empty
engine.event.addListener("state-change", () => {
    try {
        let addToInventory = engine.state.get("addToInventory");
        if (addToInventory) {
            engine.state.set("addToInventory", "");
            engine.state.inventory.add(addToInventory);
        }
        let removeFromInventory = engine.state.get("removeFromInventory");
        if (removeFromInventory) {
            engine.state.set("removeFromInventory", "");
            engine.state.inventory.remove(removeFromInventory);
        }
    } catch (error) {
        console.error(error);
    }
});

window.addEventListener("dragenter", (e) => e.preventDefault());

window.addEventListener("dragstart", (e: DragEvent) => {
    let target = e.target as HTMLElement;
    if (typeof target.dataset?.item === "string") {
        e.dataTransfer?.clearData();
        if (target.dataset?.itemslot) {
            /** if itemslot, tack index of item to swap position */
            e.dataTransfer?.setData(
                "text/plain",
                `${target.dataset.item},${Array.from(
                    target.parentElement?.children || []
                ).indexOf(target)}`
            );
        } else {
            e.dataTransfer?.setData("text/plain", `${target.dataset.item},-1`);
            /** if it needs to be removed and replaced on drop */
            if (target.dataset?.replace) {
                window.setup.activeDragItem = {
                    el: target,
                    replace: target.dataset?.replace || "[nothing]",
                };
            }
        }
        target.classList.add("dragging");
    }
});

window.addEventListener("dragend", (e) => {
    let target = e.target as HTMLElement;
    /** delete activeDragItem to avoid having it around on the window forever */
    delete window.setup.activeDragItem;
    if (target.classList?.contains("dragging")) {
        target.classList.remove("dragging");
    }
});

window.addEventListener("dragover", (e) => {
    e.preventDefault();
    let target = e.target as HTMLElement;
    if (target.dataset?.itemslot || target.dataset?.itemdestination) {
        target.classList.add("dragover");
    }
});

window.addEventListener("dragleave", (e) => {
    e.preventDefault();
    let target = e.target as HTMLElement;
    if (target.dataset?.itemslot || target.dataset?.itemdestination) {
        target.classList.remove("dragover");
    }
});

/** if original item is not part of the slots, it may have to be removed */
function replaceOriginalItem() {
    window.setup.activeDragItem.el.parentElement.innerHTML = window.setup.activeDragItem.replace;
    delete window.setup.activeDragItem;
}

window.addEventListener("drop", (e) => {
    let target = e.target as HTMLElement;
    target.classList.remove("dragover");
    if (target.dataset?.itemslot) {
        e.preventDefault();
        /** switch the position of the items */
        try {
            let [item, slotIndex] = e.dataTransfer
                ?.getData("text/plain")
                .split(",") || ["", "-1"];
            let inventoryData = engine.state.get("inventory");
            let targetIndex = Array.from(
                target.parentElement?.children || []
            ).indexOf(target);
            let itemInDestination = inventoryData[targetIndex];
            /** if you drag an item ouside of the inventory to the inventory
             * if it is dropped on an occupied inventory slot
             * it will try to add to the next open slot or issue a warning
             **/
            if (slotIndex === "-1" && itemInDestination !== "") {
                let itemAdded = engine.state.inventory.add(item);
                itemAdded && replaceOriginalItem();
            } else {
                inventoryData[targetIndex] = item;
                inventoryData[Number(slotIndex)] = itemInDestination;
                engine.state.set("inventory", [...inventoryData]);
                if (window.setup.activeDragItem) {
                    replaceOriginalItem();
                }
            }
        } catch (err: any) {
            throw new Error(err);
        }
    } else if (target.dataset.itemdestination) {
        e.preventDefault();
        try {
            let [item, slotIndex] = e.dataTransfer
                ?.getData("text/plain")
                .split(",") || ["", "-1"];
            let destinationData =
                engine.actions.dropZoneActions[target.dataset.itemdestination];
            let destinationAccept =
                target.dataset?.destinationaccept?.split(",") || [];
            if (destinationAccept.indexOf(item) === -1) {
                console.warn(`"${item}" not supported in drop zone`);
                engine.event.emit('wrong-item-drop', item);
            } else {
                try {
                    console.log(target.dataset.itemdestination);
                    Object.keys(destinationData).forEach((update) => {
                        const [draggedItem, property] = update.split(".");
                        if (item === draggedItem) {
                            if (property === "remove") {
                                if (destinationData[update] === "all") {
                                    let res = engine.state
                                        .get("inventory")
                                        .filter(
                                            (i: string) => i !== draggedItem
                                        );
                                    engine.state.set("inventory", [...res]);
                                } else if (destinationData[update]) {
                                    let inv = engine.state.get("inventory");
                                    inv[slotIndex] = "";
                                    console.log(inv);
                                    engine.state.set("inventory", [...inv]);
                                }
                            } else if (property === "dialog") {
                                let dest = engine.story.passageNamed(
                                    destinationData[update]
                                );
                                console.log(dest);
                                if (!dest) {
                                    console.error(
                                        `no passage named ${destinationData[update]}`
                                    );
                                } else {
                                    engine.dialog.showDialog(
                                        engine.render(dest.source)
                                    );
                                }
                            } else {
                                engine.state.set(
                                    property,
                                    destinationData[update]
                                );
                            }
                        }
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }
});
