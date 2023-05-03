/**
 * import all the assets you want to get to the final build in story/dist
 * example :
 * import './css/style.css'
 * import { setupCounter } from './js/counter.ts'
 */

// css
import "./styles/main.scss";
//ts
import "./setup";
import "./inventory/setup";
import "./saves/setup";

// all extends
import "./extends";

config.header.transition.duration = '300ms';
config.footer.center = "{embed passage: `UI : inventory`}";
config.footer.right = "{embed passage: `UI : saves`}";
config.header.center = "{embed passage: `UI : warning`}";
config.footer.left = "{back link, label: 'Back'}"
if (!engine.state.get("init")) {
    let inventoryList = engine.state.inventory.init(10);
    inventoryList[0] = "cephalopod";
    inventoryList[1] = "brocoli";
    inventoryList[2] = "dagger";
    inventoryList[3] = "skull";

    const initMap: [key: string, value: any][] = [
        ["init", true],
        ["loopCount", 0],
        ["playerName", false],
        ["suspicious", 0],
        ["stressed", 0],
        ["hurt", 0],
        ["insight.stats", false],
        ["insight.statsLabel", false],
        ["insight.self", false],
        ["inventory", [...inventoryList]],
    ];
    const initVariables = new Map(initMap);

    for (let [key, value] of initVariables) {
        engine.state.set(key, value);
    }
}
