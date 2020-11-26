//Import from external module 'react'
import React from 'react';

//Import from external module '@material-ui/core'
import Box from '@material-ui/core/Box';

//Import from external module 'react-router-dom'
import { HashRouter, Switch, Route } from 'react-router-dom';

//Import from local src/
import TopBar from 'parts/TopBar';
import { TabArray } from 'utils/Tabs';
import NoOpenTab from 'views/NoOpenTab';
import NoMatchedTab from 'views/NoMatchedTab';

/**
 * Utility interface describing props for the main React <App>
 */
interface AppProps {
    /** A TabArray object representing the accessible tabs */
    tabs: TabArray;
}

function App(props: AppProps) {
    if (props.tabs && props.tabs instanceof TabArray) {
        return (
            <HashRouter>
                <Box width="100%">
                    <TopBar
                        tabs={props.tabs}
                    />
                    <Switch>
                        <Route exact path="/">
                            <NoOpenTab />
                        </Route>
                        {props.tabs.nameList().map((tabName)=>{
                            return <Route path={"/"+tabName} key={tabName}>
                                <Switch>
                                    {props.tabs.get(tabName)?.nameList().map((subTabName)=>{
                                        return <Route
                                            key={tabName+"/"+subTabName}
                                            path={"/"+tabName+"/"+subTabName}
                                            component={props.tabs.get(tabName).get(subTabName)?.component}
                                        />
                                    })}
                                    <Route path="*">
                                        <NoMatchedTab />
                                    </Route>
                                </Switch>
                            </Route>
                        })}
                        <Route path="*">
                            <NoMatchedTab />
                        </Route>
                    </Switch>
                </Box>
            </HashRouter>
        );
    } else {
        throw Error("Unable to render the <App> component: invalid props. This is likely an issue with the server and not your browser.");
    }
}

export default App;
