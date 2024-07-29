import React from 'react';
import * as Eaf from '../../src/index.js';
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

    return (<Eaf.Provider data={props.data} validate={true}>
        <Eaf.Form onSubmit={submitHandler}>
            <Eaf.Input type="hidden" name="orderid" />
            <datalist id="pets">
                <option value="dog"></option>
                <option value="cat"></option>
                <option value="bird"></option>
                <option value="fish"></option>
                <option value="apple"></option>
            </datalist>
            <div>
                <label>Text input: 
                    <Eaf.Input name="name" required /> 
                </label>
                <Eaf.ErrorMessage forInput="name"></Eaf.ErrorMessage>
            </div>
            <div>
                <label>Numeric input: 
                    <Eaf.Input name="quantity" type="number" min="1" max="10" required />
                </label>
                <Eaf.ErrorMessage forInput="quantity"></Eaf.ErrorMessage>
            </div>
            <div>
                <label>Custom input: 
                    <CustomInput name="custom" required />
                </label>
                <Eaf.ErrorMessage forInput="CustomInput"></Eaf.ErrorMessage>
            </div>
            <div>
                <button type="reset">Reset</button> 
                <Eaf.Button type="submit" disabled="formState">Submit</Eaf.Button> 
            </div>
        </Eaf.Form>
    </Eaf.Provider>);
}
export { SmallForm };
