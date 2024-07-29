import React from 'react';
import * as FormProvider from "./FormProvider.jsx";

function Input(props) {

    const changeHandler = FormProvider.useChangeHandler(props.onChange, props.validateOnChange);
    const invalidHandler = FormProvider.useInvalidHandler(props.onInvalid);
    const blurHandler = FormProvider.useBlurHandler(props.onBlur);

    let defaultValue = '';

    if (props.multiple)
        defaultValue = [];

    const state = FormProvider.useFieldState(props.name, defaultValue);

    // Input
    const input = {...props};
    input.value ??= state.value;

    if (props.type === 'hidden')
        return (<input {...input} />);

    input.onInvalid = invalidHandler;
    input.onChange = changeHandler;
    input.onBlur = blurHandler;
    input.className ??= '';
    delete input.validateOnChange;

    const invalidClassName = FormProvider.useFromContext('invalidClassName');

    if (state.error)
        input.className += ' ' + invalidClassName;

    function getChecked(values) {
        let count = values.length;
        for (let i = 0; i < count; i++)
            if (props.value === values[i])
                return true;

        return false;
    }

    if (props.type === 'checkbox') {
        if (props.multiple) {
            delete input.onBlur;
            input.checked = getChecked(state.value);
        } else {
            input.checked = (props.value === state.value);
        }
    }

    if (props.type === 'radio') {
        delete input.onBlur;
        input.checked = (props.value === state.value);
    }

    return (<input {...input}/>);
}

export { Input };