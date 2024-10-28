'use strict';
// Constructor function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Don't create methods within constructor functions!
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New empty object created {}
// 2. Function is called, this = {}
// 3. {} linked to prototype
// 4. Function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// Check instantiation
console.log(jonas instanceof Person);

// Prototypes
console.log(Person.prototype);
// Person.prototype is what's going to be used as the prototype of the children/instances, not "the prototype of Person"
// To test this, we can create a Boolean statement of strict equality comparing Person.prototype to jonas.__proto__ (the prototype of Jonas):
console.log(Person.prototype === jonas.__proto__);
// We can also check that this way:
console.log(Person.prototype.isPrototypeOf(jonas));

// We can assign things to prototypes just as we would to other objects, thus adding to them:
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
// Methods included in the prototype object are accessible in the instances:
jonas.calcAge();
matilda.calcAge();

Person.prototype.species = 'Homo sapiens';
console.log(jonas.species, matilda.species);
// Can check whether a property originated in an object itself or was inherited
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

const arr = [3, 4, 5, 6, 7, 7, 8, 8]; // equivalent to writing using "new Array"
console.log(arr.__proto__);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  [...new Set(this)];
};

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} accelerated to ${this.speed} km/h`);
};

// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} braked down to ${this.speed} km/h`);
};
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.brake();
bmw.brake();

mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
mercedes.brake();
mercedes.brake();
mercedes.brake();
