//Basic imports
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { isMobileOnly, isTablet } from 'react-device-detect'
import { Button, Container, Typography } from '@material-ui/core'

//Local .tsx imports

//Local .ts imports
import { BrowserMode } from '../ts/browser-mode-type'
import { TabObjectLike, TabObject, TabArray } from '../ts/tabs'

//Local .json imports
const tabs = new TabArray(require('../json/tabs.json'));

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
    /** A TabArray representing the accessible tabs */
    tabs: TabArray;
    /**
     * Calculated with 'react-device-detect'; whether the site is running on
     * a mobile device ('mobile'), a tablet ('tablet') or a browser in some
     * other device e.g PC ('browser')
     */
    browserMode: BrowserMode;
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

        //State BrowserMode
        let browserMode: BrowserMode;
        if (isMobileOnly) {
            browserMode = "mobile";
        } else if (isTablet) {
            browserMode = "tablet";
        } else {
            browserMode = "browser";
        }

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
            tabs: this.props.tabs,
            browserMode: browserMode,
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

    render() {
        return (
            <Container>
                <GetRequestButton onClick={() => {this.onClick()}}/>
                <Typography variant="body1">{this.state.gotText}</Typography>
            </Container>
        );
    }
}

ReactDOM.render(
  <App tabs={tabs}/>,
  document.getElementById('root')
);
