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

*/

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
