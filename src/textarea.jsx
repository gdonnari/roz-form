import React from 'react';
import * as FormProvider from "./FormProvider.jsx";

function Textarea(props) {

    // Name attribute is required
    if (!props.name)
        throw Error('Roz requires to set a name attribute for each managed input. Please review your form inputs.');

    const validation = FormProvider.useFromContext('validation');
    const validateOnBlur = props.validateOnBlur ?? (validation.validate && validation.onBlurValidate);
    const validateOnChange = props.validateOnChange ?? (validation.validate && validation.onChangeValidate);

    const blurHandler = FormProvider.useBlurHandler(props.onBlur, validateOnBlur);
    const changeHandler = FormProvider.useChangeHandler(props.onChange, validateOnChange);
    const invalidHandler = FormProvider.useInvalidHandler(props.onInvalid, validation.validate);
    const state = FormProvider.useFieldState(props.name);

    // Textarea
    const textarea = {...props};
    textarea.onChange = changeHandler;
    textarea.onInvalid = invalidHandler;
    textarea.onBlur = blurHandler;
    textarea.value ??= state.value;
    textarea.className ??= '';

    // invalidClassName
    delete textarea.invalidClassName;
    
    if (state.error) {
        const invalidClassName = props.invalidClassName ?? validation.invalidClassName;
        textarea.className += ' ' + invalidClassName;
    }

    return (<textarea {...textarea}/>);
}

export { Textarea };