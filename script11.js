'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// ACCOUNT DATA

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// RENAMING OF HTML ELEMENTS

// Labels
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

// Containers
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

// Buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

// Input fields
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// INTERMEDIATE FUNCTIONS

// Generation of movements table
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = 0

  // Sorting logic for movements table
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Creation of usernames list
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(ele => ele[0])
      .join('');
  });

  // console.log(accs);
};

createUsernames(accounts);

//
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accum, cur) => accum + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// REFACTORIZATION: UPDATE UI (higher-order function)

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// EVENT HANDLERS

let currentAccount;

// CLICK EVENT: LOGIN

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  // Find and store requested account as current
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  //  console.log(currentAccount);

  // // Defocus fields
  inputLoginPin.blur();
  inputLoginUsername.blur();

  if (Number(inputLoginPin.value) === currentAccount?.pin) {
    console.log('Correct PIN entered');
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
  }

  //  Update UI to display complete data
  updateUI(currentAccount);

  // Clear username and pin fields
  inputLoginUsername.value = inputLoginPin.value = '';
});

// CLICK EVENT: TRANSFERS

btnTransfer.addEventListener('click', function (e) {
  // Prevent form submission
  e.preventDefault();

  // Definition of intermediate variables for amount and recipient account
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Clear transfer amount and transfer recipient fields
  inputTransferAmount.value = inputTransferTo.value = '';

  // Defocus transfer amount and transfer recipient fields
  inputTransferAmount.blur();
  inputTransferTo.blur();

  // Truth chain of allowed transfer conditions
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Update movements arrays according to transfer request
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI based on new movements
    updateUI(currentAccount);
  }
});

// REQUEST LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  // Clear input fields
  inputLoanAmount.value = '';

  // Defocus loan amount field
  inputLoanAmount.blur();
});

// CLOSE ACCOUNT

btnClose.addEventListener('click', function (e) {
  // Prevent form submission
  e.preventDefault();

  // Defocus input fields
  inputCloseUsername.blur();
  inputClosePin.blur();

  // Truth chain to check credentials
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account object
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  // Clear "close account" fields
  inputCloseUsername.value = inputClosePin.value = '';

  // Reset welcome label
  labelWelcome.textContent = 'Log in to get started';
});

// SORT
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// ARRAY METHODS

// Slice 
// *does not change original array*
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice()); 
// Above line creates shallow copy of arr
console.log([...arr]);

console.log(arr.slice(1, 3));

// Splice 
// *changes original array; removes specified range of entries, leaving the rest in the array*
// second input element is not end index, as in slice method, but quantity of entries
// console.log(arr.splice(2));
arr.splice(-1);
arr.splice(1, 2);
console.log(arr);

// Reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// Concat
const letters = arr.concat(arr2);
console.log(letters);
// Alternate syntax *without altering original array*:
console.log([...arr, ...arr2]);

// Join
console.log(letters.join(' - '));

// Look up method syntax online when needed; won't memorize everything.

// At
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// Ways to get last element of array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('jonas'.at(0));
console.log('jonas'.at(-1));


// For-of loop versus Foreach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if(movement > 0 ) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
};

console.log('---- FOREACH ----');
movements.forEach(function(mov, i, arr) {
  if(mov > 0 ) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(150)
// 2: function(200)
// ...

// Foreach with Maps

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
});

// Foreach with Sets

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}`)
});


// Map, Filter, Reduce

// Map: loops over arrays. Creates a brand-new array based on the original array--something which forEach does not do. Applies callback function to each element of the target array. 


const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDForOf = [];
for (const mov of movements) movementsUSDForOf.push(mov * eurToUsd);
console.log(movementsUSDForOf);

const movementsDescriptions = movements.map((mov, i) => {

    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`;

  }
);

console.log(movementsDescriptions);

const createUsernames = function (accs) {

  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(ele => ele[0]).join('');
  });
  
  console.log(accs);
};


createUsernames(accounts);



// Filter: filters based on a condition. Only passing elements are added to the new array.
// for example, filter out the negative values from an array.

const deposits = movements.filter(function(mov) {
  return mov > 0;
})
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(function(mov) {
  return mov < 0;
});
console.log(withdrawals);

const withdrawalsFor = [];
for (const mov of movements) if (mov < 0) withdrawalsFor.push(mov);
console.log(withdrawalsFor);


// Reduce: like a cooking reduction. Adds all values together, snowballing.

console.log(movements);
// Accumulator (acc below) is like a snowball
// const balance = movements.reduce(function(acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`)
//   return acc + cur;
// }, 0);
// console.log(balance);

// Using arrow function notation
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

// Performing the same task, but "manually" with a for-of loop

let acc1 = 0;
for (const mov of movements) acc1 += mov;
console.log(acc1);

// Using reduce to obtain the maximum value
// Reduce doesn't "boil down" array values only by adding them together; it can arrive at a single value via other processes, too, such as evaluating against a condition.

const max = movements.reduce((acc, cur) => cur > acc ? cur : acc, movements[0]);
console.log(max);



// Methods Chaining

// Chaining methods is like a data pipeline
const eurToUsd = 1.1;
const totalDepositsUSD = movements.filter(mov => mov > 0).map((mov, i , arr) => {
  // console.log(arr);
  return mov * eurToUsd;
}).reduce((acc, mov) => acc + mov, 0);
console.log(movements);
console.log(totalDepositsUSD);




// The find Method
// Retrieve the first array element which satisfies a given condition. Loops over the array like forEach and reduce and filter, but does something different with the array as a result. Unlike filter, find only returns an element, not another array. Also, filter returns all elements satisfying the condition, while find returns only the first.

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// Same thing, but with for-of loop

let accountFind = undefined;
for (const ac of accounts) {
if (ac.owner === 'Jessica Davis') {
  accountFind = ac;
  break;
}
};

console.log(accountFind);


// Some and Every

// console.log(movements);
// // equality check
// console.log(movements.includes(-130));

// // conditional check: some
// const anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits);

// // conditional check: every
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// Separate callback
// Useful for situations where a certain condition is reused in various methods in your code; this is an example of abstraction and contributes to DRY ("don't repeat yourself") code
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// flat method
// Removes outermost level of nesting and returns the resulting "flattened" array
const arr = [[1,2,[3]], [4,[5],6], 7, 8];
console.log(arr.flat());

// Use a depth argument to increase levels of flattening
console.log(arr.flat(2));

// Practice with extracting all the movements
// const accountMovements = accounts.map(acc => acc.movements);
// const allMovements = accountMovements.flat();
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// and with chaining...
const overallBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap method: combines a map and a flat method into one (better performance)
const overallBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);



// Sorting arrays
// sort method: *mutates original array*
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// with numbers
console.log(movements);
console.log(movements.sort((a, b) => {
    // for every adjacent pair of values to be sorted... 
  // return < 0: a, b ; order unchanged ; - means 'don't switch order'
    // return > 0: b, a ; order reversed ; + means 'go ahead and switch it'
    // So, to create an ascending order...
    if(a > b)
      return 1;
    if (b > a)
      return -1;
    // Naturally, reverse to create a descending order
}));

// Condensed expressions using subtraction
// Descending order
console.log(movements.sort((a, b) => a - b));
// Ascending order
console.log(movements.sort((a, b) => b - a));


// CREATING AND FILLING ARRAYS

//1. Empty new array + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));

x.fill(1, 3, 4);
console.log(x);

//2. Array.from
const y = Array.from({length: 7}, () => 1);
console.log(y);

const z = Array.from({length: 7}, (_, i) => i + 1);
console.log(z);




const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);

// You can add a callback function to the .from method, similar to the syntax for the .map method
// syntax: Array.from(iterable object from which array will be made, callback function operating on elements of the iterable)
labelBalance.addEventListener('click', function(e) {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', '')));

  console.log(movementsUI);
});

*/

/////////////////////////////////////////////ARRAY METHODS PRACTICE/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. Find the sum of all deposits in all accounts.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);

console.log(bankDepositSum);

// 2. Find the number of deposits in any account which equal at least 1000 currency units.
// Solution with .filter and .length
const numDeposits1000S = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000S);

// With .reduce
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('a LONG title but not too long'));

/////////////////////////////////////////////CHALLENGES/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Coding Challenge #1
/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀



const checkDogs = function(dogsJulia, dogsKate) {
  let newdogsJulia = dogsJulia.slice(1, -2);

  let dogsJuliaKate = newdogsJulia.concat(dogsKate);

  dogsJuliaKate.forEach(function(age, i, arr) {
    let message = age >= 3 ? `Dog number ${i + 1} is an adult and is ${age} years old` : `Dog number ${i + 1} is still a puppy 🐶`;
    console.log(message);

  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

*/

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀



const calcAverageHumanAge = function(ages) {
  // Initialize intermediate variables
  let humanAge = 0;
  let humanAgeArr = [];
  ages.forEach(function(age, i) {
  // Step 1: convert to human years
  if (age <= 2) {
    humanAge = age * 2
  } else {
    humanAge = age * 4 + 16
  };
  humanAgeArr.push(humanAge);
});
// Step 2: exclude all dogs less than 18 human years old
humanAgeArr.filter(function(humanAge) {
  return humanAge >= 18});
// Step 3: calculate average human age of all adult dogs
const ageSum = humanAgeArr.reduce(function(acc, cur) {
  return acc + cur
});
const averageAge = ageSum / (humanAgeArr.length);
console.log(humanAgeArr);
console.log(averageAge);
return averageAge;
};


calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// Alternate solution using map method

const calcAverageHumanAgeMap = function(ages) {
  const humanAgeArr = ages.map(function(age, i) {
  // Step 1: convert to human years
  if (age <= 2) {
    return age *= 2
  } else {
    return age = age * 4 + 16
  };
});
// Step 2: exclude all dogs less than 18 human years old
const adultHumanAgeArr = humanAgeArr.filter(function(humanAge) {
  return humanAge >= 18});
// Step 3: calculate average human age of all adult dogs
const ageSum = adultHumanAgeArr.reduce(function(acc, cur) {
  return acc + cur
});
const averageAge = ageSum / (adultHumanAgeArr.length);
console.log(adultHumanAgeArr);
console.log(averageAge);
return averageAge;
};

calcAverageHumanAgeMap([5, 2, 4, 1, 15, 8, 3]);


// Challenge #3

// Rewrite the calcAverageHumanAge function from Challenge #2 using arrow functions and methods chaining.

const calcAverageHumanAgeMap = ages => ages.map((age, i) => age <= 2 ? age *= 2 : age = age * 4 + 16).filter(humanAge => humanAge >= 18).reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  // Step 1: convert to human years
  // Step 2: exclude all dogs less than 18 human years old
  // Step 3: calculate average human age of all adult dogs
  
   
calcAverageHumanAgeMap([5, 2, 4, 1, 15, 8, 3]);

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀

// My solutions

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  sarahsDog.curFood > sarahsDog.recommendedFood
    ? `${sarahsDog.owners.join(' and ')}'s dog has been eating too MUCH 😩`
    : `${sarahsDog.owners.join(' and ')}'s dog has been eating too LITTLE 😥`
);

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat TOO MUCH! 🚫`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat TOO LITTLE! 💔`);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

const okayFoodTest = function (dogs) {
  return dogs.some(
    dog =>
      Math.abs(dog.curFood - dog.recommendedFood) < 0.1 * dog.recommendedFood
  );
};

console.log(okayFoodTest(dogs));

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

const okayDogs = [];

dogs.forEach(dog => {
  if (Math.abs(dog.curFood - dog.recommendedFood) < 0.1 * dog.recommendedFood) {
    okayDogs.push(dog);
  }
});

console.log(okayDogs);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

const dogsCopySorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsCopySorted);
*/

// AI-GENERATED CHALLENGE

// Exercise 1: Slice and Splice
// Given an array arr = ['a', 'b', 'c', 'd', 'e'], use the slice method to create a new array that contains the elements from index 2 to 4.
const arr = ['a', 'b', 'c', 'd', 'e'];
const newArr = arr.slice(2, 4);
// Use the splice method to remove the last two elements from the original array arr.
arr.splice(-2);

// Exercise 2: Map and Filter
// Given an array of movements [200, 450, -400, 3000, -650, -130, 70, 1300], use the map method to convert these movements to USD (assume 1 EUR = 1.1 USD).
const arrOfMovements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const arrOfMovementsUSD = arrOfMovements.map(mov => mov * 1.1);
// Use the filter method to create a new array containing only the deposits (positive values).
const arrOfMovementsDeposits = arrOfMovements.filter(mov => mov > 0);
// Exercise 3: Reduce
// 1. Given an array of movements [200, 450, -400, 3000, -650, -130, 70, 1300], use the reduce method to calculate the total balance.
const totalBalance = arrOfMovements.reduce((acc, cur) => acc + cur, 0);
// 2. Use the reduce method to find the maximum value in the array.
const maxValue = arrOfMovements.reduce(
  (acc, cur) => (cur > acc ? cur : acc),
  0
);
// Exercise 4: Find and FindIndex
// Given an array of account objects, find the account with the owner name 'Jessica Davis'.
console.log(accounts.find(acc => acc.owner === 'Jessica Davis'));
// Use the findIndex method to find the index of the account with the owner name 'Sarah Smith'.
console.log(accounts.findIndex(acc => acc.owner === 'Sarah Smith'));
// Exercise 5: Some and Every
// 1. Given an array of movements [200, 450, -400, 3000, -650, -130, 70, 1300], use the some method to check if there is any deposit greater than 1000.
console.log(arrOfMovements.some(mov => mov > 1000));
// Use the every method to check if all movements are deposits (positive values).
console.log(arrOfMovements.every(mov => mov > 0));
// Exercise 6: Flat and FlatMap
// 1. Given a nested array arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]], use the flat method to create a new array that is a flattened version of arr.
const arr1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const flatArr1 = arr1.slice().flat();
console.log(arr1);
console.log(flatArr1);
// 2. Given an array of account objects, use the flatMap method to create a new array containing all the movements.
const everyMovement = accounts.flatMap(acc => acc.movements);
// Exercise 7: Sort
// Given an array of movements [200, 450, -400, 3000, -650, -130, 70, 1300], use the sort method to sort the movements in ascending order.
const sortedArrAscending = arrOfMovements.sort((a, b) => a - b);
console.log(sortedArrAscending);
// Use the sort method to sort the movements in descending order.
const sortedArrDescending = arrOfMovements.sort((a, b) => b - a);
console.log(sortedArrDescending);
// Exercise 8: Array.from
// 1. Use the Array.from method to create an array of 7 elements, each initialized to 1.
const arrSevenOnes = Array.from({ length: 7 }, () => 1);
console.log(arrSevenOnes);
// Use the Array.from method to create an array of numbers from 1 to 7.
console.log(Array.from({ length: 7 }));
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// APP EXTRAS
/*
// Function to change background color smoothly
const changeBackground = function() {
  const colors = ['#f3e5f5', '#e8eaf6', '#e3f2fd', '#e0f2f1', '#f1f8e9', '#fff3e0'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Add transition property to body
  document.body.style.transition = 'background-color 2s ease';
  
  // Change background color
  document.body.style.backgroundColor = randomColor;
};

// Change background color every 4 seconds (2s for transition + 2s for display)
setInterval(changeBackground, 4000);

// Initial call to set transition property
changeBackground();

// Jumpscare feature
const jumpscare = function() {
  // Create jumpscare element
  const jumpscareEl = document.createElement('div');
  jumpscareEl.style.position = 'fixed';
  jumpscareEl.style.top = '0';
  jumpscareEl.style.left = '0';
  jumpscareEl.style.width = '100%';
  jumpscareEl.style.height = '100%';
  jumpscareEl.style.backgroundColor = 'black';
  jumpscareEl.style.display = 'flex';
  jumpscareEl.style.justifyContent = 'center';
  jumpscareEl.style.alignItems = 'center';
  jumpscareEl.style.zIndex = '9999';
  jumpscareEl.style.opacity = '0';
  jumpscareEl.style.transition = 'opacity 0.1s ease-in-out';

  // Create scary image
  const scaryImg = document.createElement('img');
  scaryImg.src = 'https://lh4.googleusercontent.com/proxy/Iw3QzXjOwZMaVBqCWWmbYkRXGXt7kfT6PPT8-8qdroAC6PN0GEJUHV5Ia4LkeAtf69dIZcHW953qbRuQQ1m950XvKhq3RXMHR_PLGu_IArmNNA'; // Replace with actual scary image URL
  scaryImg.style.maxWidth = '80%';
  scaryImg.style.maxHeight = '80%';

  // Add image to jumpscare element
  jumpscareEl.appendChild(scaryImg);

  // Add jumpscare element to body
  document.body.appendChild(jumpscareEl);

  // Function to trigger jumpscare
  const triggerJumpscare = function() {
    jumpscareEl.style.opacity = '1';
    
    // Play scary sound
    const scarySound = new Audio('http://soundbible.com/grab.php?id=1059&type=mp3'); // Replace with actual scary sound URL
    scarySound.play();

    // Hide jumpscare after 1 second
    setTimeout(() => {
      jumpscareEl.style.opacity = '0';
    }, 1000);
  };

  // Trigger jumpscare at random intervals between 5 and 20 seconds
  const scheduleNextJumpscare = () => {
    const randomInterval = Math.floor(Math.random() * (20000 - 5000 + 1) + 5000);
    setTimeout(() => {
      triggerJumpscare();
      scheduleNextJumpscare();
    }, randomInterval);
  };

  scheduleNextJumpscare();
};

// Call jumpscare function
jumpscare();

*/
