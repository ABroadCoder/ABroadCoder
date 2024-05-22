'use strict';

const weekdays = ['mon', 'tues', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [`Day-${2 + 3}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
}

console.log(openingHours);

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 enhanced object literal syntax
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },


  orderDelivery({starterIndex=1, mainIndex=0, time='20:00', address}){ 
      console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}.`)
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// Property names
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days:`;
for (const day of properties) {
  openStr += `${day}, `;
};
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
console.log(entries);

// [key, value]
for(const [key, {open, close}] of entries) {
  console.log(`On ${key}, we open at ${open} and close at ${close}`);
}


// Without optional chaining
// if (restaurant.openingHours && restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// With optional chaining

console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['mon', 'tues', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log((`On ${day}, we open at ${open}.`));
};

// Methods with optional chaining
console.log(restaurant.order?.(0,1) ?? 'Method does not exist.');
console.log(restaurant.orderRisotto?.(0,1) ?? 'Method does not exist.');

// Arrays with optional chaining
const users = [
  {name: 'Jonas', email: 'hello@jonas.io'}
];

// console.log(users[0]?.name ?? 'User array empty.');



restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,

});

restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
// console.log(guests);

// Nullish: keeps going through null and undefined, NOT through 0 or ''; i.e., returns first non-nullish value.
const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);


const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;

// OR assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// NULLISH assignment operator (null or defined values are skipped)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';


// Enhanced Object Literals




/*

// For-of Loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  console.log(`{i + 1}: ${el}`);
};

console.log([...menu.entries()]);


// LOGICAL OPERATORS, CONTINUED
// They can use any data type, return any data type, and use short-circuiting
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'hello' || 23 || null);

// Returns first truthy value, if any

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// Setting default return value using short-circuiting with ||
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// && operator: short-circuiting returns first FALSY value, as at that point it's become clear that the logical result is false. Else, the last element is returned.
console.log("---AND---");
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'Jonas');

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
};

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');


// REST PATTERN AND PARAMETERS
// Destructuring

// Spread, because on RIGHT side of assignment operator
  const arr = [1,2, ...[3,4]];

  // Rest, because on LEFT side of assignment operator
  const [a,b,...others] = [1,2,3,4,5];
  console.log(a,b,others);

  const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood);

// Objects
const obj1 = {sat, ...weekdays};

// Functions
const add = function(...numbers) {
  let sum = 0;
  for(let i =0; i<numbers.length; i++) 
  sum += numbers[i];
  console.log(sum);

};

add(2,3);
add(5,3,7,2);
add(8,2,5,3,2,1,4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');


// Spread operator
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join arrays together
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// Iterables are arrays, strings, maps, and sets, but not objects
const str = 'Jonas';
const letters = [...str, ' ', "S."];
console.log(letters);

//  const ingredients = [prompt('Let\'s) make pasta! Ingredient 1?'), prompt('Ingredient 2?'), prompt('Ingredient 3?')];

//  Passing values to a function using the spread operator
// restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = {foundedIn: 1998, ...restaurant, founder: 'Giuseppe'}
console.log(newRestaurant);

const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);



// Destructuring Objects
const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

// Renaming variables
const newNew = {name: restaurantName, openingHours: hours, categories: tags};
console.log(restaurantName, hours, tags);

// Setting a default value
const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = {a: 23, b: 7, c: 14};
({a, b} = obj);
console.log(a, b);

// Nesting
const {fri: {open: o, close: c},} = openingHours;
console.log(open, close);



const arr = [2,3,4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

const [main, , secondary] = restaurant.categories;
console.log(main, secondary);

const temp = main;
main = secondary;
secondary = temp;

// Switching variables' values
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive two values from a single function call
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, ,[j, k]] = nested;
console.log(i, j, k);

//Default values (in case of unknown array length)
const [p=1, q=1, r=1] = [8, 9];
console.log(p, q, r);

*/

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀


// Soccer Data from Website
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
// Via individual assignment
// const players1 = game.players[0];
// const players2 = game.players[1];

// Via array notation
const [players1, players2] = game.players;

console.log(players1);
console.log(players2);

// 2.
const [gk, ...fieldPlayers] = players1;

console.log(gk);
console.log(fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];

console.log(allPlayers);

// 4.
const subPlayers1 = ['Thiago', 'Coutinho', 'Perisic'];
const players1Final = [...players1, ...subPlayers1];

console.log(players1Final);

// 5.
const {team1, x: draw, team2} = game.odds;

// Individual indices method (not elegant)
// const team1 = game.odds.team1;
// const draw = game.odds.x;
// const team2 = game.odds.team2;

console.log(team1, draw, team2);

// 6.
function printGoals(...scorers) {
  console.log(...scorers);
  console.log(`${[...scorers].length} goals were scored.`);
};

printGoals('Thiago', 'Coutinho', 'Perisic');
printGoals(...game.scored);

// 7.
team1 < team2 && console.log('Team 1 is more likely to win.');
team2 < team1 && console.log('Team 2 is more likely to win.');

// Using Ternary Operator
// console.log(team1, team2);
// team1 < team2 ? console.log('Team 1 is more likely to win.') : console.log('Team 2 is more likely to win.');

////////////////////////////////////////////////////////////////////////////////////////////////////

// Coding Challenge #2

Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀


// Soccer Data from Website
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
for(const [index, value] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${value}`);
}

// 2.
// Calculation of average odd
let total = 0;
for (const [index, value] of Object.entries(game.odds)) {
  total += value;
}
console.log(total);
const averageOdd = total/(Object.entries(game.odds).length);
console.log(averageOdd);

// 3.
for (const [key, value] of Object.entries(game.odds)) {
  const firstPart = key === 'x' ? 'draw' : `victory ${game[key]}`;
  console.log(`Odd of ${firstPart}: ${value}`);
}

// BONUS
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : scorers[player] = 1;
}

console.log(scorers);

*/

//////////////////////////////////////////////////////////////////////////
// Sets

const ordersSet = new Set([
'Pasta', 
'Pizza', 
'Pizza', 
'Risotto', 
'Pasta', 
'Pizza'
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear();
console.log(ordersSet);

for(const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staff).size);

console.log(new Set('jonasschmedtmann').size);

// Maps

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(')

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);
// rest.clear();

const arr = [1,2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 😁'],
  [false, 'Try again 😌'],
]);
console.log(question);

// Convert object to map
const hoursMap = new Map(object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for(const [key, value] of question) {
  if(typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
