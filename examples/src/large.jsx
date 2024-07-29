import React from 'react';
import * as Eaf from '../../src/index.js';
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
                <label>Static field: 
                    <output>
                        <Eaf.StateValue forInput="orderdate" display={dateFormatLocal}></Eaf.StateValue>
                    </output>
                </label>
            </div>
            <div>
                <label>Password input: 
                    <Eaf.Input name="pass" type="password" validateOnChange={true} minLength="8" maxLength="30" required />
                </label>
                <Eaf.ErrorMessage forInput="pass"></Eaf.ErrorMessage>
            </div>
            <div>
                <label>Select: 
                    <Eaf.Select name="size" required>
                        <option value=""></option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="extra">Extra Large</option>
                    </Eaf.Select>
                </label>
                <Eaf.ErrorMessage forInput="size"></Eaf.ErrorMessage>
            </div>
            <div>
                <label>Select multiple: 
                    <Eaf.Select name="additions" multiple>
                        <option value="sugar">Sugar</option>
                        <option value="milk">Milk</option>
                        <option value="caramel">Caramel</option>
                        <option value="cinnamon">Cinnamon</option>
                    </Eaf.Select>
                </label>
                <Eaf.ErrorMessage forInput="additions"></Eaf.ErrorMessage>
            </div>
            <div>
                <div>
                    Checkbox multiple: 
                    <label>
                        <Eaf.Input multiple type="checkbox" name="toppings" value="chocolate" />
                        Chocolate
                    </label>
                    <label>
                        <Eaf.Input multiple type="checkbox" name="toppings" value="cream" />
                        Cream
                    </label>
                    <Eaf.ErrorMessage forInput="toppings"></Eaf.ErrorMessage>
                </div>
            </div>
            <div>
                <label>Textarea: 
                    <Eaf.Textarea name="comments" />
                </label>
                <Eaf.ErrorMessage forInput="comments"></Eaf.ErrorMessage>
            </div>
            <div>
                <div>
                    Radio:                     
                    <label>
                        <Eaf.Input type="radio" name="drop" value="delivery" required />
                        Delivery
                    </label>
                    <label>
                        <Eaf.Input type="radio" name="drop" value="takeaway" required />
                        Take away
                    </label>
                    <Eaf.ErrorMessage forInput="drop"></Eaf.ErrorMessage>
                </div>
            </div>
            <div>
                <label>Input with datalist: 
                    <Eaf.Input name="pet" list="pets" />
                </label>
                <Eaf.ErrorMessage forInput="pet"></Eaf.ErrorMessage>
            </div>
            <div>
                <label>File input: 
                    <Eaf.Input type="file" name="bill" required />
                </label>
                <Eaf.ErrorMessage forInput="bill"></Eaf.ErrorMessage>
            </div>
            <div>
                <label>File input multiple: 
                    <Eaf.Input type="file" name="pics[]" multiple />
                </label>
                <Eaf.ErrorMessage forInput="pics"></Eaf.ErrorMessage>
            </div>
            <div>
                <label>
                    <Eaf.Input type="checkbox" name="acceptance" value="T" required  />
                    Checkbox
                </label>
                <Eaf.ErrorMessage forInput="acceptance"></Eaf.ErrorMessage>
            </div>
            <div>
                <button type="reset">Reset</button> 
                <Eaf.Button type="submit" disabled="formState">Submit</Eaf.Button> 
            </div>
        </Eaf.Form>
    </Eaf.Provider>);
}
export { LargeForm };
