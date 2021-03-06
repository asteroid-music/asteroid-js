import React from 'react';
import { serialize as serialise } from 'jest-snapshot/build/utils';
//I know, UK vs US spelling...

const Tab = props => <button
    onClick={(event)=>{
        props.onClick && props.onClick(event);
        let selected = props.selected || false;
        props.value && !selected && props.onChange && props.onChange(event,props.value);
    }}
>
    Material UI Tab with props:
    {
        serialise(props)
    }
</button>

export default Tab;