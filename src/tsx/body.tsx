//Basic imports
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

//Local .tsx imports
import { AsteroidCredits } from './body-content/credits';
import { AsteroidQueue } from './body-content/queue'
import { AsteroidURLRequester } from './body-content/url-request'
import { AsteroidSongList } from './body-content/all-songs'

/**
 * Body component for when no tab is selected
 */
function AsteroidNullBody(props: {}){
    return <Container>
        <Typography variant='body1'>
            No tab selected!
        </Typography>
    </Container>
}

//Lookup container for modules
const bodyContent = {
    Credits: AsteroidCredits,
    Queue: AsteroidQueue,
    "URL Request": AsteroidURLRequester,
    "All Songs": AsteroidSongList,
    null: AsteroidNullBody
}

/**
 * <AsteroidBody> component for main body
 */
function AsteroidBody(props: {subTabName: string, [prop: string]: any}) {
    let {subTabName, ...childProps} = props;
    if (bodyContent.hasOwnProperty(subTabName)) {
        return React.createElement(bodyContent[subTabName], childProps, null);
    }
    console.warn("No body module found with name '"+subTabName+"'.");
    return null;
}

export{ AsteroidBody }
