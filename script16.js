'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Function definitions

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}" >
                <img class="country__img" src="${data.flags.png}" />
                <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} M people</p>
                <p class="country__row"><span>🗣️</span>${
                  Object.values(data.languages)[0]
                }</p>
                <p class="country__row"><span>💰</span>${
                  Object.values(data.currencies)[0].name
                }</p>
                </div>
            </article>
        `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbor = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbor country (2)
//     const neighbor = data.borders?.[0];

//     if (!neighbor) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       console.log(data);

//       // Render country 2
//       renderCountry(data, 'neighbor');
//     });
//   });
// };

// // Function executions

// // getCountryAndNeighbor('portugal');
// getCountryAndNeighbor('usa');

// Promises: Escape "callback hell" by chaining--not nesting--promises

const getCountryData = function (country) {
  // Country 1 fetch request
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];

      // Guard clause
      if (!neighbor) return;

      // Country 2 fetch request
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbor'));
};

getCountryData('portugal');
