import React from 'react';
import renderer from 'react-test-renderer';
import SideBar from 'parts/SideBar';
import { MemoryRouter } from 'react-router-dom';

jest.mock("@material-ui/core/Drawer",()=>"Material UI Drawer");
jest.mock("@material-ui/core/Typography",()=>"Material UI Typography");
jest.mock("@material-ui/core/List",()=>"Material UI List");
jest.mock("@material-ui/core/ListItem",()=>"Material UI ListItem");
jest.mock("@material-ui/core/ListItemText",()=>"Material UI ListItemText");

describe('<SideBar />',()=>{
    //Basic rendering with minimal props
    describe('basic rendering',()=>{
        it("renders correctly",()=>{
            expect(renderer
                .create(
                <MemoryRouter>
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