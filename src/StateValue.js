import * as FormProvider from "./FormProvider.jsx";

function StateValue(props) {
    const state = FormProvider.useFieldState(props.forInput);

    if (typeof props.display === 'function')
        return props.display(state.value);

    return state.value;
}

export { StateValue };