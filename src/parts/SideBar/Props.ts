//Imports from React module
import React from 'react';

/**
 * Interface for props for the <SideBar> React component.
 * Details for each individual property is given in comments below.
 */
interface SideBarProps {
    /** Name of the tab */
    tabName: string,
    /** List of tab names to generate buttons for */
    linkNames: string[],
    /** Whether to be open */
    open: boolean,
    /** Callback to call upon closing */
    closeCallback: ()=>void
}

export default SideBarProps
