import React from 'react';

export const Context = React.createContext(null);

export function useFromContext(context, field = false) {
    const ctx = React.useContext(Context);

    if (field)
        return ctx[context][field];

    return ctx[context];
}

export function useFieldState(field, defaultValue = '') {
    const ctx = React.useContext(Context);
    const state = {...ctx.state[field]};
    state.value ??= defaultValue;
    state.error ??= false;
    return state;
}

function init(data) {
    const state = {};

    for (let key in data) {

        let value = data[key];

        if (Array.isArray(value))
            value = [...data[key]];

        state[key] = {
            value: value,
            error: false
        };
    }

    return state;
}

function reducer(state, action) {
    const updated = {};
    const fieldState = {...state[action.field]};
    let value = fieldState.value;
    let index = -1;
    let error = false;

    switch (action.type) {
        case 'setValue':

            updated[action.field] = {
                value: action.data,
                error: false
            };
            break;

        case 'addValue':

            if (Array.isArray(fieldState.value))
                value = [...fieldState.value];
            else
                value = [];

            index = value.indexOf(action.data);

            if (index === -1)
                value.push(action.data);

            updated[action.field] = {
                value: value,
                error: false
            };

            break;

        case 'removeValue':

            if (Array.isArray(fieldState.value))
                value = [...fieldState.value];
            else
                value = [];

            index = value.indexOf(action.data);

            if (index > -1)
                value.splice(index, 1);

            updated[action.field] = {
                value: value,
                error: false
            };
            break;

        case 'setError':

            let errorMessage = action.data;

            if (errorMessage === '')
                errorMessage = false;

            updated[action.field] = fieldState;
            updated[action.field].error = errorMessage;
            break;

        case 'reset':

            return action.data;

        default:
            throw Error('Unknown action: ' + action.type);
    }

    const tmpState = {...state, ...updated};

    // Set form state to disable or enable submit
    for (let fieldKey in tmpState) {
        if (fieldKey === 'form')
            continue;
        if (tmpState[fieldKey].error) {
            error = true;
            break;
        }
    }

    updated['form'] = {error: error};
    const newState = {...tmpState, ...updated};
    return newState;
}

export function useInvalidHandler(userHandler, validate) {
    const dispatch = useFromContext('dispatch');

    function handler(e) {

        if (validate)
            dispatch({
                type: 'setError',
                field: e.target.name,
                data: e.target.validationMessage
            });

        // Call the user handler
        if (userHandler)
            userHandler(e);
    }

    return handler;
}

export function useChangeHandler(userHandler, validateOnChange) {
    const dispatch = useFromContext('dispatch');

    function handler(e) {
        let action = 'setValue';
        let value = e.target.value;

        switch (e.target.type) {
            case 'select-multiple':
                value = Array.from(e.target.selectedOptions, option => option.value);
                break;
            case 'checkbox':

                if (e.target.multiple) {
                    if (e.target.checked)
                        action = 'addValue';
                    else
                        action = 'removeValue';
                } else {
                    if (!e.target.checked)
                        value = '';
                }

                break;
        }

        dispatch({
            type: action,
            field: e.target.name,
            data: value
        });

        if (validateOnChange && e.target.checkValidity()) {
            dispatch({
                type: 'setError',
                field: e.target.name,
                data: e.target.validationMessage
            });
        }

        // Call the user handler
        if (userHandler)
            userHandler(e);
    }

    return handler;
}

export function useBlurHandler(userHandler, validateOnBlur) {
    const dispatch = useFromContext('dispatch');

    function handler(e) {

        if (validateOnBlur && e.target.checkValidity()) {
            dispatch({
                type: 'setError',
                field: e.target.name,
                data: e.target.validationMessage
            });
        }

        // Call the user handler
        if (userHandler)
            userHandler(e);
    }

    return handler;
}

export function useSubmitHandler(userHandler) {
    const validate = useFromContext('validate');

    function handler(e) {
        e.preventDefault();

        if (validate && !e.target.checkValidity())
            return false;

        // Call the user handler
        if (userHandler) {
            userHandler(e);
            return false;
        }

        e.target.submit();
    }

    return handler;
}

export function useResetHandler(userHandler) {
    const dispatch = useFromContext('dispatch');
    const initialState = useFromContext('initialState');

    function handler(e) {
        e.preventDefault();

        dispatch({
            type: 'reset',
            data: initialState
        });

        // Call the user handler
        if (userHandler)
            userHandler(e);
    }

    return handler;
}

// Set default settings
function setValidationDefaults(validation) {

    const defaults = {
        validate: true,
        onBlurValidate: true,
        onChangeValidate: false,
        invalidClassName: 'easyform-invalid'
    };

    return {...defaults, ...validation};
}

export function FormProvider(props) {

    const validation = setValidationDefaults(props.validation);
    const initialState = init(props.data);
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const context = {
        initialState: initialState,
        state: state,
        dispatch: dispatch,
        validation: validation
    };

    return (<Context.Provider value={context}>
        {props.children}
    </Context.Provider>);
}