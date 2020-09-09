//Basic imports
import React from 'react';
import type {ElementType} from 'react';
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import UnfoldLess from '@material-ui/icons/UnfoldLess';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

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

interface SongItemProps {
    song: SongInterface,
    voteButtons?: boolean,
    unfolded?: boolean
}

interface SongItemState {
    unfolded: boolean,
    voteState: number
}

/**
 * <AsteroidSongItem> component allowing interaction
 * with a single song item.
 */
class AsteroidSongItem extends React.Component<SongItemProps,SongItemState> {
    constructor(props) {
        super(props);
        this.state = {
            unfolded: this.props.unfolded,
            voteState: 0
        };
    }

    unfoldedSecondaryNode() {
        let song = this.props.song;
        return <div>
            <Typography>Artist: {song.artist}</Typography>
            <Typography>Album: {song.album}</Typography>
            <Typography>Duration: {song.duration}</Typography>
        </div>
    }

    foldedSecondaryText() {
        let song = this.props.song;
        return song.artist + " - " + song.album + " - " + song.duration;
    }

    _vote(value: number) {
        let voteState = this.state.voteState;
        axios.post<{message: string}>("/queue",{
            id: this.props.song?.id,
            vote: value
        }).catch(
            (error) => {
                this.setState({voteState:voteState});
            }
        );
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
            ? <IconButton onClick={() => {this.setState({unfolded:false});}}><UnfoldMore /></IconButton>
            : <IconButton onClick={() => {this.setState({unfolded:true});}}><UnfoldLess /></IconButton>

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

export { AsteroidSongItem, SongInterface }
