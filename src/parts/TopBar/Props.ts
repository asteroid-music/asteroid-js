//Imports from React module
import React from 'react';

//Import from local 'utils'
import { TabArray } from 'utils/Tabs';

/**
 * Interface for props for the <TopBar> React component.
 * Details for each individual property is given in comments below.
 */
interface TopBarProps {
    /** Props for react router */
    match: object,
    history: object,
    location: {hash: string, pathname: string, search: string},
    /** A TabArray object representing the accessible tabs */
    tabs: TabArray;
}

export default TopBarProps
