import React from 'react';
import { Option } from "./option.jsx";

function OptionList(props) {

    // Options
    let options = [];

    if (props.options) {
        options = props.options.map(function (option, index) {
            const _props = {...option};
            _props.key = index;
            return (<Option {..._props}/>);
        });
    }

    return options;
}

export { OptionList };