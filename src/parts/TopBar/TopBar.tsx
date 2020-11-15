//Import from external module 'react'
import React from 'react';

//Imports from external module '@material-ui/core'
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';

//Imports from external module 'react-router'
import { withRouter } from 'react-router-dom';

//Imports from local folder
import TopBarProps from './Props';
import TopBarState from './State';

//Imports from local 'parts'
import SideBar from 'parts/SideBar';

/**
 * <TopBar> React component for navigating Asteroid.
 * Creates a bar at the top of the screen with buttons to access tabs and
 *      subtabs
 */
class TopBar extends React.Component<TopBarProps,TopBarState> {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            sidebarName: "",
            sidebarSubtabs: []
        };
    }

    render() {
        let location: string | undefined = this.props.location.pathname.split("/")[1];
        return (
            <AppBar position="static">
                {/*Main tab bar*/}
                <Tabs
                    value={location || false}
                    onChange={
                        (event: React.ChangeEvent<{}>, value: string) => {
                            this.setState({
                                sidebarOpen: true,
                                sidebarName: value,
                                sidebarSubtabs: this.props.tabs.get(value)?.nameList() || []
                            });
                        }
                    }
                    variant="scrollable"
                    scrollButtons="on"
                >
                    {this.props.tabs.nameList().map((tabName: string) => {
                        return <Tab
                            key={tabName}
                            value={tabName}
                            label={tabName}
                        />
                    })}
                </Tabs>
                <SideBar
                    open={this.state.sidebarOpen}
                    tabName={this.state.sidebarName}
                    linkNames={this.state.sidebarSubtabs}
                    closeCallback={()=>{this.setState({sidebarOpen: false});}}
                />
            </AppBar>
        );
    }
}

export default withRouter(TopBar);
