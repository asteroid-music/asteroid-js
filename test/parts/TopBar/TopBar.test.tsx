import React from 'react';
import renderer from 'react-test-renderer';
import TopBar from '../../../src/parts/TopBar';
import { serialize as serialise } from 'jest-snapshot/build/utils';
//I know, UK vs US spelling...

const testTabNames = [
    "Test tab name 1",
    "Test tab name 2",
    "Test tab name 3"
]

const testSubTabNames = [
    "Test subtab name 1",
    "Test subtab name 2",
    "Test subtab name 3"
]

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
        let tree = renderer.create(<TopBar
                tabNames={testTabNames}
                tabCallback={()=>{}}
                subTabCallback={()=>{}}
            />
        )
        const json = tree.toJSON();
        hackUnmount(tree);
        expect(json).toMatchSnapshot();
    });

    //Basic rendering with minimal props
    it("successfully calls tabCallback",()=>{
        const tabCallback = jest.fn();
        let tree = renderer.create(<TopBar
                tabNames={testTabNames}
                tabCallback={()=>{tabCallback();}}
                subTabCallback={()=>{}}
            />
        )
        tree.root.findAllByType('button').forEach((button)=>{
            button.props.onClick();
        })
        hackUnmount(tree);
        expect(tabCallback).toHaveBeenCalledTimes(testTabNames.length);
    });

    //Rendering with currTab prop
    describe('prop: currTab',()=>{
        it("renders correctly with valid tab name",()=>{
            let tree = renderer
                .create(<TopBar
                    tabNames={testTabNames}
                    tabCallback={()=>{}}
                    subTabCallback={()=>{}}
                    currTab={testTabNames[1]}
                />);
            const json = tree.toJSON();
            hackUnmount(tree);
            expect(json).toMatchSnapshot();
        });

        it("ignores an invalid tab name",()=>{
            let tree = renderer
                .create(<TopBar
                    tabNames={testTabNames}
                    tabCallback={()=>{}}
                    subTabCallback={()=>{}}
                    currTab={"this is not a valid tab name"}
                />);
            const firstString = serialise(tree.toJSON());
            hackUnmount(tree);
            tree = renderer.create(
                <TopBar
                    tabNames={testTabNames}
                    tabCallback={()=>{}}
                    subTabCallback={()=>{}}
                />
            );
            const secondString = serialise(tree.toJSON());
            hackUnmount(tree);
            expect(
                secondString
            ).toEqual(
                firstString
            );
        });
    });

    //Rendering with subTabNames prop
    describe('prop: subTabNames',()=>{
        it("renders with a subtab bar",()=>{
            let tree = renderer
                .create(<TopBar
                    tabNames={testTabNames}
                    subTabNames={testSubTabNames}
                    tabCallback={()=>{}}
                    subTabCallback={()=>{}}
                />);
            const json = tree.toJSON();
            hackUnmount(tree);
            expect(json).toMatchSnapshot();
        });
    });


    //Rendering with currSubTab prop
    describe('prop: currTab',()=>{
        it("renders correctly with valid tab and subtab name",()=>{
            let tree = renderer
                .create(<TopBar
                    tabNames={testTabNames}
                    subTabNames={testSubTabNames}
                    tabCallback={()=>{}}
                    subTabCallback={()=>{}}
                    currTab={testTabNames[1]}
                    currSubTab={testSubTabNames[1]}
                />);
            const json = tree.toJSON();
            hackUnmount(tree);
            expect(json).toMatchSnapshot();
        });

        it("ignores an invalid subtab name with valid tab",()=>{
            let tree = renderer
                .create(<TopBar
                    tabNames={testTabNames}
                    subTabNames={testSubTabNames}
                    tabCallback={()=>{}}
                    subTabCallback={()=>{}}
                    currTab={testTabNames[1]}
                />);
            const firstString = replaceClassNumbers(serialise(tree.toJSON()));
            hackUnmount(tree);
            tree = renderer
                .create(<TopBar
                    tabNames={testTabNames}
                    subTabNames={testSubTabNames}
                    tabCallback={()=>{}}
                    subTabCallback={()=>{}}
                    currTab={testTabNames[1]}
                    currSubTab={"this is not a valid subtab name"}
                />);
            const secondString = replaceClassNumbers(serialise(tree.toJSON()));
            hackUnmount(tree);
            expect(
                secondString
            ).toEqual(
                firstString
            );
        });

        it("ignores a valid subtab name with no subTabNames",()=>{
            let tree = renderer
                .create(<TopBar
                    tabNames={testTabNames}
                    tabCallback={()=>{}}
                    subTabCallback={()=>{}}
                    currTab={testTabNames[1]}
                    currSubTab={testSubTabNames[1]}
                />);
            const firstString = replaceClassNumbers(serialise(tree.toJSON()));
            hackUnmount(tree);
            tree = renderer
                .create(<TopBar
                    tabNames={testTabNames}
                    tabCallback={()=>{}}
                    subTabCallback={()=>{}}
                    currTab={testTabNames[1]}
                />);
            const secondString = replaceClassNumbers(serialise(tree.toJSON()));
            hackUnmount(tree);
            expect(
                secondString
            ).toEqual(
                firstString
            );
        });
    });
});
