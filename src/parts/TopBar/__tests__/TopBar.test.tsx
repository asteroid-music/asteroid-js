import React from 'react';
import renderer from 'react-test-renderer';
import TopBar from 'parts/TopBar';
import { TabArray } from 'utils/Tabs';
import { StaticRouter } from 'react-router-dom';
import { serialize as serialise } from 'jest-snapshot/build/utils';
//I know, UK vs US spelling...

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

});
