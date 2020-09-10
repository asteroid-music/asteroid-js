//Basic imports
import React from 'react';
import Box from '@material-ui/core/Box';

//Local .tsx imports
import { AsteroidTabsProps, AsteroidTabs } from './tabs'
import { AsteroidBody } from './body'

//Local .ts imports
import { TabArray } from '../ts/tabs'

/**
 * Utility interface describing props for the main React <App>
 */
interface AppProps {
    /** A TabArray object representing the accessible tabs */
    tabs: TabArray;
    /**
     * If necessary, the name of the tab that the app should open on.
     * Will be ignored if it doesn't match the name of a tab in 'tabs'
     */
    currTab?: string;
    /**
     * If necessary, the name of the subtab that the app should open on.
     * Will be ignored either if 'currTab' is not provided / is invalid,
     * or if 'currTab' is valid but 'currSubTab' does not match a subtab of
     * the current tab in 'tabs'
     */
    currSubTab?: string;
}

/**
 * Utility interface describing state for the main React <App>
 */
interface AppState {
    /** The name of the currently open app tab, or 'null' if no open tab. */
    currTab: string | null;

    /** The name of the currently viewed tab in the tab bar, or 'null' if no viewed tab. */
    viewedTab: string | null;

    /** The name of the currently open app subtab, or 'none' if no open tab. */
    currSubTab: string | null;

    /** Whether or not the subtab bar should be open */
    showSubTabBar: boolean;
}

/**
 * Basic <App> component for Asteroid frontend
 */
class App extends React.Component<AppProps,AppState> {
    constructor(props) {
        super(props);

        //Check currTab
        let currTab: string | null = null;
        if (this.props.currTab && this.props.tabs.includes(this.props.currTab)) {
            currTab = this.props.currTab;
        }

        //Check currSubTab
        let currSubTab: string | null = null;
        if (currTab && this.props.tabs.tabs[currTab].includes(
            this.props.currSubTab
        )) {
            currSubTab = this.props.currSubTab;
        }

        //Check showSubTabBar
        let showSubTabBar: boolean = currSubTab ? true : false;

        this.state = {
            currTab: currTab,
            viewedTab: currTab,
            currSubTab: currSubTab,
            showSubTabBar: showSubTabBar,
        }
    }

    /**
     * Callback for the onChange event of the subtab bar
     * If the clicked subtab is the current subtab, deselects it
     * If there is no active tab, throws up a warning
     * If it is a valid subtab of the current tab, switches to that tab and subtab
     * If it is an invalid subtab of the current tab, throws up a warning
     *
     * @param {object} event: the onChange event triggered by the subtab bar
     * @param {string} subTabName: the name of the chosen subtab
     */
    subTabChangeCallback(event: object, subTabName: string) {
        const viewedTab: string = this.state.viewedTab;

        if (subTabName === this.state.currSubTab) {
            this.setState({currSubTab:null});
        } else if (viewedTab === null) {
            console.warn("App.subTabChangeCallback called with no viewed tab")
        } else if (this.props.tabs.get(viewedTab)?.includes(subTabName)) {
            this.setState({currTab: viewedTab, currSubTab:subTabName});
        } else {
            console.warn(
                "App.subTabChangeCallback called with invalid subtab "
                + subTabName
                + " for currently viewed tab "
                + viewedTab
            );
        }
    }

    /**
     * Callback for the onChange event of the tab bar
     * If the clicked tab is the viewed tab, toggles hiding/showing the subtab bar
     * If the tab is another valid tab, switches the subtab bar to it
     * If it is an invalid tab, throws up a warning
     *
     * @param {object} event: the onChange event triggered by the subtab bar
     * @param {string} tabName: the name of the chosen tab
     */
    tabChangeCallback(event: object, tabName: string) {
        if (tabName === this.state.viewedTab) {
            this.setState({showSubTabBar:!this.state.showSubTabBar});
        } else if (this.props.tabs.includes(tabName)) {
            this.setState({viewedTab:tabName, showSubTabBar:true});
        } else {
            console.warn(
                "App.tabChangeCallback called with invalid tab "
                + tabName
            );
        }
    }

    render() {
        const currTab: string = this.state.currTab;
        const viewedTab: string = this.state.viewedTab;
        const currSubTab: string = currTab == viewedTab ? this.state.currSubTab : null;
        const showSubTabBar: boolean = this.state.showSubTabBar;

        let subTabNames: string[] | null = null;
        if (viewedTab && showSubTabBar) {
            subTabNames = this.props.tabs.get(viewedTab)?.subtabs;
        }

        return (
            <Box width="100%">
                <AsteroidTabs
                    tabNames={this.props.tabs.nameList()}
                    currTab={currTab}
                    subTabNames={subTabNames}
                    currSubTab={currSubTab}
                    tabCallback={(event: object, tabName: string) => {this.tabChangeCallback(event,tabName)}}
                    subTabCallback={(event: object, subTabName: string) => {this.subTabChangeCallback(event,subTabName)}}
                 />
                <AsteroidBody
                    subTabName={currSubTab}
                />
            </Box>
        );
    }
}

export { App, AppProps }
