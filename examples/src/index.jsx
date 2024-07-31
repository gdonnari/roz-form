import React from 'react';
import { createRoot } from 'react-dom/client';
import { LargeForm } from "./large_form.jsx";

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
    return (
            <div>
                <h1>Large Form</h1>
                <LargeForm />
            </div>
            );
}

const root = createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <MyApp />
</React.StrictMode>);