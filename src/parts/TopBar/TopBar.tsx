//Import from external module 'react'
import React from 'react';

//Imports from external module '@material-ui/core'
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

//Imports from local folder
import TopBarProps from './Props';

/**
 * <TopBar> React component for navigating Asteroid.
 * Creates a bar at the top of the screen with buttons to access tabs and
 *      subtabs
 *
 * @param {`parts/TopBar/Props/TopBarProps`} props: the React props for the
 *      component
 */
function TopBar(props: TopBarProps) {
    //Name of the current subtab, iff it exists in the current tab
    let currSubTab = props.subTabNames?.includes(props.currSubTab)
        && props.currSubTab;

    return (
        <AppBar position="static">
            {/*Main tab bar*/}
            <Tabs
                value={props.currTab || false}
                onChange={
                    (event: React.ChangeEvent<{}>, value: string) => {
                        props.tabCallback(event,value);
                    }
                }
                variant="scrollable"
                scrollButtons="on"
            >
                {props.tabNames.map((tabName: string) => {
                    return <Tab
                        key={tabName}
                        value={tabName}
                        label={tabName}
                    />
                })}
            </Tabs>
            {/*Fold-out sub-tab bar*/}
            {props.subTabNames &&
                <Paper>
                    <Tabs
                        value={currSubTab}
                        onChange={
                            (event: React.ChangeEvent<{}>, value: string) => {
                                props.subTabCallback(event,value);
                            }
                        }
                        indicatorColor="secondary"
                        variant="scrollable"
                        scrollButtons="on"
                    >
                        {props.subTabNames.map((subTabName: string) => {
                            return <Tab
                                key={subTabName}
                                value={subTabName}
                                label={subTabName}
                            />
                        })}
                    </Tabs>
                </Paper>
            }
        </AppBar>
    );
}

export default TopBar;
