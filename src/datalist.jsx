import React from 'react';
import { OptionList } from "./option_list.jsx";

function Datalist(props) {

    const datalist = {...props};
    datalist.id ??= props.name;

    if (props.options) {
        delete datalist.options;
        return (<datalist {...datalist}>
            <OptionList options={props.options} />
        </datalist>);
    }

    delete datalist.children;

    return (<datalist {...datalist}>
        {props.children}
    </datalist>);
}

export { Datalist };