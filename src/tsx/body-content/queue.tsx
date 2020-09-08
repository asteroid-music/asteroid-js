//Basic imports
import React from 'react';
import { Typography, Container, List } from '@material-ui/core'
import axios from 'axios'

//Relative local imports
import { AsteroidSongItem, SongInterface } from '../song-item.tsx'

//Mock data for testing purposes; will be removed later
const mock_json_data = [
    {
        artist: "Artist1",
        song: "Song1",
        duration: 225.3,
        album: "Album1",
        id: 12,
        votes: 1
    },
    {
        artist: "Artist2",
        song: "Song2",
        duration: 963.21,
        album: "Album2",
        id: 24,
        votes: 2
    }
]

/**
 * <AsteroidQueue> component for main body
 */
function AsteroidQueue(props: {}) {
    mock_json_data.sort((a,b) => {return b.votes - a.votes;}) //sorting by vote order
    return <Container>
        <Typography>
            Currently playing song: Unknown
        </Typography>
        <List>
            {mock_json_data.map((jsonitem: SongInterface) => {
                return <AsteroidSongItem key={jsonitem.id} {...jsonitem}/>
            })}
        </List>
    </Container>
}


export { AsteroidQueue }
