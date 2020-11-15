//Import from external 'react' module
import React from 'react';

//Import from external '@material-ui/core' module
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

//Import from external 'react-router-dom' module
import { useLocation } from 'react-router-dom';

/**
 * React component for the main body of the page with no Matched tab
 */
function NoMatchedTab(props: {}) {
    let location = useLocation();
    return <Container>
        <Typography>
            404: No page <code>{location.pathname}</code> found!
        </Typography>
    </Container>
}

export default NoMatchedTab;
