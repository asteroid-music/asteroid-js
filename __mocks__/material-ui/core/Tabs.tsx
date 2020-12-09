import React from 'react';
import { serialize as serialise } from 'jest-snapshot/build/utils';
//I know, UK vs US spelling...

const Tabs = props => <div
>
    Material UI Tabs with props:
    {
        serialise(props)
    }
    {props.onChange ? props.children.map((child)=>{
        return React.cloneElement(child,{onChange: (event,value)=>{props.onChange(event,value);}});
    }) : props.children}
</div>

export default Tabs;