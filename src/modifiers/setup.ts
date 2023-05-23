// remove choice list on link click
/**
 * choice need to be removed after cb-reveal
 * the clicked link has be moved out of the choice element
 * so that it renders outside of the now hidden element
 */
engine.event.prependListener("dom-click", (e: HTMLElement) => {
    if (
        (e?.dataset?.cbRevealPassage) &&
        e?.parentElement?.classList?.contains("choices")
    ) {
        e.parentElement.style.display = 'none';
        let parent = document.createElement('div');
        e.parentElement.insertAdjacentElement('afterend', parent);
        parent.appendChild(e)
    }
});