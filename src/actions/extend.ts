let actionsExtend: Actions = {
    stateUpdates: {},
    dropZoneActions: {},
    updateState: (updateID) => {
        try {
            const updateData = engine.actions.stateUpdates[updateID];
            Object.keys(updateData).forEach((item) => {
                engine.state.set(item, updateData[item]);
            });
        } catch (err) {
            console.error(err);
        }
    },
};

export default actionsExtend;