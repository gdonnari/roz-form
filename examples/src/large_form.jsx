import React from 'react';
import * as Roz from '../../src/index.js';
import { CustomInput } from "./custom_input.jsx";
import * as Dataset from "./data.js";

function LargeForm(props) {

    function submitHandler(e) {
        e.preventDefault();

        if (!e.target.checkValidity()) {
            return false;
        }

        // submit...
    }

    function dateFormatLocal(value) {
        const d = new Date(value);
        return d.toLocaleString('en-GB');
    }

    function formError(field, error) {

        if (error)
            return 'Form is invalid';

        return 'Form is valid';
    }

    const validation = {
        validate: true,
        onBlurValidate: true,
        onChangeValidate: false,
        invalidClassName: 'roz-invalid'
    };

    return (<Roz.FormProvider data={props.data} validation={validation}>
        <Roz.Form onSubmit={submitHandler}>
            <Roz.Input type="hidden" name="orderid" />
            <Roz.Datalist id="pets" options={Dataset.pets} />
            <div>
                <label>Text input: 
                    <Roz.Input name="name" type="text" required /> 
                </label>
                <Roz.ErrorMessage forInput="name" /> 
            </div>
            <div>
                <label>Numeric input: 
                    <Roz.Input name="quantity" type="number" min="1" max="10" required />
                </label>
                <Roz.ErrorMessage forInput="quantity" /> 
            </div>
            <div>
                <label>Custom input: 
                    <CustomInput name="custom" type="text" readOnly />
                </label>
                <Roz.ErrorMessage forInput="custom" /> 
            </div>
            <div>
                <label>Date input: 
                    <Roz.Input name="orderdate" type="datetime-local" required /> 
                </label>
                <Roz.ErrorMessage forInput="orderdate" /> 
            </div>
            <div>
                <label>Input value: 
                    <output>
                        <Roz.StateValue forInput="orderdate" display={dateFormatLocal}/>
                    </output>
                </label>
            </div>
            <div>
                <label>Password input: 
                    <Roz.Input name="pass" type="password" validateOnChange={true} validateOnBlur={false} invalidClassName="custom-invalid" minLength="8" maxLength="30" required />
                </label>
                <Roz.ErrorMessage forInput="pass" /> 
            </div>
            <div>
                <label>Select: 
                    <Roz.Select name="size" required options={Dataset.sizes} />
                </label>
                <Roz.ErrorMessage forInput="size" /> 
            </div>
            <div>
                <label>Select multiple: 
                    <Roz.Select name="additions" multiple options={Dataset.additions} />
                </label>
                <Roz.ErrorMessage forInput="additions" /> 
            </div>
            <div>
                <div>
                    Checkbox multiple: 
                    <label>
                        <Roz.Input multiple type="checkbox" name="toppings" value="chocolate" />
                        Chocolate
                    </label>
                    <label>
                        <Roz.Input multiple type="checkbox" name="toppings" value="cream" />
                        Cream
                    </label>
                    <Roz.ErrorMessage forInput="toppings" /> 
                </div>
            </div>
            <div>
                <label>Textarea: 
                    <Roz.Textarea name="comments" />
                </label>
                <Roz.ErrorMessage forInput="comments" /> 
            </div>
            <div>
                <div>
                    Radio:                     
                    <label>
                        <Roz.Input type="radio" name="drop" value="delivery" required />
                        Delivery
                    </label>
                    <label>
                        <Roz.Input type="radio" name="drop" value="takeaway" required />
                        Take away
                    </label>
                    <Roz.ErrorMessage forInput="drop" /> 
                </div>
            </div>
            <div>
                <label>Input with datalist: 
                    <Roz.Input type="text" name="pet" list="pets" />
                </label>
                <Roz.ErrorMessage forInput="pet" /> 
            </div>
            <div>
                <label>File input: 
                    <Roz.Input type="file" name="bill" required />
                </label>
                <Roz.ErrorMessage forInput="bill" /> 
            </div>
            <div>
                <label>File input multiple: 
                    <Roz.Input type="file" name="pics[]" multiple />
                </label>
                <Roz.ErrorMessage forInput="pics" /> 
            </div>
            <div>
                <label>
                    <Roz.Input type="checkbox" name="acceptance" value="T" required  />
                    Checkbox
                </label>
                <Roz.ErrorMessage forInput="acceptance" /> 
            </div>
            <div>
                <button type="reset">Reset</button> 
                <Roz.Button type="submit" disabled="formState">Submit</Roz.Button> 
            </div>
        </Roz.Form>
        <p><Roz.ErrorMessage forInput="form" display={formError} /></p>
    </Roz.FormProvider>);
}
export { LargeForm };
