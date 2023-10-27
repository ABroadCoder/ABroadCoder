let js = 'amazing';
console.log(40 + 8 + 23 - 10);

console.log("Jonas");
console.log(23);

/*
let javascriptIsFun = true;
console.log(javascriptIsFun);

//console.log(typeof true);

//console.log(typeof true);
console.log(typeof javascriptIsFun);
//console.log(typeof 23);

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(null);
console.log(typeof null);
*/



// console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 

/*
const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

let x = 10 + 5;
console.log(x);
x += 10; // x = x + 10
console.log(x);
x *= 4; //x = x * 4
console.log(x);
x /= 4; //x = x / 4
console.log(x);
x++; //x = x + 1
console.log(x);
x--; //x = x - 1
console.log(x);

// Comparison operators
console.log(ageJonas > ageSarah); // >, <, <=, >=
console.log(ageSarah <= 19);
console.log(ageSarah);

const isFullAge = ageSarah >= 18;
*/

const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

//operator precedence

/*
let x, y;
x = y = 25 - 10 - 5; // x = y = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);


const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + "-year old " + job + "."
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${year - birthYear}-year old ${job}.`;
console.log(jonasNew);

console.log(`Just a regular string...`)

console.log(`String
with
multiple
lines`);

const age = 15;

if (age >= 18) {
    console.log('Sarah can start driving license. 🚗')
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah needs to wait another ${yearsLeft} years. 😌`);
}

const birthYear = 1991;
let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);


// Type Conversion
const inputYear = '1991';
console.log(Number(inputYear));
console.log(inputYear + 18);
console.log(Number(inputYear) + 18);

console.log(Number('Jonas'));
console.log(typeof NaN);

console.log(String(23), 23);

// Type Coercion
console.log('I am ' + 23 + ' years old.');
console.log('23' - '10' - 3);
console.log('23' + '10' + 3);
console.log('23' * '2');
console.log('23' / '2');

let n = '1' + '1'; // '11'
n = n - 1; // 11 - 1
console.log(n); // 10


//Falsy values (5 total): 0 , ' ', undefined, null, Nan

//Truthy values (everything else)

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('abcd'));
console.log(Boolean({}));
console.log(Boolean(''));

//Type coercion to Booleans: if/else statements

const money = 0;
if (money) {
    console.log("Don't spend it all 😆.")
} else {
    console.log('You should get a job.')
};

let height;
if (height) {
    console.log("Yay! Height is defined.")
} else {
    console.log('Height is UNDEFINED.')
};

console.log(height);

const age = 18;
if (age === 18) console.log(`You just became an adult.`);

//strict equality operator: === (no type coercion)
//loose equality operator: == (performs type coercion--lots of potential bugs when used)

if (age == 18) console.log(`You just became an adult.`);

const favorite = Number(prompt("What's your favorite number?"));
console.log(favorite);
console.log(typeof favorite);

if (favorite === 23) {
    console.log('Cool! 23 is an amazing number!')
} else if (favorite === 7) {
    console.log('7 is also a cool number!')
} else if (favorite === 9) {
    console.log("9 is also a cool number!")
}
else {
    console.log('Number is neither 23 nor 7 nor 9.')
};

if (favorite !== 23) console.log("Why not 23?");


const hasDriversLicense = false; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);


if (hasDriversLicense && hasGoodVision;) {
    console.log("Sarah is able to drive.")
} else {
    console.log("Someone else should drive.")
};

*/

const day = "Monday";

switch (day) {
    case "Monday": //day === "Monday"
        console.log("Plan course structure");
        console.log("Go to coding meetup");
        break;
    case "Tuesday":
        console.log("Prepare theory videos");
        break;
    case "Wednesday":
    case "Thursday":
        console.log("Write code examples");
        break;
    case "Friday":
        console.log("Record videos");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Enjoy the weekend ☺️");
        break;
    default:
        console.log("Not a valid day");
}

if (day === "Monday") {
    console.log("Plan course structure");
    console.log("Go to coding meetup");
} else if (day === "Tuesday") {
    console.log("Prepare theory videos");
} else if (day === "Wednesday" || day === "Thursday") {
    console.log("Write code examples");
} else if (day === "Friday") {
    console.log("Record videos");
} else if (day === "Saturday" || day === "Sunday") {
    console.log("Enjoy the weekend ☺️");
} else {
    console.log("Not a valid day");
};


