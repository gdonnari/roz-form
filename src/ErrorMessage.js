import * as FormProvider from "./FormProvider.jsx";

function ErrorMessage(props) {
    const state = FormProvider.useFieldState(props.forInput);
    return state.error;
}

export { ErrorMessage };