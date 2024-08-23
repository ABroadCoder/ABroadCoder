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

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// INTERMEDIATE FUNCTIONS

const displayMovements = function(movements) {
  containerMovements.innerHTML = '';
  // .textContent = 0


  movements.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

  
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;


    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


const createUsernames = function (accs) {

  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(ele => ele[0]).join('');
  });
  
  // console.log(accs);
};

createUsernames(accounts);

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((accum, cur) => accum + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};


const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate / 100).filter((int, i, arr) => {
    // console.log(arr);
    return int >= 1;
  }).reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// REFACTORIZATION: UPDATE UI

const updateUI = function(acc) {
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

btnLogin.addEventListener('click', function(e) {
  // Prevent form from submitting
  e.preventDefault();

 currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
//  console.log(currentAccount);

 if (Number(inputLoginPin.value) === currentAccount?.pin) {
  console.log('Correct PIN entered');
// Display UI and Welcome Message
labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
containerApp.style.opacity = 100;

// Clear username and pin fields
inputLoginUsername.value = inputLoginPin.value = '';
inputLoginPin.blur();
inputLoginUsername.blur();
 }
 
//  Update UI to display complete data
updateUI(currentAccount);

});

// CLICK EVENT: TRANSFERS

btnTransfer.addEventListener('click', function(e) {
  // Prevent form submission
  e.preventDefault();

  // Definition of intermediate variables for amount and recipient account
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  // Clear transfer amount and transfer recipient fields
  inputTransferAmount.value = inputTransferTo.value = '';

  // Truth chain to catch unallowed transfer conditions
  if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    
    // Update movements arrays according to transfer request
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI based on new movements
    updateUI(currentAccount);
  };
});

// REQUEST LOAN

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)
) {
  // Add movement
  currentAccount.movements.push(amount);

  // Update UI
  updateUI(currentAccount);
}

  // Clear input fields
  inputLoanAmount.value = '';
});

// CLOSE ACCOUNT

btnClose.addEventListener('click', function(e) {
  // Prevent form submission
  e.preventDefault();

  // Truth chain to check credentials
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

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
*/

// Some and Every

console.log(movements);
// equality check
console.log(movements.includes(-130));

// conditional check: some
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// conditional check: every
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
// Useful for situations where a certain condition is reused in various methods in your code; this is an example of abstraction and contributes to DRY ("don't repeat yourself") code
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

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
*/
