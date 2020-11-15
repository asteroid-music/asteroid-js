/**
 * State interface for the <TopBar> component
 * Details for each individual property is given in comments below.
 */
interface TopBarState {
    /** Whether the sidebar should be open */
    sidebarOpen: boolean,
    /** Name of the currently open sidebar */
    sidebarName: string,
    /** Subtabs of the currently open sidebar */
    sidebarSubtabs: string[]
}

export default TopBarState;
