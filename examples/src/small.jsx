import React from 'react';
import * as Roz from '../../src/index.js';
import { CustomInput } from "./custom_input.jsx";

function SmallForm(props) {

    function submitHandler(e) {
        e.preventDefault();

        if (!e.target.checkValidity()) {
            console.log('Form is invalid');
            return false;
        }

        console.log('Form is valid');
    }

    return (<Roz.FormProvider data={props.data}>
        <Roz.Form onSubmit={submitHandler}>
            <Roz.Input type="hidden" name="orderid" />
            <datalist id="pets">
                <option value="dog"></option>
                <option value="cat"></option>
                <option value="bird"></option>
                <option value="fish"></option>
                <option value="apple"></option>
            </datalist>
            <div>
                <label>Text input: 
                    <Roz.Input name="name" required /> 
                </label>
                <Roz.ErrorMessage forInput="name"></Roz.ErrorMessage>
            </div>
            <div>
                <label>Numeric input: 
                    <Roz.Input name="quantity" type="number" min="1" max="10" required />
                </label>
                <Roz.ErrorMessage forInput="quantity"></Roz.ErrorMessage>
            </div>
            <div>
                <label>Custom input: 
                    <CustomInput name="custom" required />
                </label>
                <Roz.ErrorMessage forInput="CustomInput"></Roz.ErrorMessage>
            </div>
            <div>
                <button type="reset">Reset</button> 
                <Roz.Button type="submit" disabled="formState">Submit</Roz.Button> 
            </div>
        </Roz.Form>
    </Roz.FormProvider>);
}
export { SmallForm };
