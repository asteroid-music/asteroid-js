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
 * 
 * As this component relies on react-router-dom,
 *  location functionality should be tested.
 */

import { TabArray } from 'utils/Tabs';

jest.mock("parts/TopBar",()=>"AsteroidTopBar");
jest.mock("views/NoOpenTab",()=>"NoOpenTab");
jest.mock("views/NoMatchedTab",()=>"NoMatchedTab");

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
                name: "Testing Subtab 4",
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
        it("renders correctly with valid props",()=>{
            expect(renderer
                .create(<App tabs={tabs}/>)
                .toJSON()
            ).toMatchSnapshot();
        });
        it("throws an error with invalid props",()=>{
            console.error = jest.fn();
            expect(()=>renderer
                .create(<App {...({crunch:"hello"} as unknown as {tabs: TabArray})}/>) //Bypass TypeScript to pass invalid props
                .toJSON()
            ).toThrowErrorMatchingSnapshot();
        });
    });

    //Testing out location functionalities
    describe('location-based rendering',()=>{
        /**
         * Different behaviours when:
         *  - at "/" (already tested)
         *  - at a location included in tabs
         *  - at a location not included in tabs
         */
        it("renders correctly at a location included in the tabs prop",()=>{
            window.history.pushState(null,null,"#/Testing Tab 2/Testing Subtab 3");
            expect(renderer
                .create(<App tabs={tabs}/>)
                .toJSON()
            ).toMatchSnapshot();
        });
        it("renders a 404 for a location not included in the tabs prop",()=>{
            window.history.pushState(null,null,"#/Unknown/Subtab");
            expect(renderer
                .create(<App tabs={tabs}/>)
                .toJSON()
            ).toMatchSnapshot();
        });
    });
});