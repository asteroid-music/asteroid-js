import React from 'react';
import { Tabs, AppBar, Tab } from '@material-ui/core'

/**
 * Props for AsteroidTabs react element
 */
interface AsteroidTabsProps {
    /** List of tab names to generate buttons for */
    tabNames: string[],

    /** List of subtab names to generate buttons for */
    subTabNames?: string[],

    /** Currently selected tab, if relevant */
    currTab?: string,

    /**
     * Callback function for the tab bar's onChange attribute
     *
     * @param {object} event: the onChange event
     * @param {string} tabName: the name of the tab that is clicked
     */
    tabCallback: (event: object, tabName: string) => void,


    /**
     * Function that returns the callback for the subtab button of name
     * subTabName
     *
     * @param {string} subTabName: the name of the subtab to return a
     * callback for
     *
     * @returns {() => void}: the callback for the subtab button
     */
//    subTabCallbackGenerator: (tabName: string) => () => void,
}

/**
 * Button group for the top tab bar.
 */
class AsteroidTabs extends React.Component<AsteroidTabsProps> {

    mainBar() {
        return <Tabs value={this.props.currTab || false} onChange={(event: object, value: string) => {this.props.tabCallback(event,value);}}>
            {this.props.tabNames.map((tabName: string) => {
                return <Tab key={tabName} value={tabName} label={tabName} />
            })}
        </Tabs>
    }

    subBar() {
    }

    render() {
        return (
            <AppBar position="static">
                {this.mainBar()}
                {this.subBar()}
            </AppBar>
        );
    }
}

export { AsteroidTabsProps, AsteroidTabs }
