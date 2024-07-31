import React from 'react';
import * as FormProvider from "./FormProvider.jsx";
import { OptionList } from "./option_list.jsx";

function Select(props) {

    // Name attribute is required
    if (!props.name)
        throw Error('Roz requires to set a name attribute for each managed input. Please review your form inputs.');

    const validation = FormProvider.useFromContext('validation');
    const validateOnBlur = props.validateOnBlur ?? (validation.validate && validation.onBlurValidate);
    const validateOnChange = props.validateOnChange ?? (validation.validate && validation.onChangeValidate);

    const blurHandler = FormProvider.useBlurHandler(props.onBlur, validateOnBlur);
    const changeHandler = FormProvider.useChangeHandler(props.onChange, validateOnChange);
    const invalidHandler = FormProvider.useInvalidHandler(props.onInvalid, validation.validate);
    let defaultValue = '';

    if (props.multiple)
        defaultValue = [];

    const state = FormProvider.useFieldState(props.name, defaultValue);
    let value = state.value;

    if (props.multiple && !Array.isArray(state.value))
        value = [];

    // Select
    const select = {...props};
    select.onChange = changeHandler;
    select.onInvalid = invalidHandler;
    select.onBlur = blurHandler;
    select.value ??= value;
    select.className ??= '';

    // invalidClassName
    delete select.invalidClassName;
    
    if (state.error) {
        const invalidClassName = props.invalidClassName ?? validation.invalidClassName;
        select.className += ' ' + invalidClassName;
    }

    if (props.options) {
        delete select.options;
        return (<select {...select}>
            <OptionList options={props.options} />
        </select>);
    }

    delete select.children;

    return (<select {...select}>
        {props.children}
    </select>);
}

export { Select };