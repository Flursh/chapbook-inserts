import {
    createLink,
    createDropZone,
    drawCircle,
    drawProgressBar,
    effectThunder,
    createItem,
    obscureString,
} from "./inserts";

export let link = {
    /**
     * used as lk: 'go', dest: 'destination passage', label: 'text in the link', variable: newVal, otherVar: otherVar + 10
     * each variable outside of dest and label will be appended to the session's state
     * existing variables will be updated, and they can reference other state variables
     * to change properties of an object, put in in quotes as in {lk: 'go', dest: 'destination', 'object.property':value}
     */

    match: /^lk$/i,
    render: (type: string, props: any) => {
        const lkMap = new Map();
        lkMap.set("go", () => createLink("go", props));
        lkMap.set("reveal", () => createLink("reveal-passage", props));
        lkMap.set("closeDialog", () => createLink("close-dialog", props));
        lkMap.set("dialog", () => createLink("dialog", props));

        const handler = lkMap.get(type);

        if (!handler) {
            console.error(`link of type ${type} doesn't exist`);
            return "";
        }

        return handler();
    },
};

export let drop = {
    /**
     * used as {drop: 'item', highlighted: true, accept: 'brocoli,dagger', "brocoli.suspicious": suspicious + 5, "brocoli.remove": true, "dagger.suspicious": suspicious + 9, label: 'test me'}
     */

    match: /^drop$/i,
    render: (type: string, props: any) => {
        const dropMap = new Map();
        dropMap.set("item", () => createDropZone(props));

        const handler = dropMap.get(type);

        if (!handler) {
            console.error(`dropZone of type ${type} doesn't exist`);
            return "";
        }

        return handler();
    },
};

export let playEffect = {
    // used as playEffect:'effectName',...props

    match: /^playEffect$/i,
    render: (type: string, props: any) => {
        const effectMap = new Map();

        effectMap.set("thunder", () => effectThunder(props));

        const handler = effectMap.get(type);

        if (!handler) {
            console.error(`effect of type ${type} doesn't exist`);
            return "";
        }
        handler();
        return "";
    },
};

export let draw = {
    // used as draw:'visName',...props

    match: /^draw$/i,
    render: (type: string, props: any) => {
        const drawMap = new Map();

        drawMap.set("progressBar", () => drawProgressBar(props));
        drawMap.set("circle", () => drawCircle(props));

        const handler = drawMap.get(type);

        if (!handler) {
            console.error(`draw of type ${type} doesn't exist`);
            return "";
        }

        return handler();
    },
};

export let item = {
    match: /^item$/i,
    render: (item: string, props: any) => {
        console.log(props);

        const handler = () => {
            return createItem(item, props);
        };
        return handler();
    },
};

export let obscure = {
    // used as {obscure: 'string', intensity: 'high', scramble: true, blurry: 3}

    match: /^obscure$/i,
    render: (string: string, props: any) => {
        console.log(props);

        const handler = () => {
            return obscureString({
                string: string,
                intensity: props.intensity,
                characters: props.characters,
                shuffle: props.shuffle,
                blurry: props.blurry
            });
        };

        return handler();
    },
};
