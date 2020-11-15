//Import from external 'react' module
import React from 'react';

//Import from external '@material-ui/core' module
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/**
 * React component for the main body of the page with no open tab
 */
function NoOpenTab(props: {}) {
    return <Container>
        <Typography>
            No tab selected!
        </Typography>
    </Container>
}

export default NoOpenTab;
