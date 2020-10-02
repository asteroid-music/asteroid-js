/**
 * State interface for the <SongItem> component
 * Details for each individual property is given in comments below.
 */
interface SongItemState {
    /** Whether to display song information on separate rows **/
    unfolded: boolean,

    /**
     * The change in vote for this song due to the user since this component
     * was created. I.e the value 0 if the user hasn't voted on this song, 1 if
     * they have upvoted this song, and -1 if they have downvoted this song.
     */
    voteState: number
}

export default SongItemState;
