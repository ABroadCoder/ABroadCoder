"use strict";

let hasDriversLicense = false;
const passTest = true;

/*

// if/else format for taking decision

if (passTest) hasDriversLicense = true;

if (hasDriversLicense = true) {
    console.log(`Now that you've passed the test, here is your driver's license.`)
} else {
    console.log(`Since you haven't yet passed the test, you can't have had a driver's license.`)
};

// switch format for taking decision

hasDriversLicense = !!true;

switch (hasDriversLicense) {
    case true:
        console.log("True case works.");
        break;
    default:
        console.log("False case works.");
        break;
};

//Ternary/conditional operator format for taking decision

hasDriversLicense = true;

const message = hasDriversLicense === true ? "Ternary true case works." : "Ternary false case works.";
console.log(message);

//Write code which will output an appropriate message about whether you will receive a driver's license, based on whether the test has been passed. Use if/else, switch, and ternary formats of taking decisions.

//if/else format
if (passTest === true) {
    console.log("You will receive a driver's license.")
} else {
    console.log("No driver's license for you.")
};

//ternary format
const getLicense = passTest === true ? "You will receive a driver's license." : "No driver's license for you.";
console.log(getLicense);

//switch format
switch (passTest) {
    case true:
        console.log("You will receive a driver's license.");
        break;
    default:
        console.log("No driver's license for you.");
        break;
};

if (passTest === true && hasDriversLicense === false) {
    console.log("You will be issued a driver's license.")
} else if (passTest === true && hasDriversLicense === true) {
    console.log("You already have a license, so why did you take the test?")
} else if (passTest === false && hasDriversLicense === false) {
    console.log("Sorry; you have to pass the test before you can get a license.")
} else {
    console.log("Hmmm...you didn't pass the test, so how do you have a license?!")
}

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive.");

function logger() {
    console.log("My name is Jonas.");
}

//calling, running, or invoking the function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

console.log(fruitProcessor(5, 0));

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

//function declaration

function calcAge1(birthYear) {
    return 2037 - birthYear;
}
const age1 = calcAge1(1991);
console.log(age1);

//function expression

const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}
const age2 = calcAge2(1991);

console.log(age1, age2);

*/

//Arrow function
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    //return retirement;
    return `${firstName} retires in ${retirement} years.`
}

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1980, "Bob"));
