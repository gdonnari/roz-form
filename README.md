


# Roz

Use Roz to easy handle the state of any form.

Form validation is supported via [HTML5 Constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation).

## Install

`npm i roz-form`

## Sandbox

Try it online with this [sandbox](https://codesandbox.io/p/sandbox/roz-form-6xwhdf?file=%2Fsrc%2FApp.js).

## Basic Usage

In the following example we will use the main components Roz provides: `Form`, `Input`, `Select` and `Textarea`.

### Step 1. 

We start with a normal HTML form:
 
```
function submitHandler(e) {
    e.preventDefault();

    if (!e.target.checkValidity())
        return false;

    // handle submit...
}

<form name="myform" onSubmit={submitHandler}>
  <div>
    <label>Text input: </label>
    <input name="myinput" type="text" required />
  </div>
  <div>
    <label>Select: </label>
    <select name="options" required>
      <option value=""></option>
      <option value="A">A</option>
      <option value="B">B</option>
    </select>
  </div>
  <div>
    <label>Textarea: </label>
    <textarea name="comments" />
  </div>
  <button type="reset">Reset</button>
  <button type="submit">Submit</button>
</form>
```

 ### Step 2.  
 
 Enclose the form in a `<FormProvider>` component and replace `<form>`, `<input>`, `<select>` and `<textarea>` tags with the provided equivalent Roz components:

```
import * as Roz from 'roz-form';
...
<Roz.FormProvider>
  <Roz.Form name="myform" onSubmit={submitHandler}>
  <div>
    <label>Text input: </label>
    <Roz.Input name="myinput" type="text" required />
  </div>
  <div>
    <label>Select: </label>
    <Roz.Select name="options" required>
      <option value=""></option>
      <option value="A">A</option>
      <option value="B">B</option>
    </Roz.Select>
  </div>
  <div>
    <label>Textarea: </label>
    <Roz.Textarea name="comments" />
  </div>
    <button type="reset">Reset</button>
    <button type="submit">Submit</button>
  </Roz.Form>
</Roz.FormProvider>
```

**In order to work properly, Roz requires you to set a `name` attribute for each managed input.**

Now you have a fully functional form. 
From now on, the form state is managed by Roz.

Roz components are basically wrappers for standard ones, plus a few extensions for validation and state management. This means you can use any attribute that the base component supports. 

###  Step 3.
 Optionally, provide initial values:

```
import * as Roz from 'roz-form';

const record = {
    myinput: 'Some text',
    options: 'B',
    comments: 'testing Roz'
};
...
<Roz.FormProvider data={record}>
  <Roz.Form name="myform" onSubmit={submitHandler}>
    ...
  </Roz.Form>
</Roz.FormProvider>
```

Any record attribute matching with a input name will be assigned as value. 


## Roz components 

|Standard| Roz wrapper |
|--|--|
| form | Form |
| input | Input |
| select | Select |
| textarea | Textarea |


### Support for inputs with multiple values:

Some inputs are meant to be multiple, such as:

 - Selects with the `multiple` attribute.
 - Checkboxes with the same `name` attribute. (*)
 - Inputs with `type="file"` and `multiple` attributes.

For such cases, Roz uses arrays to store the input values.

#### * Notes on Checkbox multiple:

For Roz to properly recognize checkboxes as multiple, just add a `multiple` attribute on each one.

*Example:*
```
  <Roz.Input multiple type="checkbox" name="options" value="A"/> option A
  <Roz.Input multiple type="checkbox" name="options" value="B"/> option B
```

## Validation

Roz relays on the [HTML5 Constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) to support form validation.
 
Validation is enabled by default and can be disabled in favor of your preferred validation method.


### Settings
```
// Validation default settings, as if omitted
const validation = {
    validate: true,
    onBlurValidate: true,
    onChangeValidate: false,
    invalidClassName: 'roz-invalid'
};
   
<Roz.FormProvider data={props.data} validation={validation}>
  <Roz.Form onSubmit={submitHandler}>
    <Roz.Input name="myinput" required /> 
    <!-- validation error display for "myinput" -->
    <Roz.ErrorMessage forInput="myinput" />
    ...
  </Roz.Form>
</Roz.FormProvider>);
```

|Attribute| Usage |
|--|--|
| validate | enable/disable form validation |
| onBlurValidate | enable/disable onBlur validation trigger |
| onChangeValidate | enable/disable onChange validation trigger|
| invalidClassName | Invalid inputs will be tagged with this class|

`onBlurValidate`, `onChangeValidate` and `invalidClassName` attributes can be overwritten at component level.

Example for password input with onChange event validation.
```
<label htmlFor="mypass">Password input: </label>
<Roz.Input name="mypass" type="password" validateOnChange={true} validateOnBlur={false} invalidClassName="custom-invalid" minLength="8" maxLength="30" required />
```

### Accessing the state

Roz provides two components that can be used to access and display the state of an input.

#### StateValue
Returns the input state value.

Example:
```
function dateFormatLocal(value) {
    const d = new Date(value);
    return d.toLocaleString('en-GB');
}
    
<Roz.StateValue forInput="orderdate" display={dateFormatLocal} />
```
|Attribute| Usage |
|--|--|
| forInput | input name |
| *display* | optional, custom display function to be called |


#### ErrorMessage
Returns the input validation error message.
```
<Roz.ErrorMessage forInput="orderdate"/>
```
|Attribute| Usage |
|--|--|
| forInput | input name |
| *display* | optional, custom display function to be called |


### Custom Inputs

You can create custom inputs to meet special use cases.

The following example returns a text input whose value is calculated from other inputs values.

***MyForm.js*** 
```
import * as Roz from 'roz-form';
import { MyCustomInput } from "./custom_input.js";

function MyForm(props) {
...

return (
<Roz.FormProvider>
  <Roz.Form name="myform" onSubmit={submitHandler}>
    <Roz.Input name="input1" type="text"/>
    <Roz.Input name="input2" type="text"/>
    <MyCustomInput name="input3" type="text"/>
    ...
  </Roz.Form>
</Roz.FormProvider>
);
```

***MyCustomInput.js*** 
```
import {StateValue, Input} from 'roz-form';

function MyCustomInput(props) {

    // Take "input1" and "input2" values and concatenate both to get new input value
    const input1 = StateValue({forInput: 'input1'});
    const input2 = StateValue({forInput: 'input2'});

    const input = {...props};
    input.value = input1 + ' ' + input2;
    input.readOnly = true;

    return (<Input {...input} />);
}

export { MyCustomInput };
```

### Goodies

Some helper components to make working with forms even easier.

#### Select options
Easily pass options to select inputs:
```
const additions = [
    {text: '', value: ''},
    {text: 'Sugar', value: 'sugar'},
    {text: 'Milk', value: 'milk'},
    {text: 'Cinnamon', value: 'cinnamon'}
];
...
<Roz.Select name="additions" options={additions} />
```

#### Submit button state
Replace `button` tag with Roz provided one to enable/disable submit button based on validation state:
```
<Roz.Button type="submit" disabled="formState">Submit</Roz.Button>
```

#### Datalist
Easily create a datalist for use with text inputs:
```
const pets = [
    {value: 'bird'},
    {value: 'bunny'},
    {value: 'cat'},
    {value: 'dog'},
    {value: 'fish'}
];
...
<Roz.Datalist id="pets" options={pets} />
<Roz.Input type="text" name="pet" list="pets" />
```

#### Display form validation state

The form validation state can be accessed with an ErrorMessage component.
```
function formStatus(field, error) {

    if (error)
        return 'Form is invalid';

    return 'Form is valid';
}
...
<p><Roz.ErrorMessage forInput="form" display={formStatus} /></p>
```
