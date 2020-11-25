import React from 'react';
import renderer from 'react-test-renderer';
import { AsteroidSongList as SongList } from 'views/AllSongs';

describe('<SongList />',()=>{
    //Basic rendering with minimal props
    describe('basic rendering',()=>{
        it("renders correctly",()=>{
            expect(renderer
                .create(<SongList/>)
                .toJSON()
            ).toMatchSnapshot();
        });
    });
});