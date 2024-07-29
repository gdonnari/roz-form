import React from 'react';
import * as FormProvider from "./FormProvider.jsx";

function Form(props) {

    const validate = FormProvider.useFromContext('validate');
    const submitHandler = FormProvider.useSubmitHandler(props.onSubmit);
    const resetHandler = FormProvider.useResetHandler(props.onReset);

    // Form
    const form = {...props};
    form.onSubmit = submitHandler;
    form.onReset = resetHandler;
    delete form.children;

    if (validate)
        form.noValidate = true;

    return (<form {...form}>
        {props.children}
    </form>);
}

export { Form };