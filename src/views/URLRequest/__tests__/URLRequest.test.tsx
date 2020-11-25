import React from 'react';
import renderer from 'react-test-renderer';
import { AsteroidURLRequester as URLRequest } from 'views/URLRequest';

describe('<URLRequest />',()=>{
    //Basic rendering with minimal props
    describe('basic rendering',()=>{
        it("renders correctly",()=>{
            expect(renderer
                .create(<URLRequest/>)
                .toJSON()
            ).toMatchSnapshot();
        });
    });
});