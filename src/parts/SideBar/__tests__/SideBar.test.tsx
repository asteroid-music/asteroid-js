import React from 'react';
import renderer from 'react-test-renderer';
import SideBar from 'parts/SideBar';
import { MemoryRouter } from 'react-router-dom';

/**
 * SideBar.tsx imports:
 *  - React
 *  - Components from MUI (pre-mocked)
 *  - link from react-scroll
 */

describe('<SideBar />',()=>{
    //Basic rendering with minimal props
    describe('basic rendering',()=>{
        it("renders correctly",()=>{
            expect(renderer
                .create(
                <MemoryRouter initialEntries={["/"]}>
                    <SideBar
                        tabName="openTab"
                        open
                        linkNames={["link1","link2"]}
                        closeCallback={()=>{}}
                    />
                </MemoryRouter>
                )
                .toJSON()
            ).toMatchSnapshot();
        });
    });
});