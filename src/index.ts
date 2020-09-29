//Basic imports
import React from 'react'
import ReactDOM from 'react-dom'

//Local .tsx imports
import App from 'views/App'

//Local .ts imports
import { TabArray } from 'ts/tabs'

//Local .json imports
const tabs = new TabArray(require('json/tabs.json'))

ReactDOM.render(
    React.createElement(App, {tabs: tabs, currTab: "Voting", currSubTab: "Queue"}, null),
    document.getElementById('root')
)
