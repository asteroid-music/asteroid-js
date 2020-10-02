import React from 'react';
import renderer from 'react-test-renderer';
import SongItem, {SongInterface} from '../../../src/components/SongItem';

//Test SongInterface without votes
const testSongVoteless: SongInterface = {
    artist: "This is a test artist name",
    song: "This is a test song name",
    duration: 556,
    album: "This is a test album name",
    id: 1,
}

//Test SongInterface with votes
const testSongVoteful: SongInterface = {
    votes: 3,
    ...testSongVoteless
}

//Test that the <SongItem> components render correctly
test.each([
    {song:testSongVoteless},
    {song:testSongVoteful},
    {song:testSongVoteless,unfolded:true},
    {song:testSongVoteful,unfolded:true},
    {song:testSongVoteless,voteButtons:true},
    {song:testSongVoteful,voteButtons:true},
    {song:testSongVoteless,unfolded:true,voteButtons:true},
    {song:testSongVoteful,unfolded:true,voteButtons:true}
])("<SongItem {...%o}> renders correctly", (props) => {
    const item = renderer
        .create(<SongItem {...props} />)
        .toJSON();
    expect(item).toMatchSnapshot();
});
