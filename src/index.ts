//Imports from external 'react' and 'react-dom' modules
import React from 'react';
import ReactDOM from 'react-dom';

//Import from local 'src/'
import App from 'App';

//Import from local 'src/utils'
import { TabArray } from 'utils/Tabs';

//Import from local 'src/views'
import { AsteroidCredits, AsteroidQueue, AsteroidURLRequester, AsteroidSongList } from 'views';

//Set up tab structure
const tabs = new TabArray([
    {
        name:"Voting",
        subtabs: [
            {name: "Queue", component: AsteroidQueue},
            {name: "All Songs", component: AsteroidSongList}
        ]
    },
    {
        name:"Request",
        subtabs: [{name: "URL Request", component: AsteroidURLRequester}]
    },
    {
        name:"About",
        subtabs: [{name: "Credits", component: AsteroidCredits}]
    }
]);

ReactDOM.render(
    React.createElement(App, {tabs: tabs}, null),
    document.getElementById('root')
);
