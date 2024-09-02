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
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
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
    '2020-07-26T12:01:20.894Z',
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

// INTERMEDIATE FUNCTIONS

// Generation of movements table
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = 0

  // Sorting logic for movements table
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${day}/${month}/${year}</div>
          <div class="movements__value">${mov.toFixed(2)}€</div>
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
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
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

// EVENT HANDLERS

let currentAccount;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Desired date display format: day/month/year
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

    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    const min = now.getMinutes();

    labelDate.textContent = `${day.toString().padStart(2, 0)}/${month
      .toString()
      .padStart(2, 0)}/${year}, ${hour}:${min.toString().padStart(2, 0)}`;
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
});

// REQUEST LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add loan request date to current account
    currentAccount.movementsDates.push(new Date().toISOString());

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
