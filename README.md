

# Roz

> React forms made easy.

Form definition should be easy to read and intuitive.

Roz goal is to handle the state of any form as easily as possible without the need of complex configurations neither React effects.

The one and only Roz concern is about form state management.
Roz doesn't provide any css or form layout utility.
Form validation is supported via standar HTML5 constraint API.

Roz can be used as base component library for fully styled forms without the burden of state managent.


## Basic Usage

To easy understand how to use Roz, let's implement a form in 3 simple steps.
For this example we will use the three main components Roz provides: `input`, `select` and `textarea`.

Step 1. 
Write your form as usual, nothing really new here.
 
```
function submitHandler(e) {
    e.preventDefault();

    if (!e.target.checkValidity())
        return false;

    // handle submit...
}

<form name="myform" onSubmit={submitHandler}>
  <input name="myinput" type="text" required />
  <select name="options" required>
    <option value=""></option>
    <option value="A">A</option>
    <option value="B">B</option>
  </select>
  <textarea name="comments" />
  <button type="reset">Reset</button>
  <button type="submit">Submit</button>
</form>
```

 Step 2.  
 Enclose the form in a `<FormProvider>` component and replace `<form>`, `<input>`, `<select>` and `<textarea>` tags with the provided equivalent Roz components:

```
import * as Roz from 'roz-form';
...
<Roz.FormProvider>
  <Roz.Form name="myform" onSubmit={submitHandler}>
    <Roz.Input name="myinput" type="text" required />
    <Roz.Select name="options" required>
	    <option value=""></option>
	    <option value="A">A</option>
	    <option value="B">B</option>
    </Roz.Select>
    <Roz.Textarea name="comments" />
    <button type="reset">Reset</button>
    <button type="submit">Submit</button>
  </Roz.Form>
</Roz.FormProvider>
```
**In order to work properly, Roz requires you to set a `name` attribute for each managed input.**
Roz components are basically wrappers for standard ones, plus a few extensions for validation and state management. This means you can use any attribute that the base component supports. 

 Step 3.
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
Now you have a fully functional form.  
From now on, the form state is managed by Roz.


## Roz components 

|Standard| Roz wrapper |
|--|--|
| form | Form |
| input | Input |
| select | Select |
| textarea | Textarea |


#### Support for inputs with multiple values:

Some inputs are meant to be multiple, such as:

 - Selects with the `multiple` attribute.
 - Checkboxes whith the same `name` attribute. (*)
 - Inputs with `type="file"` and the `multiple` attribute.

For such cases, Roz uses arrays to store the values.

#### * Notes on Checkbox multiple:

For Roz to properly recognize checkboxes as multiple, just add a `multiple` atribute on each one. This is required because Roz is lazy and doesn't perform any scan or analysis on input names.

*Example:*
```
  <Roz.Input multiple type="checkbox" name="options" value="A"/> option A
  <Roz.Input multiple type="checkbox" name="options" value="B"/> option B
```

## Validation

Roz relays on the [HTML5 contraint API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) to support form validation.
 
Validation is enabled by default and can be disabled in favor to your prefered validation method.


### Settings
```
// Defaults validation as if ommited
const validation = {
    validate: true,
    onBlurValidate: true,
    onChangeValidate: false,
    invalidClassName: 'custom-invalid'
};
   
<Roz.FormProvider novalidate data={props.data} validation={validation}>
  <Roz.Input name="myinput" required /> 
  <!-- validation error display for input -->
  <Roz.ErrorMessage forInput="myinput" />
...
</Roz.FormProvider>);
```

|Attribute| Usage |
|--|--|
| validate | enable/disable Roz form validation |
| onBlurValidate | enable/disable onBlur validation trigger |
| onChangeValidate | enable/disable onChange validation trigger|
| invalidClassName | Invalid inputs will be tagged with this class|

`onBlurValidate`, `onChangeValidate` and `invalidClassName` attributes can be overwritten at component level:

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
import { CustomInput } from "./custom_input.js";

function MyForm(props) {
...

return (
<Roz.FormProvider>
  <Roz.Form name="myform" onSubmit={submitHandler}>
	  <Roz.Input name="input1" type="text"/>
	  <Roz.Input name="input2" type="text"/>
	  <CustomInput name="input3" type="text"/>
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

    return (<Input {...input} />);
}

export { MyCustomInput };
```

### Goodies

Some helper components to make working with forms even easier.

#### Submit button state
Replace `button` tag with Roz provided one to enable/disable submit button based on validation state:
```
<Roz.Button type="submit" disabled="formState">Submit</Roz.Button>
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

#### Select options
Easily pass options to select inputs:
```
const additions = [
    {text: 'Sugar', value: 'sugar'},
    {text: 'Milk', value: 'milk'},
    {text: 'Caramel', value: 'caramel'},
    {text: 'Cinnamon', value: 'cinnamon'}
];
...
<Roz.Select name="additions" options={additions} />
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

### That´s all Folks!

