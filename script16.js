'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Function definitions

const renderCountry = function (data, className = '') {
  console.log(data);
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
  // countriesContainer.style.opacity = 1;
};

countriesContainer.addEventListener('click', function () {
  countriesContainer.style.display = 'none';
});

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);
    if (!response.ok) {
      alert(
        'Country name not recognized. Please enter the English name of a country.'
      );
      throw new Error(`${errorMsg} (${response.status})})`);
    }
    return response.json();
  });
};

/*
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

// const getCountryData = function (country) {
//   // Country 1 fetch request
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(
//           `Country "${country}" not found (${response.status})})`
//         );
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];

//       // Guard clause
//       if (!neighbor) return;

//       // Country 2 fetch request
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(
//           `Country "${country}" not found (${response.status})})`
//         );
//       response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbor'))
//     .catch(err => {
//       console.error(`${err} 🙉 🙉 🙉`);
//       renderError(`Something went wrong 🙉 🙉 🙉 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  let neighbor;

  // Country 1 fetch request
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    `Country "${country}" not found. Please enter the English name of a country.`
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      console.log(data);

      // Country 2 fetch request
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        `(Neighbor country not found)`
      );
    })
    .then(data => renderCountry(data[0], 'neighbor'))
    .catch(err => {
      console.error(`${err} 🙉 🙉 🙉`);
      if (!neighbor) {
        // alert('This country has no neighbors! (2)');
      } else {
        renderError(`Something went wrong 🙉 🙉 🙉 ${err.message}. Try again!`);
      }
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  const countryInput = prompt('Enter the name of a country (in English):');
  if (countryInput !== null && countryInput.trim() !== '') {
    getCountryData(`${countryInput}`);
  } else if (countryInput === '') {
    alert('Please enter a country name');
  }
});
*/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  const {} = await getPosition();

  const { latitude: lat, longitude: lng } = pos.coords;

  return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};

whereAmI('portugal');
console.log('FIRST');
