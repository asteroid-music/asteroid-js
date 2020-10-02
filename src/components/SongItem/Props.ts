//Imports from local directory
import SongInterface from './SongInterface';

/**
 * Props interface for the <SongItem> component
 * Details for each individual property is given in comments below.
 */
interface SongItemProps {
    /** The song to display information for - see SongInterface **/
    song: SongInterface,

    /** Whether to show upvote and downvote buttons for the song **/
    voteButtons?: boolean,

    /** Whether to initially render the SongItem unfolded **/
    unfolded?: boolean
}

export default SongItemProps;
