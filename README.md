
# Roz
React forms made easy.

## Basic Usage

 1. Write your form:
 
```
<form name="myform" onSubmit={submitHandler}>
  <input name="myinput" type="text" required />
  <button type="reset">Reset</button>
  <button type="submit">Submit</button>
</form>
```

 2. Enclose the form in a FormProvider component:
 
```
import * as Roz from 'roz-form';
...
<Roz.FormProvider>
  <form name="myform" onSubmit={submitHandler}>
    <input name="myinput" type="text" required />
    <button type="reset">Reset</button>
    <button type="submit">Submit</button>
  </form>
</Roz.FormProvider>
```

 3. Replace form and form inputs with the provided equivalent Roz components:

```
import * as Roz from 'roz-form';
...
<Roz.FormProvider>
  <Roz.Form name="myform" onSubmit={submitHandler}>
    <Roz.Input name="myinput" type="text" required />
    <button type="reset">Reset</button>
    <button type="submit">Submit</button>
  </Roz.Form>
</Roz.FormProvider>
```

4. Provide initial values in a FormProvider data attribute:

```
import * as Roz from 'roz-form';

const record = {
    myinput: 'John Doe'
};
...
<Roz.FormProvider data={record}>
  <Roz.Form name="myform" onSubmit={submitHandler}>
    <Roz.Input name="myinput" type="text" required />
    <button type="reset">Reset</button>
    <button type="submit">Submit</button>
  </Roz.Form>
</Roz.FormProvider>
```
Now you have a fully functional form.  The form state is managerd by Roz.

Notes: 
In order to work properly Roz requires you to set a "name" attribute for each managed input.
Record attributes matching the input name will be assigned as values.

## More 

Roz can handle any type of input, such as Textarea, radio, checkbox and Select including multiple values, 
Also handles validation and the submit button disabled state.
Roz relays on the HTML5 contraint API to support form validation.
Default validation can be disabled in favor to your prefered validation library.
You can create custom inputs to meet special use cases.
