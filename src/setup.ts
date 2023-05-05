function affixScriptToHead(url: string, onloadFunction?: () => any) {
    const newScript = document.createElement("script");
    newScript.onerror = (e:Event | string) => { throw new Error((typeof e === 'string') ? e : e.message) };
    if (onloadFunction) {
        newScript.onload = onloadFunction;
    }
    document.head.appendChild(newScript);
    newScript.src = url;
}

affixScriptToHead('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js', () => {
    console.info('script loaded');
    hljs.configure({
        ignoreUnescapedHTML: true
    })
    hljs.highlightAll();
})

/** ugly implementation to load after passage render */
engine.event.on('passage-change', () => {
    setTimeout(() => {
        document.querySelectorAll('#page pre code').forEach((el) => {
            hljs.highlightElement(el);
          });
    }, 200)
  });