// src/FormProvider.jsx
import React from "react";
var Context = React.createContext(null);
function useFromContext(context, field = false) {
  const ctx = React.useContext(Context);
  if (field)
    return ctx[context][field];
  return ctx[context];
}
function useFieldState(field, defaultValue = "") {
  const ctx = React.useContext(Context);
  const state = { ...ctx.state[field] };
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
      value,
      error: false
    };
  }
  return state;
}
function reducer(state, action) {
  const updated = {};
  const fieldState = { ...state[action.field] };
  let value = fieldState.value;
  let index = -1;
  let error = false;
  switch (action.type) {
    case "setValue":
      updated[action.field] = {
        value: action.data,
        error: false
      };
      break;
    case "addValue":
      if (Array.isArray(fieldState.value))
        value = [...fieldState.value];
      else
        value = [];
      index = value.indexOf(action.data);
      if (index === -1)
        value.push(action.data);
      updated[action.field] = {
        value,
        error: false
      };
      break;
    case "removeValue":
      if (Array.isArray(fieldState.value))
        value = [...fieldState.value];
      else
        value = [];
      index = value.indexOf(action.data);
      if (index > -1)
        value.splice(index, 1);
      updated[action.field] = {
        value,
        error: false
      };
      break;
    case "setError":
      let errorMessage = action.data;
      if (errorMessage === "")
        errorMessage = false;
      updated[action.field] = fieldState;
      updated[action.field].error = errorMessage;
      break;
    case "reset":
      return action.data;
    default:
      throw Error("Unknown action: " + action.type);
  }
  const tmpState = { ...state, ...updated };
  for (let fieldKey in tmpState) {
    if (fieldKey === "form")
      continue;
    if (tmpState[fieldKey].error) {
      error = true;
      break;
    }
  }
  updated["form"] = { error };
  const newState = { ...tmpState, ...updated };
  return newState;
}
function useInvalidHandler(userHandler, validate) {
  const dispatch = useFromContext("dispatch");
  function handler(e) {
    if (validate)
      dispatch({
        type: "setError",
        field: e.target.name,
        data: e.target.validationMessage
      });
    if (userHandler)
      userHandler(e);
  }
  return handler;
}
function useChangeHandler(userHandler, validateOnChange) {
  const dispatch = useFromContext("dispatch");
  function handler(e) {
    let action = "setValue";
    let value = e.target.value;
    switch (e.target.type) {
      case "select-multiple":
        value = Array.from(e.target.selectedOptions, (option) => option.value);
        break;
      case "checkbox":
        if (e.target.multiple) {
          if (e.target.checked)
            action = "addValue";
          else
            action = "removeValue";
        } else {
          if (!e.target.checked)
            value = "";
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
        type: "setError",
        field: e.target.name,
        data: e.target.validationMessage
      });
    }
    if (userHandler)
      userHandler(e);
  }
  return handler;
}
function useBlurHandler(userHandler, validateOnBlur) {
  const dispatch = useFromContext("dispatch");
  function handler(e) {
    if (validateOnBlur && e.target.checkValidity()) {
      dispatch({
        type: "setError",
        field: e.target.name,
        data: e.target.validationMessage
      });
    }
    if (userHandler)
      userHandler(e);
  }
  return handler;
}
function useSubmitHandler(userHandler) {
  const validate = useFromContext("validate");
  function handler(e) {
    e.preventDefault();
    if (validate && !e.target.checkValidity())
      return false;
    if (userHandler) {
      userHandler(e);
      return false;
    }
    e.target.submit();
  }
  return handler;
}
function useResetHandler(userHandler) {
  const dispatch = useFromContext("dispatch");
  const initialState = useFromContext("initialState");
  function handler(e) {
    e.preventDefault();
    dispatch({
      type: "reset",
      data: initialState
    });
    if (userHandler)
      userHandler(e);
  }
  return handler;
}
function setValidationDefaults(validation) {
  const defaults = {
    validate: true,
    onBlurValidate: true,
    onChangeValidate: false,
    invalidClassName: "easyform-invalid"
  };
  return { ...defaults, ...validation };
}
function FormProvider(props) {
  const validation = setValidationDefaults(props.validation);
  const initialState = init(props.data);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const context = {
    initialState,
    state,
    dispatch,
    validation
  };
  return /* @__PURE__ */ React.createElement(Context.Provider, { value: context }, props.children);
}

// src/form.jsx
import React2 from "react";
function Form(props) {
  const validation = useFromContext("validation");
  const submitHandler = useSubmitHandler(props.onSubmit);
  const resetHandler = useResetHandler(props.onReset);
  const form = { ...props };
  form.onSubmit = submitHandler;
  form.onReset = resetHandler;
  delete form.children;
  if (validation.validate)
    form.noValidate = true;
  return /* @__PURE__ */ React2.createElement("form", { ...form }, props.children);
}

// src/input.jsx
import React3 from "react";
function Input(props) {
  const validation = useFromContext("validation");
  const validateOnBlur = props.validateOnBlur ?? (validation.validate && validation.onBlurValidate);
  const validateOnChange = props.validateOnChange ?? (validation.validate && validation.onChangeValidate);
  const blurHandler = useBlurHandler(props.onBlur, validateOnBlur);
  const changeHandler = useChangeHandler(props.onChange, validateOnChange);
  const invalidHandler = useInvalidHandler(props.onInvalid, validation.validate);
  let defaultValue = "";
  if (props.multiple)
    defaultValue = [];
  const state = useFieldState(props.name, defaultValue);
  const input = { ...props };
  input.value ??= state.value;
  if (props.type === "hidden")
    return /* @__PURE__ */ React3.createElement("input", { ...input });
  input.onInvalid = invalidHandler;
  input.onChange = changeHandler;
  input.onBlur = blurHandler;
  input.className ??= "";
  delete input.validateOnChange;
  if (state.error)
    input.className += " " + validation.invalidClassName;
  function getChecked(values) {
    let count = values.length;
    for (let i = 0; i < count; i++)
      if (props.value === values[i])
        return true;
    return false;
  }
  if (props.type === "checkbox") {
    if (props.multiple) {
      delete input.onBlur;
      input.checked = getChecked(state.value);
    } else {
      input.checked = props.value === state.value;
    }
  }
  if (props.type === "radio") {
    delete input.onBlur;
    input.checked = props.value === state.value;
  }
  return /* @__PURE__ */ React3.createElement("input", { ...input });
}

// src/select.jsx
import React6 from "react";

// src/option_list.jsx
import React5 from "react";

// src/option.jsx
import React4 from "react";
function Option(props) {
  const option = { ...props };
  delete option.text;
  if (props.text)
    return /* @__PURE__ */ React4.createElement("option", { ...option }, props.text);
  return /* @__PURE__ */ React4.createElement("option", { ...option });
}

// src/option_list.jsx
function OptionList(props) {
  let options = [];
  if (props.options) {
    options = props.options.map(function(option, index) {
      const _props = { ...option };
      _props.key = index;
      return /* @__PURE__ */ React5.createElement(Option, { ..._props });
    });
  }
  return options;
}

// src/select.jsx
function Select(props) {
  const validation = useFromContext("validation");
  const validateOnBlur = props.validateOnBlur ?? (validation.validate && validation.onBlurValidate);
  const validateOnChange = props.validateOnChange ?? (validation.validate && validation.onChangeValidate);
  const blurHandler = useBlurHandler(props.onBlur, validateOnBlur);
  const changeHandler = useChangeHandler(props.onChange, validateOnChange);
  const invalidHandler = useInvalidHandler(props.onInvalid, validation.validate);
  let defaultValue = "";
  if (props.multiple)
    defaultValue = [];
  const state = useFieldState(props.name, defaultValue);
  let value = state.value;
  if (props.multiple && !Array.isArray(state.value))
    value = [];
  const select = { ...props };
  select.onChange = changeHandler;
  select.onInvalid = invalidHandler;
  select.onBlur = blurHandler;
  select.value ??= value;
  select.className ??= "";
  if (state.error)
    select.className += " " + validation.invalidClassName;
  if (props.options) {
    delete select.options;
    return /* @__PURE__ */ React6.createElement("select", { ...select }, /* @__PURE__ */ React6.createElement(OptionList, { options: props.options }));
  }
  delete select.children;
  return /* @__PURE__ */ React6.createElement("select", { ...select }, props.children);
}

// src/textarea.jsx
import React7 from "react";
function Textarea(props) {
  const validation = useFromContext("validation");
  const validateOnBlur = props.validateOnBlur ?? (validation.validate && validation.onBlurValidate);
  const validateOnChange = props.validateOnChange ?? (validation.validate && validation.onChangeValidate);
  const blurHandler = useBlurHandler(props.onBlur, validateOnBlur);
  const changeHandler = useChangeHandler(props.onChange, validateOnChange);
  const invalidHandler = useInvalidHandler(props.onInvalid, validation.validate);
  const state = useFieldState(props.name);
  const textarea = { ...props };
  textarea.onChange = changeHandler;
  textarea.onInvalid = invalidHandler;
  textarea.onBlur = blurHandler;
  textarea.value ??= state.value;
  textarea.className ??= "";
  if (state.error)
    textarea.className += " " + validation.invalidClassName;
  return /* @__PURE__ */ React7.createElement("textarea", { ...textarea });
}

// src/button.jsx
import React8 from "react";
function Button(props) {
  const state = useFieldState("form");
  const button = { ...props };
  delete button.children;
  if (props.disabled === "formState")
    button.disabled = state.error;
  return /* @__PURE__ */ React8.createElement("button", { ...button }, props.children);
}

// src/datalist.jsx
import React9 from "react";
function Datalist(props) {
  const datalist = { ...props };
  datalist.id ??= props.name;
  if (props.options) {
    delete datalist.options;
    return /* @__PURE__ */ React9.createElement("datalist", { ...datalist }, /* @__PURE__ */ React9.createElement(OptionList, { options: props.options }));
  }
  delete datalist.children;
  return /* @__PURE__ */ React9.createElement("datalist", { ...datalist }, props.children);
}

// src/StateValue.js
function StateValue(props) {
  const state = useFieldState(props.forInput);
  if (typeof props.display === "function")
    return props.display(state.value);
  return state.value;
}

// src/ErrorMessage.js
function ErrorMessage(props) {
  const state = useFieldState(props.forInput);
  return state.error;
}
export {
  Button,
  Datalist,
  ErrorMessage,
  Form,
  FormProvider,
  Input,
  Select,
  StateValue,
  Textarea
};
//# sourceMappingURL=easy-form-esm.js.map
