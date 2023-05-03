engine.event.on("saved-slot", (e) =>
    engine.dialog.showDialogSuccess(`save [${e.name}] saved!`)
);
engine.event.on("loaded-slot", (e) =>
    engine.dialog.showDialogSuccess(`save [${e.name}] loaded successfully!`)
);
engine.event.on("save-error", (e) => 
    engine.dialog.showDialogError(e.error)
);

window.setup.createNewSave = function createNewSave(id: string) {
    let input = document.getElementById(id) as HTMLInputElement;
    let name = input?.value;
    engine.state.saveToSlot(name, false);
};
