//Basic imports
import React from 'react';
import { TableRow, TableCell } from '@material-ui/core'

/**
 * Interface for a song item.
 * Note that songs pulled from get requests to "/queue" also have a
 * 'votes' property whereas other songs may not
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
    id: number,

    /**
     * Number of votes cast for the particular song.
     * Optional, as only given for songs in the current play queue.
     */
    votes?: number

}

/**
 * <AsteroidSongItem> component allowing interaction
 * with a single song item.
 */
function AsteroidSongItem(props: SongInterface) {
    let votecell = props.votes && <TableCell>{props.votes}</TableCell>;
    return <TableRow>
        <TableCell>{props.song}</TableCell>
        <TableCell>{props.artist}</TableCell>
        <TableCell>{props.album}</TableCell>
        <TableCell>{props.duration}</TableCell>
        {votecell}
    </TableRow>
}

export { AsteroidSongItem, SongInterface }
