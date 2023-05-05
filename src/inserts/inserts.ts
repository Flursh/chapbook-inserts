export function effectThunder({ options }: any, repeat = 0) {
    const color1 = options.color1 || "inherit";
    const color2 = options.color2 || "black";
    const delayModifier = options.delay || 1;
    const infinite = options.infinite || false;

    const page = document.getElementById("backdrop") as HTMLElement;
    setTimeout(() => {
        page.style.backgroundColor = color2;
    }, Math.floor(Math.random() * 100) * delayModifier);

    setTimeout(() => {
        page.style.backgroundColor = color1;
        if (infinite) {
            effectThunder(options);
        } else if (repeat < 4) {
            effectThunder(options, repeat + 1);
        }
    }, Math.floor(Math.random() * 100 + 100) * delayModifier);
}

export function drawProgressBar({
    total = 10,
    value = Math.round(Math.random() * total + 1),
    filled = "◼︎",
    empty = "◻︎",
}) {
    const percentage = Math.round((value / total) * 100);
    let arr = Array(10)
        .fill(empty)
        .fill(filled, 0, Math.floor(percentage / 10));
    return arr.join("");
}

export function drawCircle({
    total = 100,
    value = Math.floor(Math.random() * total + 1),
    color = "#2289AD",
    scale = 0.5,
    label = false,
}) {
    const percentage = Math.round((value / total) * 100);
    const strokeDashArray = 565.48;
    return `<div class="circle-progress text-sm">
      ${
          label
              ? `<p class="text-center" style="margin:0 0 5px 0; padding:0">${label}</p>`
              : "<p></p>"
      }
      <div id="cont" style="display: flex; align-items: center; justify-content: center;width:${
          200 * scale
      }px; min-height: ${200 * scale}px; position: relative; margin: auto">
        <div style="position: absolute">${value}</div>
        <svg width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(-90deg) scale(${scale}); position: absolute">
          <circle r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="${strokeDashArray}" stroke-dashoffset="0" stroke-width=".3em" stroke="#eee"></circle>
          <circle id="bar" stroke-width="1em" r="90" stroke="${color}" cx="100" cy="100" fill="transparent" stroke-dasharray="${strokeDashArray}" stroke-dashoffset="${
        strokeDashArray * ((100 - percentage) / 100)
    }"></circle>
        </svg>
      </div>
      </div>`;
}

function setupUpdateState(changes: any) {
    let stateUpdateName = `${encodeURI(
        engine.state.get("trail").slice(-1).join("").replaceAll(" ", "")
    )}${Object.keys(engine.actions.stateUpdates).length}`;
    engine.actions.stateUpdates[stateUpdateName] = changes;
    return stateUpdateName;
}

export function createLink(dataType = "go", props: any) {
    let reservedKeys = ["dest", "label"];
    const changes = Object.keys(props).reduce((acc, item) => {
        if (reservedKeys.indexOf(item) == -1) {
            return { ...acc, [item]: props[item] };
        } else {
            return acc;
        }
    }, {});

    if (dataType === "close-dialog") {
        if (Object.keys(changes).length > 0) {
            let stateUpdateName = setupUpdateState(changes);
            return `<a href=javascript.void(0) data-dialog="close" data-cb-close-dialog='true' ${
                Object.keys(changes).length > 0
                    ? `data-stateupdate="${stateUpdateName}"`
                    : ""
            } data-cb-${dataType}="${props.dest}">${
                props.label ? props.label : props.dest
            }</a>`;
        } else {
            return `<a href=javascript.void(0) data-dialog="close" data-cb-close-dialog='true' data-cb-${dataType}="${
                props.dest
            }">${props.label ? props.label : props.dest}</a>`;
        }
    } else if (dataType === "dialog") {
        if (Object.keys(changes).length > 0) {
            let stateUpdateName = setupUpdateState(changes);
            return `<a href=javascript.void(0) data-dialog="load" ${
                Object.keys(changes).length > 0
                    ? `data-stateupdate="${stateUpdateName}"`
                    : ""
            } data-cb-${dataType}="${props.dest}">${
                props.label ? props.label : props.dest
            }</a>`;
        } else {
            return `<a href=javascript.void(0) data-dialog="load" data-cb-close-dialog='true' data-cb-${dataType}="${
                props.dest
            }">${props.label ? props.label : props.dest}</a>`;
        }
    }

    if (Object.keys(changes).length > 0) {
        let stateUpdateName = setupUpdateState(changes);
        return `<a href=javascript.void(0) ${
            Object.keys(changes).length > 0
                ? `data-stateupdate="${stateUpdateName}"`
                : ""
        } data-cb-${dataType}="${props.dest}">${
            props.label ? props.label : props.dest
        }</a>`;
    } else {
        return `<a href=javascript.void(0) data-cb-${dataType}="${
            props.dest
        }">${props.label ? props.label : props.dest}</a>`;
    }
}

export function createDropZone(props: any) {
    let reservedKeys = ["accept", "label", "highlighted"];
    const changes = Object.keys(props).reduce((acc, item) => {
        if (reservedKeys.indexOf(item) == -1) {
            return { ...acc, [item]: props[item] };
        } else {
            return acc;
        }
    }, {});

    let dropZoneActionName = `${encodeURI(
        engine.state.get("trail").slice(-1).join("").replaceAll(" ", "")
    )}${Object.keys(engine.actions.dropZoneActions).length}`;
    engine.actions.dropZoneActions[dropZoneActionName] = changes;
    return `<span class='dropzone ${
        props.highlighted ? "highlighted" : ""
    }' data-itemdestination='${dropZoneActionName}' data-destinationaccept='${
        props.accept
    }'>${props.label}</span>`;
}

export function createItem(item: string, props: any) {
    if (props.src) {
        return `<div>
        <figure ${props.replace && 'data-replace="' + props.replace + '"'} class="item${props.highlighted && ' highlighted'}" data-item="${item}" draggable="true">
            <img src="${props.src}" alt="${props.label}"/>
        </figure>
</div>`
    } else {
        return `<div>
    <div class="item${props.highlighted && ' highlighted'}" data-item="${item}" draggable="true" ${props.replace && 'data-replace="' + props.replace + '"'}>${props.label}</div>
</div>`
    }
}

export function obscureString(
    str: string,
    intensity: string | boolean = false,
    shuffle = false,
    blurry = 0
) {
    let res = str;
    if (shuffle) {
        res = res
            .split("")
            .sort(() => 0.5 - Math.random())
            .join("");
    }
    if (intensity === "high") {
        res = res
            .split("")
            .map((letter) => [letter, "✦", "・"][Math.round(Math.random() * 2)])
            .join("");
    } else if (intensity === "medium") {
        res = res
            .split("")
            .map(
                (letter) =>
                    [letter, letter, letter, "✦", "・"][
                        Math.round(Math.random() * 4)
                    ]
            )
            .join("");
    }
    return `<span class='scramble' style='filter: blur(${blurry}px)'>${res}</span>`;
}
