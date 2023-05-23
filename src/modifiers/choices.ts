import { createLink } from "../inserts/inserts";

function choices (output: { text: string; startsNewParagraph?: boolean }, choiceAction: string = 'go') {
    try {
        if (choiceAction === 'reveal') {
            choiceAction = 'reveal-passage'
        } else {
            choiceAction = 'go'
        }
        // get text from between double brackets and handle them as an array
        const choices = output.text.replace(/ {4}|[\t\n\r]/gm,'').match(/(?<=\[\[).*?(?=\]\])/g) || [];
        output.text = '<section class="choices">';
        for (let choice of choices) {
            let linkArgs = choice.split('->');
            let [label, destination] = linkArgs.map(arg => arg.trim());
            if (!destination) destination = label;
            let props = destination.split('[',2)[1]?.trim() || false;
            let propsObject = {};
            if (props) {
                destination = destination.split('[',2)[0].trim();
                propsObject = props.split(/,(?=(?:(?:[^'"]*['"]){2})*[^'"]*$)/).reduce((acc: any, prop: string) => {
                    if (!prop) return acc;
                    let [key, value] = prop.split(/:(?=(?:(?:[^'"]*['"]){2})*[^'"]*$)/)?.map(item => item.trim());
                    let val = value;
                    try {
                        val = eval(value)
                    } catch (error) {
                        console.error(error)
                    }
                    return { ...acc, [key] : val }
                }, {});
            }
            output.text += createLink(choiceAction, { dest: destination, label: label, ...propsObject})
        }
        output.text += '</section>';
    } catch(error) {
        console.error(error)
    }
}

export default choices;