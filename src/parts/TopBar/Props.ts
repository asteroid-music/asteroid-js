//Imports from React module
import React from 'react';

/**
 * Interface for props for the <TopBar> React component.
 * Details for each individual property is given in comments below.
 */
interface TopBarProps {
    /** List of tab names to generate buttons for */
    tabNames: string[],

    /** List of subtab names to generate buttons for */
    subTabNames?: string[],

    /** Currently selected tab, if relevant */
    currTab?: string,

    /** Currently selected subtab, if relevant */
    currSubTab?: string,

    /**
     * Callback function for the tab bar's onChange attribute
     *
     * @param {object} event: the onChange event
     * @param {string} tabName: the name of the tab that is clicked
     */
    tabCallback: (event: React.ChangeEvent<{}>, tabName: string) => void,

    /**
     * Callback function for the subtab bar's onChange attribute
     *
     * @param {object} event: the onChange event
     * @param {string} subTabName: the name of the subtab that is clicked
     */
    subTabCallback: (event: React.ChangeEvent<{}>, subTabName: string) => void,
}

export default TopBarProps
