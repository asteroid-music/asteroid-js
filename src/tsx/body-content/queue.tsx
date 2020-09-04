//Basic imports
import React from 'react';
import { Typography, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

interface QueueDataInterface {
    artist: string,
    song: string,
    duration: number,
    album: string,
    id: string,
    votes: number
}

//Mock data for testing purposes; will be removed later
const mock_json_data = [
    {
        artist: "Artist1",
        song: "Song1",
        duration: 225.3,
        album: "Album1",
        id: "wadkjhawdk",
        votes: 1
    },
    {
        artist: "Artist2",
        song: "Song2",
        duration: 963.21,
        album: "Album2",
        id: "essejghjsehg",
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
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                            <TableCell>Song</TableCell>
                            <TableCell>Artist</TableCell>
                            <TableCell>Album</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Votes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mock_json_data.map((jsonitem: QueueDataInterface) => {
                        return <TableRow key={jsonitem.id}>
                            <TableCell>{jsonitem.song}</TableCell>
                            <TableCell>{jsonitem.artist}</TableCell>
                            <TableCell>{jsonitem.album}</TableCell>
                            <TableCell>{jsonitem.duration}</TableCell>
                            <TableCell>{jsonitem.votes}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
}


export { AsteroidQueue }
