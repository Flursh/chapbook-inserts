// emit passage-change event if the last trail item isn't the same as the previous one on state change
import './modifiers/setup.ts'

engine.event.on(
    "state-change",
    (e: { name: string; previous: any; value: any }) => {
        try {
            if (e.name === "trail" && e.previous.at(-1) !== e.value.at(-1)) {
                engine.event.emit("passage-change", {
                    previous: e.previous.at(-1),
                    passage: e.value.at(-1),
                });
            }
        } catch (error) {
            console.warn(error);
        }
    }
);

// highlightjs
function affixScriptToHead(url: string, onloadFunction?: () => any) {
    try {
        const newScript = document.createElement("script");
        newScript.onerror = (e: Event | string) => {
            throw new Error(typeof e === "string" ? e : e.message);
        };
        if (onloadFunction) {
            newScript.onload = onloadFunction;
        }
        document.head.appendChild(newScript);
        newScript.src = url;
    } catch (error) {
        console.error(error);
    }
}

affixScriptToHead(
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js",
    () => {
        console.info("script loaded");
        hljs.configure({
            ignoreUnescapedHTML: true,
        });
        hljs.highlightAll();
    }
);

/** ugly implementation to load after passage render */
engine.event.on("passage-change", () => {
    setTimeout(() => {
        document.querySelectorAll("#page pre code").forEach((el) => {
            let txt = el.textContent as string;
            el.textContent = txt.trim();
            hljs.highlightElement(el);
        });
    }, 200);
});
