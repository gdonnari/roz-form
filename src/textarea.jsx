import React from 'react';
import * as FormProvider from "./FormProvider.jsx";

function Textarea(props) {

    const changeHandler = FormProvider.useChangeHandler(props.onChange);
    const invalidHandler = FormProvider.useInvalidHandler(props.onInvalid);
    const blurHandler = FormProvider.useBlurHandler(props.onBlur);
    const state = FormProvider.useFieldState(props.name);

    // Textarea
    const textarea = {...props};
    textarea.onChange = changeHandler;
    textarea.onInvalid = invalidHandler;
    textarea.onBlur = blurHandler;
    textarea.value ??= state.value;
    textarea.className ??= '';

    const invalidClassName = FormProvider.useFromContext('invalidClassName');

    if (state.error)
        textarea.className += ' ' + invalidClassName;

    return (<textarea {...textarea}/>);
}

export { Textarea };