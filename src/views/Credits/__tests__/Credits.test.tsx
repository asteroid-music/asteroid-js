import React from 'react';
import renderer from 'react-test-renderer';
import { AsteroidCredits as Credits } from 'views/Credits';

describe('<Credits />',()=>{
    //Basic rendering with minimal props
    describe('basic rendering',()=>{
        it("renders correctly",()=>{
            expect(renderer
                .create(<Credits/>)
                .toJSON()
            ).toMatchSnapshot();
        });
    });
});