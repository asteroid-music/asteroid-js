import React from 'react';
import renderer from 'react-test-renderer';
import NoOpenTab from 'views/NoOpenTab';

describe('<NoOpenTab />',()=>{
    //Basic rendering with minimal props
    describe('basic rendering',()=>{
        it("renders correctly",()=>{
            expect(renderer
                .create(<NoOpenTab/>)
                .toJSON()
            ).toMatchSnapshot();
        });
    });
});