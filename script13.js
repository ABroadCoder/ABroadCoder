'use strict';

// HTML references
const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////
// Button Scrolling

buttonScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////
// Page Navigation

// "Many functions created, each used once" method (potentially bad for performance)
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// "One function created, used many times" method (evidently more performant); a.k.a. event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component (Section 2: Operations)

// Add handlers to buttons
document;
tabsContainer.addEventListener('click', function (e) {
  // Define clicked tab HTML element reference
  const clickedTab = e.target.closest('.operations__tab');

  // Guard clause: end execution early if case of null result on click
  if (!clickedTab) return;

  // Log tabs clicked to console
  // console.log(`TAB ${clickedTab.dataset.tab} CLICKED`);

  // Activate clicked tab (and only clicked tab)
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // remove from all...
  clickedTab.classList.add('operations__tab--active'); // then add to the one you want to activate :)

  // Activate clicked tab's content area (and only clicked tab's content area)
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

// Passing an "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

// LECTURES
/*
// To reference entire webpage...
console.log(document.documentElement);
// To reference main parts...
console.log(document.head);
console.log(document.body);
// To reference sections by tag...
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and Inserting Elements
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class ="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Deleting Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// CSS Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// Logging to console only works for in-line styles with this syntax:
console.log(message.style.height);
console.log(message.style.width);

// Instead, use getComputedStyle():
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'limegreen');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.alt);
console.log(logo.className);

// Set attribute
logo.alt = 'Beautiful minimalist logo';

// Nonstandard, added properties can't be referenced this way:
console.log(logo.designer);
// So, do it this way:
console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Bankist');

// Absolute URL
console.log(logo.src);
// URL as listed in CSS attributes (relative)
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use; overrides all existing classes
// logo.className = 'jonas'

const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

buttonScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');

// Events: More Syntax

// Preferred
const alertH1 = function (e) {
  console.log('Mouse event logged');
  alert('Great! You are reading the heading :D');

  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// Alternate
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000);

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('LINK', e.target, e.currentTarget);
  }
  // true
);


const h1 = document.querySelector('h1');

// Going downward in the DOM: children

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children); // only for direct children
h1.firstElementChild.color = 'white'; // set property of an element using an element-relative reference
h1.lastElementChild.color = 'orangered'; // ""

// Going upward: parents
console.log(h1.parentNode);
console.log(h1.parentElement); // direct parent

h1.closest('.header').style.background = 'var(--gradient-secondary)'; // the analog of .querySelector for searches of parents (.querySelector searches for the nearest child, while .closest searches for the nearest parent)

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // to access all siblings of a single element, move up to the parent and select all of its children
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
