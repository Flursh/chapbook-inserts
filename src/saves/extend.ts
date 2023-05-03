export const savesExtend = {
    saveToSlot : function saveState(
        name: string,
        update: boolean = false
    ) {
        try {
            let saves = localStorage.getItem(`saves-${engine.story.ifid() ? engine.story.ifid() : engine.story.name()}`) || '[]'
            let savesJson = JSON.parse(saves);
    
            if (!name) {
                throw new Error('name cannot be empty')
            } else if (savesJson.find((item:any) => item.name === name) && !update) {
                throw new Error(`Error : save with name ${name} already exists`)
            }
    
            let save = {
                name: name,
                state: JSON.stringify(engine.state.saveToObject())
            }
    
            localStorage.setItem(
                `saves-${engine.story.ifid() ? engine.story.ifid() : engine.story.name()}`,
                JSON.stringify([
                    ...savesJson.filter((item:any) => item.name !== name),
                    save
                ])
            )
            engine.event.emit('saved-slot', {
                name: name
            })
        } catch (error) {
            engine.event.emit('save-error', {
                error: error
            })
        }
    },
    loadFromSlot: function loadState(
        name: string
    ) {
        try {
            let saves = localStorage.getItem(`saves-${engine.story.ifid() ? engine.story.ifid() : engine.story.name()}`) || '[]'
            let savesJson = JSON.parse(saves);

            if (!name) {
                throw new Error('name cannot be empty')
            } else if (!savesJson.find((item: any) => item.name === name)) {
                throw new Error(`Error : save with name ${name} doesn't exist`)
            }

            let save = savesJson.find((item: any) => item.name === name);
            engine.state.restoreFromObject(JSON.parse(save.state));

            engine.event.emit('loaded-slot', {
                name: name
            })
        } catch (error) {
            engine.event.emit('save-error', {
                error: error
            })
        }
    }
}

export default savesExtend;