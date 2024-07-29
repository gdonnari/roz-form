import React from 'react';
import { createRoot } from 'react-dom/client';
import { LargeForm } from "./large.jsx";
import { SmallForm } from "./small.jsx";

const record = {
    orderid: 1,
    orderdate: '2024-02-01T19:40',
    name: 'John Doe',
    nickName: 'Johnny',
    quantity: 1,
    size: 'medium',
    additions: ['sugar'],
    toppings: ['chocolate'],
    comments: 'Like it cold',
    drop: 'delivery',
    pet: 'dog',
    acceptance: 'T'
};

export default function MyApp() {

    const [form, setForm] = React.useState('small');

    function showSmall(e) {
        setForm('small');
    }

    function showLarge(e) {
        setForm('large');
    }

    let title = null;
    let element = null;

    switch (form) {
        case 'large':
            title = 'Large Form';
            element = (<LargeForm data={record} />);
            break;
        case 'small':
            title = 'Small Form';
            element = (<SmallForm data={record} />);
            break;
    }

    return (
            <div>
                <h1>Examples</h1>
                <ul>
                    <li><a href="#" onClick={showSmall}>Small Form</a></li>
                    <li><a href="#" onClick={showLarge}>Large Form</a></li>
                </ul>
                <h1>{title}</h1>
                {element}
            </div>
            );
}

const root = createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <MyApp />
</React.StrictMode>);