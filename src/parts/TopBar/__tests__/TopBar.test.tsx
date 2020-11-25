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

/**
 * A hacky work-around to unmounting the element.
 * Because material-ui's <Tabs /> uses a forwardRef that
 * then is utilised in unmounting it, but react-test-renderer
 * can't handle refs, unmounting will throw up an error from the
 * <Tabs /> component. However, if this error is caught and ignored,
 * the unmount will still have been successful, allowing further
 * creation of components using renderer.create()
 */
function hackUnmount(tree) {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    try {
        tree.unmount();
    } catch(error) {}
}

/**
 * As MUI uses clsx to procedurally generate class names,
 * there will be near matches which differ only by the number of class.
 * For some checks, these should be ignored
 */
function replaceClassNumbers(serialised:string) {
    const numRegex = /-\d+/;
    return serialised.split("\n").map(line=>{
        if (line.includes("className")) {
            while (line.match(numRegex)) {
                line = line.replace(numRegex,"-Number");
            }
        }
        return line;
    }).join("\n");
}

describe('<TopBar />',()=>{
    //Basic rendering with minimal props
    it("renders correctly",()=>{
        let tree = renderer.create(<StaticRouter>
            <TopBar
                tabs={testTabs}
            />
        </StaticRouter>)
        const json = tree.toJSON();
        hackUnmount(tree);
        expect(json).toMatchSnapshot();
    });

});
