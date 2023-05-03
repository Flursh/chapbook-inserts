const inventoryExtends: Inventory = {
    add: (str) => {
        let inventoryData = engine.state.get("inventory");
        let addArray = str.split(",");
        let addedAll = true;
        for (let item of addArray) {
            // check for empty slot
            let index = inventoryData.indexOf("");
            if (index === -1) {
                console.warn(`no open slot for ${item} in inventory`);
                addedAll = false;
            } else {
                inventoryData[index] = item;
            }
        }
        engine.state.set("inventory", [...inventoryData]);
        return addedAll;
    },
    remove: (str) => {
        let inventoryData = engine.state.get("inventory");
        let removeArray = str.split(",");
        for (let item of removeArray) {
            // check for empty slot
            let index = inventoryData.indexOf(item);
            if (index === -1) {
                console.warn(`cannot remove ${item} from inventory : no item in inventory`);
            } else {
                inventoryData[index] = "";
            }
        }
        engine.state.set("inventory", [...inventoryData]);
    },
    removeAll: (str) => {
        let inventoryData = engine.state.get("inventory");
        let cleanedInventory = inventoryData.map((item: string) =>
            item !== str ? item : ""
        );
        engine.state.set("inventory", [...cleanedInventory]);
    },
    count: (str) => {
        let inventoryData = engine.state.get("inventory") || [];
        let count = inventoryData.filter((item: string) => item == str).length;
        return count;
    },
    has: (str) => {
        let inventoryData = engine.state.get("inventory");
        return inventoryData.indexOf(str) === -1 ? false : true;
    },
    init: (size = 5) => {
        let inventoryList = new Array(size);
        inventoryList.fill("");
        return inventoryList;
    },
};

export default inventoryExtends;
