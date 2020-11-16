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
        let voteState = this.state.voteState;
        axios.post<{message: string}>("/queue",{
            id: this.props.song?._id,
            vote: value
        }).catch(
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
