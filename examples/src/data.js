export const sizes = [
    {text: '', value: ''},
    {text: 'Small', value: 'small', 'data-code': 'S'},
    {text: 'Medium', value: 'medium', 'data-code': 'M'},
    {text: 'Large', value: 'large', 'data-code': 'L'},
    {text: 'Extra Large', value: 'extra', 'data-code': 'XL'}
];

export const additions = [
    {text: 'Sugar', value: 'sugar'},
    {text: 'Milk', value: 'milk'},
    {text: 'Caramel', value: 'caramel'},
    {text: 'Cinnamon', value: 'cinnamon'}
];

export const toppings = [
    {text: 'Chocolate', value: 'chocolate'},
    {text: 'Cream', value: 'cream'}
];

export const drops = [
    {text: 'Delivery', value: 'delivery'},
    {text: 'Take away', value: 'takeaway'}
];

export const pets = [
    {value: 'dog'},
    {value: 'cat'},
    {value: 'bird'},
    {value: 'fish'},
    {value: 'apple'}
];

// new Record presets
export const newRecord = {};

// Ajax query results
export const recordList = [{
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
    }, {
        orderid: 2,
        orderdate: '2024-02-01T19:40',
        name: 'Adrian Smith',
        nickName: 'Ragnar',
        quantity: 1,
        size: 'large',
        additions: ['milk', 'caramel'],
        toppings: ['cream'],
        comments: 'Like it hot',
        drop: 'takeaway',
        acceptance: 'T'
    }];