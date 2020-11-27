//Imports from external 'react' module
import React from 'react';
import type { ElementType } from 'react';

//Imports from external '@material-ui/core' module
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

//Imports from external '@material-ui/core/colors' module
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

//Imports from external '@material-ui/icons' module
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import UnfoldLess from '@material-ui/icons/UnfoldLess';
import IconButton from '@material-ui/core/IconButton';

//Import from external 'axios' module
import axios from 'utils/axios';

//Imports from local directory
import SongInterface from './SongInterface';
import SongItemProps from './Props';
import SongItemState from './State';

/**
 * <SongItem> component allowing interaction
 * with a single song item.
 */
class SongItem extends React.Component<SongItemProps,SongItemState> {
    constructor(props) {
        let propsAreValid: boolean = true;
        //Assert that the only props are 'song', 'voteButtons' and 'unfolded'
        Object.keys(props).forEach(key=>{
            if (key !== "song" && key !== "voteButtons" && key !== "unfolded") {
                propsAreValid = false;
            }
        });
        //Assert that the 'song' prop exists and includes the correct entries
        if (props.song) {
            //Assert that the only elements are 'artist', 'song', 'duration', 'album', '_id' and 'votes'
            Object.keys(props.song).forEach(key=>{
                if (!["artist","song","duration","album","_id","votes"].includes(key)) {
                    propsAreValid = false;
                }
            });
            //Assert that types are matched
            propsAreValid = propsAreValid && (typeof props.song.artist === "string" || props.song.artist instanceof String);
            propsAreValid = propsAreValid && (typeof props.song.song === "string" || props.song.song instanceof String);
            propsAreValid = propsAreValid && (typeof props.song.album === "string" || props.song.album instanceof String);
            propsAreValid = propsAreValid && (typeof props.song._id === "string" || props.song._id instanceof String);
            propsAreValid = propsAreValid && (typeof props.song.duration === "number" || props.song.duration instanceof Number);
            propsAreValid = propsAreValid && (!props.song.votes || (typeof props.song.votes === "number" || props.song.votes instanceof Number));
        } else {propsAreValid = false;}
        if(!propsAreValid) {
            throw Error("Unable to render the <SongItem> component: invalid props. This is likely an issue with the server and not your browser.")
        }
        super(props);
        this.state = {
            unfolded: this.props.unfolded,
            voteState: 0
        };
    }

    unfoldedSecondaryNode() {
        let song = this.props.song;
        let dur = this._asTime(song.duration);
        return <div>
            <Typography>Artist: {song.artist}</Typography>
            <Typography>Album: {song.album}</Typography>
            <Typography>Duration: {dur}</Typography>
        </div>
    }

    foldedSecondaryText() {
        let song = this.props.song;
        return song.artist + " - " + song.album + " - " + this._asTime(song.duration);
    }

    _vote(value: number) {
        const voteState = this.state.voteState;
        const postUrl="/queue?song_id="+this.props.song._id+"&vote="+value;
        axios.post<{message: string}>(postUrl,{}).catch(
            (error) => {
                this.setState({voteState:voteState});
            }
        );
    }

    _asTime(seconds: number) {
        let secs: number = seconds % 60;
        let mins: number = (seconds-secs)/60;
        return mins.toString()+":"+secs.toString();
    }

    upvoteCallback() {
        let voteState = this.state.voteState;
        if (voteState == 1) {
            this._vote(-1);
            this.setState({voteState:0});
        } else {
            this._vote(1-voteState);
            this.setState({voteState:1});
        }
    }

    downvoteCallback() {
        let voteState = this.state.voteState;
        if (voteState == -1) {
            this._vote(1);
            this.setState({voteState:0});
        } else {
            this._vote(voteState-1);
            this.setState({voteState:-1});
        }
    }

    render () {
        let song = this.props.song;

        let unfolded = this.state.unfolded;
        let voteState = this.state.voteState;

        let textSecondary = unfolded
            ? this.unfoldedSecondaryNode()
            : this.foldedSecondaryText();

        let foldButton = unfolded
            ? <IconButton onClick={() => {this.setState({unfolded:false});}}><UnfoldLess /></IconButton>
            : <IconButton onClick={() => {this.setState({unfolded:true});}}><UnfoldMore /></IconButton>

        let otherProps = unfolded
            ? {
                secondaryTypographyProps: {component:"div" as ElementType}
            }
            : {
                primaryTypographyProps: {noWrap:true},
                secondaryTypographyProps: {noWrap:true}
            };

        let upButtonStyle = (voteState === 1)
            ? {backgroundColor: green[100]}
            : {};

        let downButtonStyle = (voteState === -1)
            ? {backgroundColor: red[100]}
            : {};

        let upButton = this.props.voteButtons && <IconButton
            style={upButtonStyle}
            onClick={() => {this.upvoteCallback();}}
        >
            <ArrowUpwardIcon
                style={{ color: green[500] }}
            />
        </IconButton>

        let downButton = this.props.voteButtons && <IconButton
            style={downButtonStyle}
            onClick={() => {this.downvoteCallback();}}
        >
            <ArrowDownwardIcon
                style={{ color: red[500] }}
            />
        </IconButton>

        let votesInfo = song.votes && <Typography>{song.votes+voteState}</Typography>

        return <ListItem>
            <ListItemText
                primary={song.song}
                secondary={textSecondary}
                {...otherProps}
            />
            {upButton}
            {votesInfo}
            {downButton}
            {foldButton}
        </ListItem>
    }
}

export default SongItem;
