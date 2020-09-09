//Basic imports
import React from 'react';
import { Typography, Container, List, Button } from '@material-ui/core'
import axios from 'axios'

//Relative local imports
import { AsteroidSongItem, SongInterface } from '../song-item.tsx'

/**
 * State for the <AsteroidSongList> component
 */
interface SongListState {
    musicData?: SongInterface[],
    requestFailureString?: string
}

/**
 * <AsteroidSongList> component for main body
 */
class AsteroidSongList extends React.Component<{},SongListState> {
    constructor(props) {
        super(props);
        this.state = {};
        this._refreshSongs();
    }

    _refreshSongs() {
        axios.get("/music/songs").then(
            (response: any) => {
                this.setState({
                    musicData: response.data
                });
            }
        ).catch(
            (error) => {
                this.setState({
                    requestFailureString: error.message
                });
            }
        )
    }

    refreshSongs() {
        this.setState({
            musicData: null,
            requestFailureString: null
        });
        this._refreshSongs();
    }

    render() {
        let musicData = this.state.musicData;
        let requestFailureString = this.state.requestFailureString;

        const refreshButton = <Button
            onClick={() => {this.refreshSongs();}}
        >
            Refresh song list
        </Button>

        let listInfoItem = <Typography>Requesting queue data...</Typography>
        let refreshButtonOrNull;

        if (musicData) {
            //Check if any data present
            if (musicData.length > 0) {
                //Sort by number of votes
                listInfoItem = <List>
                    {musicData.map((jsonitem: SongInterface) => {
                        return <AsteroidSongItem key={jsonitem.id} {...jsonitem}/>
                    })}
                </List>
            } else {
                listInfoItem = <Typography>No songs found! Go to the Request tab to add some!</Typography>
                refreshButtonOrNull = refreshButton;
            }
        } else if (requestFailureString){
            listInfoItem = <Typography>Error when loading songs: {requestFailureString}</Typography>
            refreshButtonOrNull = refreshButton;
        }

        return <Container>
            {listInfoItem}
            {refreshButtonOrNull}
        </Container>
    }
}


export { AsteroidSongList }
