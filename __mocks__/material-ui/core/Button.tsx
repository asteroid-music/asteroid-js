import React from 'react';
import { serialize as serialise } from 'jest-snapshot/build/utils';
//I know, UK vs US spelling...

const Button = props => <button
    onClick={(event)=>{props.onClick && props.onClick(event)}}
>
    Material UI Button with props:
    {
        serialise(props)
    }
</button>

export default Button;