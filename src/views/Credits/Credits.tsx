//Basic imports
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/**
 * <AsteroidCredits> component for main body
 */
function AsteroidCredits(props: {}) {
    return <Container>
        <Typography variant="body1">
            Asteroid built by <a href="https://github.com/dustpancake" target="_blank">
                Fergus Baker
            </a>
            {" and "}
            <a href="https://github.com/JR-Mitchell" target="_blank">
                JR Mitchell
            </a>
            <br/>
            {"GitHub repo at: "}
            <a href="https://github.com/asteroid-music" target="_blank">
                asteroid-music
            </a>
        </Typography>
    </Container>
}


export { AsteroidCredits }
