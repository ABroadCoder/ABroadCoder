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


function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);
    const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} of orange.`;
    return juice;
}

console.log(fruitProcessor(2, 3));


const calcAge = function (birthYear) {
    return 2037 - birthYear;
}

const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;
    //return retirement;
    // return `${firstName} retires in ${retirement} years.`
    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years.`);
        return retirement;
    } else {
        console.log(`${firstName} has already retired.`);
        return -1;
    }
}

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1950, 'Mike'));


//Arrays

const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);

const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);

//Exercise with Arrays

const calcAge = function (birthYear) {
    return 2037 - birthYear;
}
const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);


//Add Elements
const friends = ['Michael', 'Steven', 'Peter'];
const newLength = friends.push('Jay');
console.log(friends);
console.log(newLength);

friends.unshift('John');
console.log(friends);

//Remove Elements
const popped = friends.pop(); //removes last element
friends.pop();
console.log(friends);
console.log(popped);

friends.shift();
console.log(friends);

console.log(friends.indexOf('Steven'));

friends.push(23);
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
console.log(friends.includes(23));

if (friends.includes('Peter')) {
    console.log('You have a friend called Peter.')
} else {
    console.log('You have no friend named Peter.')
}


const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
};

console.log(jonas);

console.log(jonas.lastName);
console.log(jonas['lastName']);

const nameKey = 'Name';
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);

const interestedIn = prompt(`What do you want to know about Jonas? Choose among firstName, lastName, age, job, and friends.`);
console.log(interestedIn);

if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]);
} else {
    console.log('Wrong request! Choose among firstName, lastName, age, job, and friends.')
};

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);

//Challenge
//"Jonas has 3 friends, and his best friend is called Michael"

console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);

//Challenges help to solidify understanding of taught concepts.

*/

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: false,

    // calcAge: function (birthYear) {
    //     return 2037 - birthYear;

    // calcAge: function (birthYear) {
    //     console.log(this);
    //     return 2037 - this.birthYear;
    // }

    calcAge: function (birthYear) {
        this.age = 2037 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year-old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
    }
};

console.log(jonas.age);

//Challenge
// 'Jonas is a 46-year-old teacher, and he has a/no driver's license.'

console.log(jonas.getSummary());

