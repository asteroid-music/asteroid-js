import React from 'react';
import renderer from 'react-test-renderer';
import NoMatchedTab from 'views/NoMatchedTab';
import { MemoryRouter } from 'react-router-dom';

describe('<NoMatchedTab />',()=>{
    //Basic rendering with minimal props
    describe('basic rendering',()=>{
        it("renders correctly",()=>{
            expect(renderer
                .create(<MemoryRouter initialEntries={["/IncorrectAddress"]}><NoMatchedTab/></MemoryRouter>)
                .toJSON()
            ).toMatchSnapshot();
        });
    });
});