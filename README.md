
# Easy forms for react


## Basic Usage

 1. Write your form:
 
```
<form name="myform" onSubmit={submitHandler}>
  <input name="myinput" type="text" required />
  <button type="reset">Reset</button>
  <button type="submit">Submit</button>
</form>
```

 2. Enclose the form in a Eaf.Provider component:
 
```
<Eaf.Provider>
  <form name="myform" onSubmit={submitHandler}>
    <input name="myinput" type="text" required />
    <button type="reset">Reset</button>
    <button type="submit">Submit</button>
  </form>
</Eaf.Provider>
```

 3. Replace form and form inputs with the provided equivalent Eaf components:

```
import * as Eaf from 'easy-form';
...
<Eaf.Provider>
  <Eaf.Form name="myform" onSubmit={submitHandler}>
    <Eaf.Input name="myinput" type="text" required />
    <button type="reset">Reset</button>
    <button type="submit">Submit</button>
  </Eaf.Form>
</Eaf.Provider>
```

4. Provide initial values in a Eaf.Provider data attribute:

```
import * as Eaf from 'easy-form';

const record = {
    myinput: 'John Doe'
};
...
<Eaf.Provider data={record}>
  <Eaf.Form name="myform" onSubmit={submitHandler}>
    <Eaf.Input name="myinput" type="text" required />
    <button type="reset">Reset</button>
    <button type="submit">Submit</button>
  </Eaf.Form>
</Eaf.Provider>
```
Now you have a fully functional form.  The form state is managerd by Eaf.

Notes: 
In order to work properly EasyForm requires you to set a "name" attribute for each managed input.
Record attributes matching the input name will be assigned as values.

## More 

Eaf can handle any type of input, such as Textarea, radio, checkbox and Select including multiple values, 
Also handles validation and the submit button disabled state.
Eaf relays on the HTML5 contraint API to support form validation.
Default validation can be disabled in favor to your prefered validation library.
You can create custom inputs to meet special use cases.


