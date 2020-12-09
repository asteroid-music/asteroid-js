import React from 'react';
import renderer from 'react-test-renderer';
import TopBar from 'parts/TopBar';
import { TabArray } from 'utils/Tabs';
import { StaticRouter } from 'react-router-dom';
import { serialize as serialise } from 'jest-snapshot/build/utils';
//I know, UK vs US spelling...

/**
 * TopBar.tsx imports:
 *  - React
 *  - Components from MUI (pre-mocked)
 *  - withRouter from react-router-dom
 *  - SideBar
 * 
 * The following should be mocked:
 *  - withRouter
 *  - SideBar
 * 
 * As this component contains the following interactions:
 *  - Clicking a tab button
 * it should test the interaction with each
 */

jest.mock("parts/SideBar",()=>"AsteroidSideBar");

const testTabs = new TabArray([
    {
        name: "TestTab",
        subtabs: [
            {name: "TestSubtab", component: TopBar},
            {name: "TestSubtabTwo", component: TopBar},
            {name: "TestSubtab3", component: TopBar},
            {name: "TestSubtab-4", component: TopBar},
        ]
    }
]);

describe('<TopBar />',()=>{
    //Basic rendering with minimal props
    it("renders correctly",()=>{
        let tree = renderer.create(<StaticRouter>
            <TopBar
                tabs={testTabs}
            />
        </StaticRouter>)
        const json = tree.toJSON();
        expect(json).toMatchSnapshot();
    });

    //Interaction with a tab button
    it("opens the correct sidebar when a tab button is pressed",()=>{
        let tree = renderer.create(<StaticRouter>
            <TopBar
                tabs={testTabs}
            />
        </StaticRouter>)
        //Interact with the button
        tree.root.findByType('button').props.onClick();
        //Match with snapshot
        const json = tree.toJSON();
        expect(json).toMatchSnapshot();
});

});
