//Basic imports
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import axios from 'axios';

//Relative local imports
import { AsteroidSongItem, SongInterface } from '../song-item.tsx'

/**
 * State for the <AsteroidQueue> component
 */
interface QueueState {
    queueData?: SongInterface[],
    requestFailureString?: string
}

/**
 * <AsteroidQueue> component for main body
 */
class AsteroidQueue extends React.Component<{},QueueState> {
    constructor(props) {
        super(props);
        this.state = {};
        this._refreshQueue();
    }

    _refreshQueue() {
        axios.get<SongInterface[]>("/queue").then(
            (response) => {
                this.setState({
                    queueData: response.data
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

    refreshQueue() {
        this.setState({
            queueData: null,
            requestFailureString: null
        });
        this._refreshQueue();
    }

    render() {
        let queueData = this.state.queueData;
        let requestFailureString = this.state.requestFailureString;

        const refreshButton = <Button
            onClick={() => {this.refreshQueue();}}
        >
            Refresh queue
        </Button>

        let listInfoItem = <Typography>Requesting queue data...</Typography>
        let refreshButtonOrNull;

        if (queueData) {
            //Check if any data present
            if (queueData.length > 0) {
                //Sort by number of votes
                queueData.sort(function(a,b){return b.votes-a.votes;})
                //Remove all songs with <= 0 votes
                let lastIndex: number = queueData.findIndex(function(song){return song.votes <= 0;});
                lastIndex = (lastIndex > 0) ? lastIndex + 1 : queueData.length;
                lastIndex = (queueData[lastIndex-1].votes <= 0) ? lastIndex-1 : lastIndex;
                queueData = queueData.slice(0,lastIndex);
                if (queueData[0].votes == 0) {
                    listInfoItem = <Typography>No songs found in the queue! Get upvoting!</Typography>
                    refreshButtonOrNull = refreshButton;
                } else {
                    listInfoItem = <List>
                        {queueData.map((jsonitem: SongInterface) => {
                            return <AsteroidSongItem key={jsonitem.id} song={jsonitem} voteButtons/>
                        })}
                    </List>
                    refreshButtonOrNull = refreshButton;
                }
            } else {
                listInfoItem = <Typography>No songs found in the queue! Get upvoting!</Typography>
                refreshButtonOrNull = refreshButton;
            }
        } else if (requestFailureString){
            listInfoItem = <Typography>Error when loading queue: {requestFailureString}</Typography>
            refreshButtonOrNull = refreshButton;
        }

        return <Container>
            <Typography>
                Currently playing song: Unknown
            </Typography>
            {listInfoItem}
            {refreshButtonOrNull}
        </Container>
    }
}


export { AsteroidQueue }
