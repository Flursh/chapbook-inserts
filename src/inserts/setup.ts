/**
 * on cb link click, get stateupdate values and apply changes
 */
engine.event.prependListener("dom-click", (e: HTMLElement) => {
    if (e.dataset["stateupdate"]) {
        engine.actions.updateState(e.dataset.stateupdate);
    } else {
        console.log(e);
    }
});

// on passage-change check engine.actions.stateUpdates and cleanup changes from previous passage
engine.event.on("passage-change", (e) => {
    console.info(`changed passage from: "${e.previous}" -> to: "${e.passage}"`);

    // stateUpdates cleanup
    let filteredStateUpdates = Object.keys(engine.actions.stateUpdates).reduce(
        (acc, item) => {
            if (
                item.indexOf(encodeURI(e.passage)) !== -1 &&
                item.slice(0, 3) !== "ui_"
            ) {
                return {
                    ...acc,
                    [`${item}`]: engine.actions.stateUpdates[item],
                };
            } else {
                return { ...acc };
            }
        },
        {}
    );
    engine.actions.stateUpdates = { ...filteredStateUpdates };

    // drop zones cleanup
    let filteredDropZoneActions = Object.keys(
        engine.actions.dropZoneActions
    ).reduce((acc, item) => {
        if (
            item.indexOf(encodeURI(e.passage)) !== -1 &&
            item.slice(0, 3) !== "ui_"
        ) {
            return {
                ...acc,
                [`${item}`]: engine.actions.dropZoneActions[item],
            };
        } else {
            return { ...acc };
        }
    }, {});
    engine.actions.dropZoneActions = { ...filteredDropZoneActions };
});

// avoid issues with links not preventing default navigation from anchor
window.addEventListener("click", function (e) {
    let target = e.target as HTMLElement;
    if (target.dataset.cbGo || target.dataset.cbRevealPassage) {
        e.preventDefault();
    }
});
