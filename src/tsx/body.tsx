//Basic imports
import React from 'react';

//Local .tsx imports
import { AsteroidCredits } from './body-content/credits';


//Lookup container for modules
const bodyContent = {
    Credits: AsteroidCredits,
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
