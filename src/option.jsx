import React from 'react';

function Option(props) {

    // Option
    const option = {...props};
    delete option.text;

    if (props.text)
        return (<option {...option}>{props.text}</option>);

    return (<option {...option} />);
}

export { Option };