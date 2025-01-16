// Importing module
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity as tq,
// } from './shoppingCart.js';

// addToCart('bread', 5);
// console.log(price, tq);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

console.log('Importing module');
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 3);
add('apples', 3);
console.log(cart);

