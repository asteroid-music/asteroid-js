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
    /** Temporary variable: will be removed later in dev; body text */
    gotText: string;
}

/**
 * Button class for testing axios requests.
 * Renders a button of class "get-request-button", which on click calls the
 * callback 'this.props.onClick' with closure.
 * Will be removed in later development
 */
class GetRequestButton extends React.Component<{onClick: () => void}> {
    render() {
        return (
            <Button
                className="get-request-button"
                onClick={() => {this.props.onClick()}}
            >
            Click here for get request!
            </Button>
        )
    }
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

        this.state = {
            currTab: null,
            currSubTab: null,
            gotText: "No text! Press button to get...",
        }
    }

    onClick() {
        axios.get("http://localhost:8000/songs").then(
            response => {
                this.setState({gotText:response.data.name});
            }
        ).catch(
            error => {
                let errorcode: string = "Error raised: code ";
                errorcode += error.response?.status.toString();
                this.setState({gotText:errorcode});
            }
        );
    }

    tabChangeCallback(event: object, tabName: string) {
        if (tabName == this.props.currTab) {
            this.setState({currTab:tabName, })
        } else if (this.props.tabs.includes(tabName)) {
            this.setState({currTab:tabName, currSubTab:null})
        } else {
            console.warn(
                "App.tabChangeCallback called with invalid tab"
                + tabName
            )
        }
    }

    render() {
        const currTab = this.state.currTab;

        return (
            <Container>
                <AsteroidTabs
                    tabNames={this.props.tabs.nameList()}
                    currTab={currTab}
                    tabCallback={(event: object, tabName: string) => {this.tabChangeCallback(event,tabName)}}
                 />
                <GetRequestButton onClick={() => {this.onClick()}}/>
                <Typography variant="body1">{this.state.gotText}</Typography>
            </Container>
        );
    }
}

export { App, AppProps }
