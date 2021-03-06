//Basic imports
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'utils/axios';

//Local relative import
import SongItem, { SongInterface } from 'components/SongItem';

interface RequesterState {
    url: string,
    requestBeingMade: boolean,
    requestSuccessNode?: any,
    requestFailureNode?: any,
}

interface PostResponse {
    message: string,
    song: SongInterface,
}

/**
 * <AsteroidURLRequester> component for main body
 */
class AsteroidURLRequester extends React.Component<{},RequesterState> {
    constructor(props) {
        super(props);
        this.state = {url:"", requestBeingMade:false};
    }

    handleTextfieldChange(event) {
        this.setState({url: event.target.value});
    }

    makeRequest() {
        const url = this.state.url;
        this.setState({requestBeingMade: true});
        axios.post<PostResponse>("/music/songs?url="+url,{}).then(
            (response) => {
                const message: string = response?.data?.message;
                const song = response?.data?.song && <SongItem song={response.data.song} unfolded />;

                const successNode = <div>
                    {message}
                    {song}
                </div>

                this.setState({
                    requestBeingMade: false,
                    requestSuccessNode: successNode
                });
            }
        ).catch(
            (error) => {
                this.setState({
                    requestBeingMade: false,
                    requestFailureNode: error.message
                });
            }
        );
    }

    resetForm() {
        this.setState({
            url: "",
            requestBeingMade: false,
            requestFailureNode: null,
            requestSuccessNode: null
        });
    }

    returnToForm() {
        this.setState({
            requestBeingMade: false,
            requestFailureNode: null,
            requestSuccessNode: null
        });
    }

    render() {
        const url = this.state.url;
        const requestBeingMade = this.state.requestBeingMade;
        const requestSuccessNode = this.state.requestSuccessNode;
        const requestFailureNode = this.state.requestFailureNode;

        if (requestBeingMade) {
            return <Container>
                <Typography variant="body1">
                    Waiting on a response for request of url '{url}'
                </Typography>
                <CircularProgress />
            </Container>
        } else if (requestSuccessNode) {
            return <Container>
                <Typography variant="body1">
                    {requestSuccessNode}
                </Typography>
                <Button
                    onClick={() => {this.resetForm()}}
                > Make another request </Button>
            </Container>
        } else if (requestFailureNode) {
            return <Container>
                <Typography variant="body1">
                    {requestFailureNode}
                </Typography>
                <Button
                    onClick={() => {this.returnToForm()}}
                > Try again </Button>
            </Container>
        } else {
            return <Container>
                <Typography variant="body1">
                    Insert the URL to request here!
                </Typography>
                <TextField
                    style={{width:"100%"}}
                    id="filled-basic"
                    label="Input URL"
                    variant="filled"
                    value={url}
                    onChange={(event)=>{this.handleTextfieldChange(event);}}
                />
                <Button
                    onClick={() => {this.makeRequest()}}
                > Request </Button>
            </Container>
        }
    }
}

export { AsteroidURLRequester }
