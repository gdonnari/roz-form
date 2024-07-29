var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var src_exports = {};
__export(src_exports, {
  Datalist: () => Datalist,
  ErrorMessage: () => ErrorMessage,
  Form: () => Form,
  Input: () => Input,
  Provider: () => Provider,
  Select: () => Select,
  StateValue: () => StateValue,
  SubmitButton: () => SubmitButton,
  Textarea: () => Textarea
});
module.exports = __toCommonJS(src_exports);

// src/FormProvider.jsx
var import_react = __toESM(require("react"));
var Context = import_react.default.createContext(null);
function useFromContext(context, field = false) {
  const ctx = import_react.default.useContext(Context);
  if (field)
    return ctx[context][field];
  return ctx[context];
}
function useFieldState(field, defaultValue = "") {
  const ctx = import_react.default.useContext(Context);
  const state = Object.assign({}, ctx.state[field]) ?? {};
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
  const componentState = Object.assign({}, state[action.field]) ?? {};
  let value = componentState.value;
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
      if (Array.isArray(componentState.value))
        value = [...componentState.value];
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
      if (Array.isArray(componentState.value))
        value = [...componentState.value];
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
      updated[action.field] = componentState;
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
function useInvalidHandler(userHandler) {
  const validate = useFromContext("validate");
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
function useChangeHandler(userHandler, validateOnChange = false) {
  const validate = useFromContext("validate");
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
    if (validate && validateOnChange && e.target.checkValidity()) {
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
function useBlurHandler(userHandler) {
  const onBlurValidate = useFromContext("onBlurValidate");
  const validate = useFromContext("validate");
  const dispatch = useFromContext("dispatch");
  function handler(e) {
    if (validate && onBlurValidate && e.target.checkValidity()) {
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
function Provider(props) {
  const initialState = init(props.data);
  const [state, dispatch] = import_react.default.useReducer(reducer, initialState);
  const context = {
    initialState,
    state,
    dispatch,
    validate: props.validate ?? true,
    onBlurValidate: props.onBlurValidate ?? true,
    invalidClassName: props.invalidClassName ?? "easyform-invalid"
  };
  return /* @__PURE__ */ import_react.default.createElement(Context.Provider, { value: context }, props.children);
}

// src/form.jsx
var import_react2 = __toESM(require("react"));
function Form(props) {
  const validate = useFromContext("validate");
  const submitHandler = useSubmitHandler(props.onSubmit);
  const resetHandler = useResetHandler(props.onReset);
  const form = Object.assign({}, props) ?? {};
  form.onSubmit = submitHandler;
  form.onReset = resetHandler;
  delete form.children;
  if (validate)
    form.noValidate = true;
  return /* @__PURE__ */ import_react2.default.createElement("form", { ...form }, props.children);
}

// src/input.jsx
var import_react3 = __toESM(require("react"));
function Input(props) {
  const changeHandler = useChangeHandler(props.onChange, props.validateOnChange);
  const invalidHandler = useInvalidHandler(props.onInvalid);
  const blurHandler = useBlurHandler(props.onBlur);
  let defaultValue = "";
  if (props.multiple)
    defaultValue = [];
  const state = useFieldState(props.name, defaultValue);
  const input = Object.assign({}, props) ?? {};
  input.value ??= state.value;
  if (props.type === "hidden")
    return /* @__PURE__ */ import_react3.default.createElement("input", { ...input });
  input.onInvalid = invalidHandler;
  input.onChange = changeHandler;
  input.onBlur = blurHandler;
  input.className ??= "";
  delete input.validateOnChange;
  const invalidClassName = useFromContext("invalidClassName");
  if (state.error)
    input.className += " " + invalidClassName;
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
  return /* @__PURE__ */ import_react3.default.createElement("input", { ...input });
}

// src/select.jsx
var import_react6 = __toESM(require("react"));

// src/option_list.jsx
var import_react5 = __toESM(require("react"));

// src/option.jsx
var import_react4 = __toESM(require("react"));
function Option(props) {
  const option = Object.assign({}, props) ?? {};
  delete option.text;
  if (props.text)
    return /* @__PURE__ */ import_react4.default.createElement("option", { ...option }, props.text);
  return /* @__PURE__ */ import_react4.default.createElement("option", { ...option });
}

// src/option_list.jsx
function OptionList(props) {
  let options = [];
  if (props.options) {
    options = props.options.map(function(option, index) {
      const _props = Object.assign({}, option);
      _props.key = index;
      return /* @__PURE__ */ import_react5.default.createElement(Option, { ..._props });
    });
  }
  return options;
}

// src/select.jsx
function Select(props) {
  const changeHandler = useChangeHandler(props.onChange);
  const invalidHandler = useInvalidHandler(props.onInvalid);
  const blurHandler = useBlurHandler(props.onBlur);
  let defaultValue = "";
  if (props.multiple)
    defaultValue = [];
  const state = useFieldState(props.name, defaultValue);
  let value = state.value;
  if (props.multiple && !Array.isArray(state.value))
    value = [];
  const select = Object.assign({}, props) ?? {};
  select.onChange = changeHandler;
  select.onInvalid = invalidHandler;
  select.onBlur = blurHandler;
  select.value ??= value;
  select.className ??= "";
  const invalidClassName = useFromContext("invalidClassName");
  if (state.error)
    select.className += " " + invalidClassName;
  if (props.options) {
    delete select.options;
    return /* @__PURE__ */ import_react6.default.createElement("select", { ...select }, /* @__PURE__ */ import_react6.default.createElement(OptionList, { options: props.options }));
  }
  delete select.children;
  return /* @__PURE__ */ import_react6.default.createElement("select", { ...select }, props.children);
}

// src/textarea.jsx
var import_react7 = __toESM(require("react"));
function Textarea(props) {
  const changeHandler = useChangeHandler(props.onChange);
  const invalidHandler = useInvalidHandler(props.onInvalid);
  const blurHandler = useBlurHandler(props.onBlur);
  const state = useFieldState(props.name);
  const textarea = Object.assign({}, props) ?? {};
  textarea.onChange = changeHandler;
  textarea.onInvalid = invalidHandler;
  textarea.onBlur = blurHandler;
  textarea.value ??= state.value;
  textarea.className ??= "";
  const invalidClassName = useFromContext("invalidClassName");
  if (state.error)
    textarea.className += " " + invalidClassName;
  return /* @__PURE__ */ import_react7.default.createElement("textarea", { ...textarea });
}

// src/submit_button.jsx
var import_react8 = __toESM(require("react"));
function SubmitButton(props) {
  const state = useFieldState("form");
  const button = Object.assign({}, props) ?? {};
  button.type ??= "submit";
  button.disabled = state.error;
  delete button.children;
  return /* @__PURE__ */ import_react8.default.createElement("button", { ...button }, props.children);
}

// src/datalist.jsx
var import_react9 = __toESM(require("react"));
function Datalist(props) {
  const datalist = Object.assign({}, props) ?? {};
  datalist.id ??= props.name;
  if (props.options) {
    delete datalist.options;
    return /* @__PURE__ */ import_react9.default.createElement("datalist", { ...datalist }, /* @__PURE__ */ import_react9.default.createElement(OptionList, { options: props.options }));
  }
  delete datalist.children;
  return /* @__PURE__ */ import_react9.default.createElement("datalist", { ...datalist }, props.children);
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
//# sourceMappingURL=easy-form-cjs.js.map
