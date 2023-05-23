/**
 * creates a scene section to better handle conversations
 * defined as [scene classes] ... [continue]
 * each section is handled by a tag defining the classes
 * to apply to the session in --(classes):
 * for example :
 * [scene grim]
 * --(amanda tired left): I don't want to have this conversation
 * --(john angry right): Well, we're having it wether you like it or not!
 * --(description):Amanda froze for a second, her fists were tightening. She turned around and with her teeth clenched she says
 * --(amanda angry left): Of course _you_ get to decide right ? it's always _your_ pace, _your_ decisions, right?
 * [continue]
 */
function scene(output: { text: string; startsNewParagraph?: boolean }, sceneClasses?: string) {
    const sections = output.text.split("--(");
    console.log(sections);

    output.text = `<p></p><section class='scene ${sceneClasses}'>`;
    for (let section of sections) {
        if (!section) continue;
        let [classes, content] = section.split("):", 2);
        output.text += `
<div class="${classes}">
    ${engine.render(content)}</div>`;
    }
    output.text += "</section>";
}

export default scene;
