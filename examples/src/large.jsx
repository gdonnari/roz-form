import React from 'react';
import * as Roz from '../../src/index.js';
import { CustomInput } from "./custom_input.jsx";

function LargeForm(props) {

    function submitHandler(e) {
        e.preventDefault();

        if (!e.target.checkValidity()) {
            console.log('Form is invalid');
            return false;
        }

        console.log('Form is valid');
    }

    function dateFormatLocal(value) {
        const d = new Date(value);
        return d.toLocaleString('en-GB');
    }

    const validation = {
        validate: true,
        onBlurValidate: true,
        onChangeValidate: false,
        invalidClassName: 'custom-invalid'
    };

    return (<Roz.FormProvider data={props.data} validation={validation}>
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
                <label>Static field: 
                    <output>
                        <Roz.StateValue forInput="orderdate" display={dateFormatLocal}></Roz.StateValue>
                    </output>
                </label>
            </div>
            <div>
                <label>Password input: 
                    <Roz.Input name="pass" type="password" validateOnChange={true} validateOnBlur={false}  minLength="8" maxLength="30" required />
                </label>
                <Roz.ErrorMessage forInput="pass"></Roz.ErrorMessage>
            </div>
            <div>
                <label>Select: 
                    <Roz.Select name="size" required>
                        <option value=""></option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="extra">Extra Large</option>
                    </Roz.Select>
                </label>
                <Roz.ErrorMessage forInput="size"></Roz.ErrorMessage>
            </div>
            <div>
                <label>Select multiple: 
                    <Roz.Select name="additions" multiple>
                        <option value="sugar">Sugar</option>
                        <option value="milk">Milk</option>
                        <option value="caramel">Caramel</option>
                        <option value="cinnamon">Cinnamon</option>
                    </Roz.Select>
                </label>
                <Roz.ErrorMessage forInput="additions"></Roz.ErrorMessage>
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
                    <Roz.ErrorMessage forInput="toppings"></Roz.ErrorMessage>
                </div>
            </div>
            <div>
                <label>Textarea: 
                    <Roz.Textarea name="comments" />
                </label>
                <Roz.ErrorMessage forInput="comments"></Roz.ErrorMessage>
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
                    <Roz.ErrorMessage forInput="drop"></Roz.ErrorMessage>
                </div>
            </div>
            <div>
                <label>Input with datalist: 
                    <Roz.Input name="pet" list="pets" />
                </label>
                <Roz.ErrorMessage forInput="pet"></Roz.ErrorMessage>
            </div>
            <div>
                <label>File input: 
                    <Roz.Input type="file" name="bill" required />
                </label>
                <Roz.ErrorMessage forInput="bill"></Roz.ErrorMessage>
            </div>
            <div>
                <label>File input multiple: 
                    <Roz.Input type="file" name="pics[]" multiple />
                </label>
                <Roz.ErrorMessage forInput="pics"></Roz.ErrorMessage>
            </div>
            <div>
                <label>
                    <Roz.Input type="checkbox" name="acceptance" value="T" required  />
                    Checkbox
                </label>
                <Roz.ErrorMessage forInput="acceptance"></Roz.ErrorMessage>
            </div>
            <div>
                <button type="reset">Reset</button> 
                <Roz.Button type="submit" disabled="formState">Submit</Roz.Button> 
            </div>
        </Roz.Form>
    </Roz.FormProvider>);
}
export { LargeForm };
