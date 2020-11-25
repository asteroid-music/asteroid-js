import React from 'react';
import renderer from 'react-test-renderer';
import App from 'App';

/**
 * App.tsx imports:
 *  - React
 *  - Box
 *  - react-router-dom
 *  - TopBar
 *  - TabArray
 *  - NoOpenTab
 *  - NoMatchedTab
 * 
 * The following should be mocked:
 *  - Box
 *  - TopBar
 *  - TabArray
 *  - NoOpenTab
 *  - NoMatchedTab
 */

jest.mock("parts/TopBar", ()=>"TopBar");
jest.mock("views/NoOpenTab", ()=>"NoOpenTab");
jest.mock("views/NoMatchedTab", ()=>"NoMatchedTab");
jest.mock("@material-ui/core/Box", ()=>"Material UI Box");

import { TabArray } from 'utils/Tabs';

const tabs = new TabArray([
    {
        name:"Testing Tab 1",
        subtabs: [
            {
                name: "Testing Subtab 1",
                component: (props)=><div>TestingSubtab1Component</div>
            },
            {
                name: "Testing Subtab 2",
                component: (props)=><div>TestingSubtab2Component</div>
            }
        ]
    },
    {
        name:"Testing Tab 2",
        subtabs: [
            {
                name: "Testing Subtab 3",
                component: (props)=><div>TestingSubtab3Component</div>
            },
            {
                name: "Testing Subtab 3",
                component: (props)=><div>TestingSubtab4Component</div>
            }
        ]
    },
]);

describe('<App />',()=>{
    //Basic rendering with minimal props
    describe('basic rendering',()=>{
        /**
         * The App props are:
         *  tabs: TabArray
         * 
         * Each of these should be tested both with valid and invalid values
         */
        it("renders correctly",()=>{
            expect(renderer
                .create(<App tabs={tabs}/>)
                .toJSON()
            ).toMatchSnapshot();
        });
    });

    //Testing out location functionalities
    describe('location-based rendering',()=>{
        /**
         * Different behaviours when:
         *  - at "/"
         *  - at a location included in tabs
         *  - at a location not included in tabs
         */
    });
});