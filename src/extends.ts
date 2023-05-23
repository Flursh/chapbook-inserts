import dialogExtend from "./dialog/extend";
import inventoryExtend from "./inventory/extend";
import actionsExtend from "./actions/extend";
import savesExtend from "./saves/extend";
import { link, drop, playEffect, draw, item, obscure } from "./inserts/extend";
import { sceneModifier, choicesModifier } from "./modifiers/extend";

import "./inserts/setup";

engine.extend("1.2.3", () => {
    engine.state = {
        ...engine.state,
        ...savesExtend,
        inventory: inventoryExtend,
    };
    engine.dialog = dialogExtend;
    engine.actions = actionsExtend;
    config.template.inserts = [
        link,
        drop,
        playEffect,
        draw,
        item,
        obscure,
        ...config.template.inserts,
    ],
    config.template.modifiers = [
        sceneModifier,
        choicesModifier,
        ...config.template.modifiers
    ]
});
