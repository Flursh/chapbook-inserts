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

config.body.transition.duration = '200ms'
config.header.transition.duration = '200ms';
config.footer.center = "{embed passage: `UI : inventory`}";
config.footer.right = "{embed passage: `UI : saves`}";
config.header.left= "[[⇢ main menu->introduction]]";
config.footer.left = "<div class='nav'>{back link, label: '↩︎ Back'}</div>";
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
