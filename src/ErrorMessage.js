import * as FormProvider from "./FormProvider.jsx";

function ErrorMessage(props) {
    const state = FormProvider.useFieldState(props.forInput);

    if (typeof props.display === 'function')
        return props.display(props.forInput, state.error);
    
    return state.error;
}

export { ErrorMessage };