/**
 * created custom engine definition
 * to be updated along the way :)
 */

// helper for suggested string values with default to string type
type AnyString = string & {};

// engine object interface
interface Engine {
    state: State;
    actions: Actions;
    event: Event;
    dialog: Dialog;
    story: Story;
    [x: string]: any;
}

interface State {
    inventory: Inventory;
    /** creates a new entry in local storage save array */
    saveToSlot(name: string, update?: boolean): void;
    /** loads state from local storage save array */
    loadFromSlot(name: string);
    /** changes trail to append passage name */
    goToPassage(passageName: string): void;
    /** get property from state, can be dot notation for nested properties */
    get(str: string): any;
    /** set property in state, key can be dot notation for nested properties */
    set(key: string, value: any): void;
    /** missing properties */
    [x: string]: any;
}

interface Inventory {
    /** string separated by commas : stick,gold,dagger */
    add(str: string): boolean;
    /** string separated by commas : stick,gold,dagger */
    remove(str: string): void;
    /** single item name, removes all equal to string */
    removeAll(str: string): void;
    /** single item name, returns amount of occurences */
    count(str: string): number;
    /** single item name, returns boolean representing its occurence */
    has(str: string): boolean;
    /** initializes state.inventory with specified length */
    init(length?: number): string[];
}

interface Actions {
    /** object instructing how to update the state */
    stateUpdates: {
        [x: string]: { [x: string]: any };
    };
    /** object instructing how to update the state on drop event */
    dropZoneActions: {
        [x: string]: { [x: string]: any };
    };
    /** gets a value in stateUpdates and updates the state with its content */
    updateState(updateID: string): void;
}

interface Event {
    /** listens for events */
    on(
        /** dom-xxx are mirrored from any element with a cb- dataset */
        event:
            | "dom-click"
            | "passage-change"
            | "state-change"
            | "saved-slot"
            | "loaded-slot"
            | "save-error"
            | AnyString,
        callback: (e?: any) => void
    ): void;
    /** missing properties */
    [x: string]: any;
}

interface Dialog {
    /** closes the dialog if open */
    close(): void;
    /** show generic dialog */
    showDialog(message: string, hideClose?: boolean): void;
    /** show error in dialog, displays Error() objects' message */
    showDialogError(error: { message: string; [x: string]: any });
    /** show Info style dialog */
    showDialogInfo(message: string);
    /** show Success style dialog */
    showDialogSuccess(message: string);
    /** show Warning style dialog */
    showDialogWarning(message: string);
}

interface Story {
    /** returns story's ifid value */
    ifid(): string;
    /** return story's name */
    name(): string;
    /** get passage data by name */
    passageNamed(name: string): Passage;
    /** get passage data by id */
    passageWithId(id: number): Passage;
    /** get all passages */
    passages(): Passage[];
    /** get passage defined as starting point */
    startPassage(): Passage;
    /** missing properties */
    [x: string]: any;
}

interface Passage {
    /** passage unique id index */
    id: number;
    /** passage name */
    name: string;
    /** raw passage content */
    source: string;
    /** list of tags attached to the passage */
    tags: string[];
}

declare var engine: Engine;
declare var config: any;
declare var hljs: any;
interface Window {
    setup: any;
}