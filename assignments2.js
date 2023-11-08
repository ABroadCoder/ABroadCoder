"use strict";

/*

//Functions
//1. 
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

//2.
const descSaudi = describeCountry("Saudi Arabia", 54, 'Riyadh');
const descIceland = describeCountry("Iceland", 13, 'Reykjavik');
const descRussia = describeCountry("Russia", 126, "Москва");

console.log(descSaudi, descIceland, descRussia);

//Function Declarations vs. Expressions
//1.
function percentageOfWorld1(population) {
    return 100 * population / 7900;
}

//2. (done above)
//3.
const percChina = percentageOfWorld1(1441);
const percUS = percentageOfWorld1(330);
const percFrance = percentageOfWorld1(65);

console.log(percChina, percUS, percFrance);

// declaring functions allows for each case to receive its own variable name

//4.
const percentageOfWorld2 = function (population) {
    return 100 * population / 7900;
}

console.log(percentageOfWorld2(1441), percentageOfWorld2(330), percentageOfWorld2(65));

// function expression allows for all cases to be referenced under a single variable name

// Arrow functions
//1.
const percentageOfWorld3 = population => 100 * population / 7900;

const percChina3 = percentageOfWorld3(1441);
const percUS3 = percentageOfWorld3(330);
const percFrance3 = percentageOfWorld3(65);

console.log(percChina3, percFrance3, percUS3);



//Functions Calling Other Functions
//1.
function describePopulation(country, population) {
    return `${country} has ${population} million people, which is about ${percentageOfWorld1(population)} percent of the world.`
}
const newChina = describePopulation('China', 1430);
const newUS = describePopulation('USA', 330);
const newFrance = describePopulation('France', 65);

console.log(newChina, newUS, newFrance);

//Introduction to Arrays
//1.
const populations = [1440, 330, 160, 65];
//2.
console.log(populations.length === 4);
//3.
const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[populations.length - 1])];
console.log(percentages);

//Basic Array Operations (Methods)
//1.
const neighbors = ['Mexico', 'Canada', 'Russia'];
console.log(neighbors);

//2. 
neighbors.push('Utopia');
console.log(neighbors);

//3.
neighbors.pop();
console.log(neighbors);

//4.
if (neighbors.includes('Germany') === false) {
    console.log('Probably not a Central European country :D')
};
console.log(neighbors);

//5.
neighbors[2] = 'Russian Federation';
console.log(neighbors);

//6.
neighbors.shift();
console.log(neighbors);

//7.
neighbors.unshift('Mexico');
console.log(neighbors);

//Introduction to Objects
// 1.
const myCountry = {
    country: 'The United States of America',
    capital: 'Washington, DC',
    language: 'English',
    population: 330,
    neighbors: ['Canada', 'Mexico']
};

// Dot vs. Bracket Notation
// 1. 
console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbors.length} neighboring countries, and a capital called ${myCountry.capital}.`);

// 2.
myCountry.population += 2;
console.log(myCountry.population);
myCountry['population'] -= 2;
console.log(myCountry.population);

// Object Methods
// 1. , 3.

const myCountry = {
    country: 'The United States of America',
    capital: 'Washington, DC',
    language: 'English',
    population: 330,
    neighbors: ['Canada', 'Mexico'],
    describe: function () {
        console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbors.length} neighboring countries, and a capital called ${this.capital}.`);
    },
    checkIsland: function () {
        this.isIsland = this.neighbors.length === 0 ? true : false;
    }
};

// 2.

console.log(myCountry.describe());

// Iteration: The for Loop
// 1.
for (let voterNumber = 1; voterNumber <= 50; voterNumber++) {
    console.log(`Voter number ${voterNumber} is currently voting.`)
};

*/

// Looping Arrays, Breaking and Continuing
// 1.
const populations = [1440, 330, 160, 65];
// 2.
function percentageOfWorld1(population) {
    return 100 * population / 7900;
}

const percentages2 = [];

for (let i = 0; i < populations.length; i++) {
    percentages2.push(percentageOfWorld1(populations[i]));
};
// 3.
console.log(percentages2);


