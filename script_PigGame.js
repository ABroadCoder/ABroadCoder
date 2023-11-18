'use strict';

// Selecting elements and defining global variables
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;

// Rolling dice functionality
buttonRoll.addEventListener('click', function() {
    // 1. Generate a random die roll
    const dice = Math.trunc(Math.random() * 6) +1;
    console.log(dice);

    // 2. Display the die
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if(dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        current0El.textContent = currentScore; // CHANGE LATER
    } else {
        // Switch to other player
    }
});   
