import scene from "./scene";
import choices from "./choices";

export let sceneModifier = {
    match: /^scene\b/i,
    process(
        output: { text: string; startsNewParagraph?: boolean },
        { invocation }: { state: any; invocation: string }
    ) {
        let sceneClasses = invocation?.replace("scene", "") || "";
        scene(output, sceneClasses);
    },
};

export let choicesModifier = {
    match: /^choices\b/i,
    processRaw(
        output: { text: string; startsNewParagraph?: boolean },
        { invocation }: { state: any; invocation: string }
    ) {
        let choiceAction = invocation?.replace("choices", "").trim() || "go";
        choices(output, choiceAction);
    },
};