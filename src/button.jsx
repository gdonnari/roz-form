import React from 'react';
import * as FormProvider from "./FormProvider.jsx";

function Button(props) {

    const state = FormProvider.useFieldState('form');
    const button = {...props};
    delete button.children;

    if (props.disabled === 'formState')
        button.disabled = state.error;

    return (<button {...button}>{props.children}</button>);
}

export { Button };