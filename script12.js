'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2024-08-30T23:36:17.929Z',
    '2024-09-02T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2024-09-02T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

// GLOBAL VARIABLES

let currentAccount, timer;

// Dates options object
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long',
};

// INTERMEDIATE FUNCTIONS

// Format currency

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Generation of movements table
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = 0

  // Dates generation for movements rows
  const formatMovementDate = function (date) {
    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);
    console.log(daysPassed);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    else {
      // const day = `${date.getDate()}`.padStart(2, 0);
      // const month = `${date.getMonth() + 1}`.padStart(2, 0);
      // const year = date.getFullYear();
      return new Intl.DateTimeFormat(currentAccount.locale).format(date);
    }
  };

  // Sorting logic for movements table
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
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
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

// REFACTORIZATION: UPDATE UI (higher-order function)

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// AUTOMATIC LOGOUT

const startLogOutTimer = function () {
  // Set time to 2 minutes
  let time = 120;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease timer display by one second each second
    time--;
  };

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// EVENT HANDLERS

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

  if (+inputLoginPin.value === currentAccount?.pin) {
    console.log('Correct PIN entered');
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time

    const now = new Date();

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = now.getDate();
    // const month = now.getMonth() + 1;
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = now.getMinutes();

    // labelDate.textContent = `${day.toString().padStart(2, 0)}/${month
    //   .toString()
    //   .padStart(2, 0)}/${year}, ${hour}:${min.toString().padStart(2, 0)}`;
  }

  // Initiate logout timer, clear old timers
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();

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
  const amount = +inputTransferAmount.value;
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

    // Add transfer date to current account and receiving account
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI based on new movements
    updateUI(currentAccount);
  }

  // Reset logout timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

// CLICK EVENT: REQUEST LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan request date to current account
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }

  // Clear input fields
  inputLoanAmount.value = '';

  // Defocus loan amount field
  inputLoanAmount.blur();

  // Reset logout timer
  clearInterval(timer);
  timer = startLogOutTimer();
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
    +inputClosePin.value === currentAccount.pin
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
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
console.log(23 === 23.0);
// Numbers stored in binary (base-2) format. This causes inaccuracies for numbers like 0.1, similar to inaccuracies when writing 1/3 in base-10 notation.

// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px'));
console.log(Number.parseInt('30px', 10));

console.log(Number.parseInt('2.5rem'));
console.log(Number.parseFloat('2.5rem'));

// NaN check
console.log(Number.isNaN(20));
console.log(Number.isNaN(23 / 0));

// isFinite: Best way to check whether a value is a number
console.log(Number.isFinite(20));

// isInteger: Checks for integers only
console.log(Number.isInteger(23.5));

// Math methods

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(25 ** (1 / 3));

console.log(Math.max(1, 2, 3, 4, 4));
console.log(Math.min(1, 2, 3, 4, 5));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6 + 1));

// Random number generator function
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
//  0...1 -> 0...(max - min) -> min...((max - min) + min) = max

// Rounding integers
// console.log(Math.trunc(23.3));

// console.log(Math.round(23.3));
// console.log(Math.round(23.9));

// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// console.log(Math.floor(23.3));
// console.log(Math.floor(23.9));

console.log(Math.trunc(23.3));
console.log(Math.floor(23.3));
console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// Rounding decimals
console.log((2.7).toFixed(3));

// Even or odd?
console.log(5 % 2);
const isEven = n => n % 2 === 0;
console.log(isEven(24));

// Use even concept to color every other row (or to do something every nth time) of balance table
// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//   });
// });

// Numerical separators
const price = 345_99;
console.log(price);

const transferFee = 15_00;
const transferFee2 = 1_500;
// same number

const PI = 3.14_15;

// only for visual distinction in the code; JS will not use the separators

// BigInt
// Every number stored as 64 bits: 53 for the digits, the rest for decimal position and sign
console.log(2 ** 53 - 1);
// or
console.log(Number.MAX_SAFE_INTEGER);
// largest number storable accurately under those constraints

console.log(234876234876234876234876234876234876234876234n);
console.log(BigInt(247893));
// truncated at integer level when dividing using bigint numbers

// Dates
// Create a date
const now1 = new Date();
console.log(now1);
console.log(new Date(account1.movementsDates[0]));
// If a date string was JS-generated, you can enter it as an argument in the Date function

// Matrix notation for dates (with 0-based months!)
console.log(new Date(2037, 10, 19, 15, 23, 5));

// Date(0) is Jan 01, 1970 :D

console.log(new Date() * 24 * 60 * 60 * 1000);
// conversion of days to milliseconds

// Working with Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2342590000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);


const future = new Date(2037, 10, 19, 15, 23);
console.log(future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));

console.log(days1);

// for more precise date calculations, use a date library like moment.js



// Formatting numbers

const num = 3884764.23;

const options1 = {
  style: 'currency',
  unit: 'mile-per-hour',
  currency: 'EUR',
  useGrouping: false,
};

console.log('US:     ', new Intl.NumberFormat('en-US', options1).format(num));
console.log(
  'Germany:     ',
  new Intl.NumberFormat('de-DE', options1).format(num)
);
console.log(
  'Syria:     ',
  new Intl.NumberFormat('ar-SY', options1).format(num)
);
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options1).format(num)
);

*/

// Timers

// setTimeout
// const ingredients = ['olives'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
//   3000,
//   ...ingredients
// );
// console.log('Waiting...');

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 5000);

// Clock-building exercise
// setInterval(function () {
//   const allDate1 = new Date();
//   const hours1 = allDate1.getHours();
//   const minutes1 = allDate1.getMinutes();
//   const seconds1 = allDate1.getSeconds();
//   console.log(`${hours1}:${minutes1}:${seconds1}`);
// }, 1000);
