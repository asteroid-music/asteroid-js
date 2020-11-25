import React from 'react';
import renderer from 'react-test-renderer';
import { AsteroidQueue as Queue } from 'views/Queue';

describe('<Queue />',()=>{
    //Basic rendering with minimal props
    describe('basic rendering',()=>{
        it("renders correctly",()=>{
            expect(renderer
                .create(<Queue/>)
                .toJSON()
            ).toMatchSnapshot();
        });
    });
});