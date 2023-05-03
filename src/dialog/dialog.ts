// setup elements
let dialog = document.createElement("dialog");
dialog.id = "dialog";
let closeModal = document.createElement("button");
closeModal.className = "close-modal";
let dialogContent = document.createElement("div");
dialogContent.className = "dialog-content";
dialog.prepend(closeModal, dialogContent);

document.body.prepend(dialog);

// event listeners for close modal

closeModal.addEventListener("click", () => dialog.close());

dialog.addEventListener("close", () => {
    dialog.className = "";
    dialog.close();
});

document.addEventListener("click", (e) => {
    let target = e.target as HTMLElement;
    if (target.dataset?.dialog === "close") {
        e.preventDefault();
        dialog.close();
    } else if (target.dataset?.dialog === "load") {
        e.preventDefault();
        if (!target.dataset.cbDialog) {
            console.error('cb-dialog dataset is not defined')
        } else if (!engine.story.passageNamed(target.dataset.cbDialog)) {
            console.error(`no passage named ${target.dataset.cbDialog}`)
        } else {
            engine.dialog.showDialog(
                engine.render(engine.story.passageNamed(target.dataset.cbDialog).source)
            );
        }
        
    }
});

export { dialog, dialogContent, closeModal };
