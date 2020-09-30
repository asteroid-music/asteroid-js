/**
 * Interface describing an object with the same elements as SubTabObject
 */
interface SubTabObjectLike {
    /** The name of the tab */
    name: string;

    /** A string array containing names of subtabs */
    component: React.ComponentType<any>;
}

/**
 * Interface describing an object with the same elements as TabObject
 */
interface TabObjectLike {
    /** The name of the tab */
    name: string;

    /** A subtab array containing names of subtabs */
    subtabs: SubTabObjectLike[];
}

class SubTabObject {
    /** The name of the subtab */
    name: string;

    /** The component of the subtab */
    component: React.ComponentType<any>;

    /**
     * Constructor method
     *
     * @param {object} rawJson: a raw json representing the object
     */
    constructor(rawJson: SubTabObjectLike) {
        this.name = rawJson.name;
        this.component = rawJson.component;
    }

}

/**
 * Class describing named tab, along with strings representing all the subtabs
 * it contains
 */
class TabObject {
    /** The name of the tab */
    name: string;

    /** A string array containing names of subtabs */
    subtabs: SubTabObject[];

    /**
     * Constructor method
     *
     * @param {object} rawJson: a raw json representing the object
     */
    constructor(rawJson: TabObjectLike) {
        this.name = rawJson.name;
        this.subtabs = rawJson.subtabs.map((item: SubTabObjectLike) => {
            return new SubTabObject(item);
        });
    }

    /**
     * Gets a list of names of subtabs in the tab
     *
     * @returns {string[]} tablist: the name of each subtab
     */
    nameList() {
       return this.subtabs.map((subtab: SubTabObject) => {
            return subtab.name;
       });
    }

    /**
     * Checks if the subtab is present in the tab
     *
     * @param {string} subtab: the name of the subtab to check for
     *
     * @returns {boolean} isin: true if subtab is in the tab; false otherwise
     */
    includes(subtab:string) {
        return this.nameList().includes(subtab);
    }

    /**
     * Returns the subtab specified by the given subtab name,
     *      or 'null' if none exists
     *
     * @param {string} subtab: the name of the subtab to get
     *
     * @returns {SubTabObject | null} subtab: the specified subtab if exists;
     *      'null' otherwise
     */
    get(subtab:string) {
        let objIndex: number = this.nameList().indexOf(subtab);
        if (objIndex === -1) {
            return null;
        } else {
            return this.subtabs[objIndex];
        }
    }
}

/**
 * Class describing an array of named tabs
 */
class TabArray {
    /** Encapsulated array */
    tabs: TabObject[];

    /**
     * Constructor method
     *
     * @param {object} rawJson: a raw json representing the object
     */
    constructor(rawJson: TabObjectLike[]) {
        this.tabs = rawJson.map((item: TabObjectLike) => {
            return new TabObject(item);
        });
    }

    /**
     * Gets a list of names of tabs in the array
     *
     * @returns {string[]} tablist: the name of each tab
     */
    nameList() {
       return this.tabs.map((tab: TabObject) => {
            return tab.name;
       });
    }

    /**
     * Checks if the tab is present in the array
     *
     * @param {string} tab: the name of the tab to check for
     *
     * @returns {boolean} isin: true if tab is in the tab array;
     *      false otherwise
     */
    includes(tab:string) {
        return this.nameList().includes(tab);
    }

    /**
     * Returns the tab specified by the given tabname, or 'null' if none exists
     *
     * @param {string} tab: the name of the tab to get
     *
     * @returns {TabObject | null} tab: the specified tab if exists;
     *      'null' otherwise
     */
    get(tab:string) {
        let objIndex: number = this.nameList().indexOf(tab);
        if (objIndex === -1) {
            return null;
        } else {
            return this.tabs[objIndex];
        }
    }
}

export { TabObjectLike, TabObject, TabArray }
