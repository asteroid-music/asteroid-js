//Import from external module 'react'
import React from 'react';

//Imports from external module '@material-ui/core'
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//Imports from external module 'react-router'
import { Link } from 'react-router-dom';

//Imports from local folder
import SideBarProps from './Props';

/**
 * <SideBar> React component for navigating Asteroid.
 * Creates a bar at the side of the screen for routing links
 *
 * @param {`parts/SideBar/Props/SideBarProps`} props: the React props for the
 *      component
 */
function SideBar(props: SideBarProps) {
    return (
        <Drawer
            open={props.open}
            onClose={()=>{props.closeCallback();}}
        >
            <Typography variant="h5" align="center">{props.tabName}</Typography>
            <List style={{minWidth:"20vw"}}>
                {props.linkNames.map((subTabName: string) => {
                    return <ListItem
                        to={"/"+props.tabName+"/"+subTabName}
                        key={subTabName}
                        component={Link}
                        button
                        onClick={()=>{props.closeCallback();}}
                    >
                        <ListItemText primary={subTabName}/>
                    </ListItem>
                })}
            </List>
        </Drawer>
    );
}

export default SideBar;
