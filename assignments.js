

const country = "The United States of America";
const continent = "North America";
let population = 330;
const language = "English";
const isIsland = false;

console.log(country);
console.log(continent);
console.log(population);
/*
//Datatypes Lecture
//1.
const isIsland = false;
const language = 'English';
//2.
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

let age = 30;
age = 31;

// const birthYear = 1991;
// birthYear = 1990;

//Basic Operators
// 1.
const halfCountryPopulation = population / 2;
console.log(halfCountryPopulation);

// 2.
population++;
console.log(population);

// 3.
const finlandPopulation = 6;
console.log(population > finlandPopulation);

// 4. 
const averagePopulation = 33;
console.log(population < averagePopulation);

// 5. 
let description = country + " is in " + continent + ", and its " + population + " people speak " + language;
console.log(description);

// Strings and Template Literals
// 1. 
description = `${country} is in ${continent}, and its ${population} people speak ${language}.`
console.log(description);


// Taking Decisions: if/else Statements
//1. 
if (population > 33) {
    console.log(`${country}'s population is above average. 📈`)
}
else {
    console.log(`${country}'s population is ${(33 - population)} million below average.`)
};

//2.
// done above through changing variable value and observing results

//Type Conversion and Coercion
//1.
// 4
// 617
// 23
// false
// 117

// 2.
console.log('9' - '5');
console.log('19' - '13' + '17');
console.log('19' - '13' + 17);
console.log('123' < 57);
console.log(5 + 6 + '4' + 9 - 4 - 2);


//Equality Operators: == vs. ===

//1.
const numNeighbours = Number(prompt('How many neighbor countries does your country have?'));

//2. - 5.
if (numNeighbours === 1) {
    console.log('Only 1 border!')
} else if (numNeighbours > 1) {
    console.log('More than 1 border')
} else {
    console.log('No borders')
};


// Logical Operators
//1.-3.
if (language === "English" && population < 50 && isIsland === false) {
    console.log(`You should live in ${country} 😎.`)
} else {
    console.log(`${country} does not meet your criteria 🥲.`)
};

*/

//The switch Statement
//1.
switch (language) {
    case "Chinese" || "Mandarin":
        console.log("MOST number of native speakers!");
        break;
    case "Spanish":
        console.log("2nd place in number of native speakers");
        break;
    case "English":
        console.log("3rd place");
        break;
    case "Hindi":
        console.log("Number 4");
        break;
    case "Arabic":
        console.log("5th most spoken language");
        break;
    default:
        console.log("Great language too :D");
        break;
}

//Assignment not present for theoretical lectures

