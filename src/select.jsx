import React from 'react';
import * as FormProvider from "./FormProvider.jsx";
import { OptionList } from "./option_list.jsx";

function Select(props) {

    const changeHandler = FormProvider.useChangeHandler(props.onChange);
    const invalidHandler = FormProvider.useInvalidHandler(props.onInvalid);
    const blurHandler = FormProvider.useBlurHandler(props.onBlur);
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

    const invalidClassName = FormProvider.useFromContext('invalidClassName');

    if (state.error)
        select.className += ' ' + invalidClassName;

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