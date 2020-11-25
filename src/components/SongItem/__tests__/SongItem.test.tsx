import React from 'react';
import renderer from 'react-test-renderer';
import SongItem, {SongInterface} from 'components/SongItem';
import axios from 'utils/axios';
import { serialize as serialise } from 'jest-snapshot/build/utils';
//I know, UK vs US spelling...

//Test positive SongInterface without votes
const testSongVoteless: SongInterface = {
    artist: "This is a test artist name",
    song: "This is a test song name",
    duration: 556,
    album: "This is a test album name",
    _id: "aaaaaaa"
}

//Test negative SongInterface with votes
const testSongVoteful: SongInterface = {
    votes: 3,
    ...testSongVoteless
}

describe('<SongItem />',()=>{
    //Basic rendering with minimal props
    describe('basic rendering',()=>{
        it("renders correctly with a voteless song",()=>{
            expect(renderer
                .create(<SongItem song={testSongVoteless} />)
                .toJSON()
            ).toMatchSnapshot();
        });
        it("renders correctly with a voteful song",()=>{
            expect(renderer
                .create(<SongItem song={testSongVoteful} />)
                .toJSON()
            ).toMatchSnapshot();
        });
    });

    //Basic rendering with voteButtons props
    describe('prop: voteButtons',()=>{
        it("renders correctly with a voteless song and vote buttons",()=>{
            expect(renderer
                .create(<SongItem song={testSongVoteless} voteButtons />)
                .toJSON()
            ).toMatchSnapshot();
        });
        it("renders correctly with a voteful song and vote buttons",()=>{
            expect(renderer
                .create(<SongItem song={testSongVoteful} voteButtons />)
                .toJSON()
            ).toMatchSnapshot();
        });
    });

    //Testing unfolded
    describe('prop: unfolded',()=>{
        it("renders correctly when unfolded by default",()=>{
            expect(renderer
                .create(<SongItem song={testSongVoteless} unfolded />)
                .toJSON()
            ).toMatchSnapshot();
        });

        it("is identical"
            + " to when there is no unfolded prop"
            + " and then the unfold button is pressed",
            ()=>{
            //Render folded and unfolded with test renderer
            let unfoldedTree = renderer.create(<SongItem song={testSongVoteless} unfolded/>);
            let foldedTree = renderer.create(<SongItem song={testSongVoteless} />);
            //Naively interact with first button on folded element, unfolding
            /** Assumptions:
             * 1. Clicking successfully calls onClick event (tested within mui)
             * 2. There is only one button - the unfold button (tested by prior tests,
             *      presuming valid snapshots to check against
             */
            foldedTree.root.findByType('button').props.onClick();
            //Generate serialised form
            let unfoldedSerialised = serialise(unfoldedTree.toJSON());
            let foldedSerialised = serialise(foldedTree.toJSON());
            //Expect to equal unfolded
            expect(foldedSerialised).toEqual(unfoldedSerialised);
        });

        it("folds down"
            + " when the fold button is pressed"
            + " to match when there is no unfolded prop",
            ()=>{
            //Render folded and unfolded with test renderer
            let unfoldedTree = renderer.create(<SongItem song={testSongVoteless} unfolded/>);
            let foldedTree = renderer.create(<SongItem song={testSongVoteless} />);
            //Naively interact with first button on unfolded element, folding
            /** Assumptions:
             * 1. Clicking successfully calls onClick event (tested within mui)
             * 2. There is only one button - the fold button (tested by prior tests,
             *      presuming valid snapshots to check against
             */
            unfoldedTree.root.findByType('button').props.onClick();
            //Generate serialised form
            let unfoldedSerialised = serialise(unfoldedTree.toJSON());
            let foldedSerialised = serialise(foldedTree.toJSON());
            //Expect to equal unfolded
            expect(unfoldedSerialised).toEqual(foldedSerialised);
        });

    });

    //Interaction with vote buttons
    describe('interaction: voting',()=>{
        it('increases the number of votes by one'
            + ' when the upvote button is hit'
            + ' and POST request is successful',
            ()=>{
            //Render with test renderer
            let tree = renderer.create(<SongItem song={testSongVoteful} voteButtons />);
            //Ensure successful post request
            jest.spyOn(axios, 'post').mockResolvedValueOnce({
                "message": "Song updated/added to queue."
            });
            //Naively interact with first button
            /** Assumptions:
             * 1. Clicking successfully calls onClick event (tested within mui)
             * 2. Button with index '0' is upvote button (tested by prior tests,
             *      presuming valid snapshots to check against
             */
            tree.root.findAllByType('button')[0].props.onClick();
            //Expect to match snapshot
            expect(tree.toJSON()).toMatchSnapshot();
        });

        it('decreases the number of votes by one'
            + ' when the downvote button is hit'
            + ' and POST request is successful',
            ()=>{
            //Render with test renderer
            let tree = renderer.create(<SongItem song={testSongVoteful} voteButtons />);
            //Ensure successful post request
            jest.spyOn(axios, 'post').mockResolvedValueOnce({
                "message": "Song updated/added to queue."
            });
            //Naively interact with second button
            /** Assumptions:
             * 1. Clicking successfully calls onClick event (tested within mui)
             * 2. Button with index '1' is downote button (tested by prior tests,
             *      presuming valid snapshots to check against
             */
            tree.root.findAllByType('button')[1].props.onClick();
            //Expect to match snapshot
            expect(tree.toJSON()).toMatchSnapshot();
        });
    });
});