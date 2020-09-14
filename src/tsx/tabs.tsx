import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

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

    /** Currently selected subtab, if relevant */
    currSubTab?: string,

    /**
     * Callback function for the tab bar's onChange attribute
     *
     * @param {object} event: the onChange event
     * @param {string} tabName: the name of the tab that is clicked
     */
    tabCallback: (event: object, tabName: string) => void,

    /**
     * Callback function for the subtab bar's onChange attribute
     *
     * @param {object} event: the onChange event
     * @param {string} subTabName: the name of the subtab that is clicked
     */
    subTabCallback: (event: object, subTabName: string) => void,
}

/**
 * Button group for the top tab bar.
 */
class AsteroidTabs extends React.Component<AsteroidTabsProps> {

    mainBar() {
        return <Tabs
            value={this.props.currTab || false}
            onChange={(event: object, value: string) => {this.props.tabCallback(event,value);}}
            variant="scrollable"
            scrollButtons="on"
        >
            {this.props.tabNames.map((tabName: string) => {
                return <Tab key={tabName} value={tabName} label={tabName} />
            })}
        </Tabs>
    }

    subBar() {
        if (this.props.subTabNames) {
            let currSubTab = this.props.subTabNames.includes(this.props.currSubTab) && this.props.currSubTab;
            return <Paper><Tabs
                value={currSubTab}
                onChange={(event: object, value: string) => {this.props.subTabCallback(event,value);}}
                indicatorColor="secondary"
                variant="scrollable"
                scrollButtons="on"
            >
                {this.props.subTabNames.map((subTabName: string) => {
                    return <Tab key={subTabName} value={subTabName} label={subTabName} />
                })}
            </Tabs></Paper>
        } else {
            return null;
        }
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
