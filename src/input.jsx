import React from 'react';
import * as FormProvider from "./FormProvider.jsx";

function Input(props) {

    // Name attribute is required
    if (!props.name)
        throw Error('Roz requires to set a name attribute for each managed input. Please review your form inputs.');

    const validation = FormProvider.useFromContext('validation');
    let blurEnabled = true;

    // Do not validate on blur for checkbox and radio
    if (props.type === 'checkbox' || props.type === 'radio')
        blurEnabled = false;

    const validateOnBlur = props.validateOnBlur ?? (validation.validate && validation.onBlurValidate && blurEnabled);
    const validateOnChange = props.validateOnChange ?? (validation.validate && validation.onChangeValidate);

    const blurHandler = FormProvider.useBlurHandler(props.onBlur, validateOnBlur);
    const changeHandler = FormProvider.useChangeHandler(props.onChange, validateOnChange);
    const invalidHandler = FormProvider.useInvalidHandler(props.onInvalid, validation.validate);

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

    // invalidClassName
    delete input.invalidClassName;

    if (state.error) {
        const invalidClassName = props.invalidClassName ?? validation.invalidClassName;
        input.className += ' ' + invalidClassName;
    }

    function getChecked(values) {
        let count = values.length;
        for (let i = 0; i < count; i++)
            if (props.value === values[i])
                return true;

        return false;
    }

    if (props.type === 'checkbox') {
        if (props.multiple) {
            input.checked = getChecked(state.value);
        } else {
            input.checked = (props.value === state.value);
        }
    }

    if (props.type === 'radio')
        input.checked = (props.value === state.value);

    return (<input {...input}/>);
}

export { Input };