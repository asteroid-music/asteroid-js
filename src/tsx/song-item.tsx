//Basic imports
import React from 'react';
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';

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

    //TODO: should have a "more info" button that shows all the props info

    let votesInfo = props.votes && <Typography>{props.votes}</Typography>

    return <ListItem>
        <ListItemText
            primary={props.song}
            secondary={props.artist}
        />
        <IconButton>
            <ArrowUpwardIcon style={{ color: green[500] }}/>
        </IconButton>
        {votesInfo}
        <IconButton>
            <ArrowDownwardIcon style={{ color: red[500] }}/>
        </IconButton>
    </ListItem>
}

export { AsteroidSongItem, SongInterface }
