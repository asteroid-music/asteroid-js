//Basic imports
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'utils/axios';

//Relative local imports
import SongItem, { SongInterface } from 'components/SongItem';

/**
 * State for the <AsteroidQueue> component
 */
interface QueueState {
    queueData?: SongInterface[],
    requestFailureString?: string
}

/**
 * Interface for a single song in the new queue format
 */
interface queueItemInterface {
    song: SongInterface,
    votes: number
}

/**
 * Interface for a GET request to /queue/
 */
interface queueGetInterface {
    name: string,
    songs: queueItemInterface[]
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
        axios.get<queueGetInterface>("/queue/").then(
            (response) => {
                this.setState({
                    queueData: response.data.songs.map(item=>{
                        item.song.votes = item.votes;
                        return item.song;
                    })
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

        let listInfoItem = <div><Typography>Requesting queue data... </Typography><CircularProgress /></div>
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
                if (queueData.length === 0 || queueData[0].votes == 0) {
                    listInfoItem = <Typography>No songs found in the queue! Get upvoting!</Typography>
                    refreshButtonOrNull = refreshButton;
                } else {
                    listInfoItem = <List>
                        {queueData.map((jsonitem: SongInterface) => {
                            return <SongItem key={jsonitem._id} song={jsonitem} voteButtons/>
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
