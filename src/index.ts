//Basic imports
import React from 'react'
import ReactDOM from 'react-dom'

//Local .tsx imports
import App from 'App'

//Local .ts imports
import { TabArray } from 'parts/TopBar/Tabs'

//Set up tab structure
const tabs = new TabArray([
    {
        "name":"Voting",
        "subtabs": ["Queue", "All Songs"]
    },
    {
        "name":"Request",
        "subtabs": ["URL Request"]
    },
    {
        "name":"About",
        "subtabs": ["Credits"]
    }
]);

ReactDOM.render(
    React.createElement(App, {tabs: tabs, currTab: "Voting", currSubTab: "Queue"}, null),
    document.getElementById('root')
)
