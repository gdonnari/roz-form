import React from 'react';
import {StateValue, Input} from '../../src/index.js';

function CustomInput(props) {

    const value = StateValue({forInput: 'custom'});
    const name = StateValue({forInput: 'name'});
    const nickName = StateValue({forInput: 'quantity'});
    let calculated = value;

    if (value === '') {
        calculated = name;
        if (nickName)
            calculated += ' (' + nickName + ')';
    }

    const input = {...props};
    input.value = calculated;

    return (<Input {...input} />);
}

export { CustomInput };