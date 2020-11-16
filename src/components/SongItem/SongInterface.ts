/**
 * Interface for information on a song.
 * Note that songs pulled from get requests to "/queue" also have a
 * 'votes' property whereas other songs may not.
 * Details for each individual property is given in comments below.
 */
interface SongInterface {
    /** Name of the song's artist */
    artist: string,

    /** Name of the song */
    song: string,

    /** Duration of the song, in seconds (float if necessary) */
    duration: number,

    /** Name of the album that the song comes from */
    album: string,

    /** Unique ID that the song is stored under in the backend database */
    _id: string,

    /**
     * Number of votes cast for the particular song.
     * Optional, as only given for songs in the current play queue.
     */
    votes?: number
}

export default SongInterface;
