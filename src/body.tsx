//Basic imports
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

//Local .tsx imports
import { AsteroidCredits } from 'views/Credits';
import { AsteroidQueue } from 'views/Queue'
import { AsteroidURLRequester } from 'views/URLRequest'
import { AsteroidSongList } from 'views/AllSongs'

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
