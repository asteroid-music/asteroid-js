//Basic imports
import React from 'react';
import axios from 'axios'
import { Button, Container, Typography } from '@material-ui/core'

//Local .tsx imports
import { AsteroidTabsProps, AsteroidTabs } from './tabs'

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

    /** The name of the currently open app subtab, or 'none' if no open tab. */
    currSubTab: string | null;

    /** Whether or not the subtab bar should be open */
    showSubTabBar: boolean;

    /** Temporary variable: will be removed later in dev; body text */
    gotText: string;
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
            currSubTab: currSubTab,
            showSubTabBar: showSubTabBar,
            gotText: "No text! Open a subtab to get...",
        }
    }

    /**
     * Callback for the onChange event of the subtab bar
     * If the clicked subtab is the current subtab, deselects it
     * If there is no active tab, throws up a warning
     * If it is a valid subtab of the current tab, calls a get request
     * If it is an invalid subtab of the current tab, throws up a warning
     *
     * @param {object} event: the onChange event triggered by the subtab bar
     * @param {string} subTabName: the name of the chosen subtab
     */
    subTabChangeCallback(event: object, subTabName: string) {
        const currTab = this.state.currTab;

        if (subTabName === this.state.currSubTab) {
            this.setState({currSubTab:null});
        } else if (currTab === null) {
            console.warn("App.subTabChangeCallback called with no open tab")
        } else if (this.props.tabs.get(currTab).includes(subTabName)) {
            axios.get("http://localhost:8000/songs").then(
                response => {
                    this.setState({gotText:response.data.name});
                }
            ).catch(
                error => {
                    let errorcode: string = "Error raised calling get request: code ";
                    errorcode += error.response?.status.toString();
                    this.setState({gotText:errorcode});
                }
            );
        } else {
            console.warn(
                "App.subTabChangeCallback called with invalid subtab "
                + subTabName
                + " for currently open tab "
                + currTab
            );
        }
    }

    /**
     * Callback for the onChange event of the tab bar
     * If the clicked tab is the current tab, toggles hiding/showing the subtab bar
     * If the tab is another valid tab, switches to it and shows the subtab bar
     * If it is an invalid tab, throws up a warning
     *
     * @param {object} event: the onChange event triggered by the subtab bar
     * @param {string} tabName: the name of the chosen tab
     */
    tabChangeCallback(event: object, tabName: string) {
        if (tabName === this.state.currTab) {
            this.setState({showSubTabBar:!this.state.showSubTabBar});
        } else if (this.props.tabs.includes(tabName)) {
            this.setState({currTab:tabName, currSubTab:null, showSubTabBar:true});
        } else {
            console.warn(
                "App.tabChangeCallback called with invalid tab "
                + tabName
            );
        }
    }

    render() {
        const currTab = this.state.currTab;
        const gotText = this.state.gotText;
        const showSubTabBar = this.state.showSubTabBar;

        let subTabNames: string[] | null = null;
        if (currTab && showSubTabBar) {
            subTabNames = this.props.tabs.get(currTab).subtabs;
        }

        return (
            <Container>
                <AsteroidTabs
                    tabNames={this.props.tabs.nameList()}
                    currTab={currTab}
                    subTabNames={subTabNames}
                    tabCallback={(event: object, tabName: string) => {this.tabChangeCallback(event,tabName)}}
                    subTabCallback={(event: object, subTabName: string) => {this.subTabChangeCallback(event,subTabName)}}
                 />
                <Typography variant="body1">{gotText}</Typography>
            </Container>
        );
    }
}

export { App, AppProps }
