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
  countriesContainer.style.opacity = 1;
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


const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    //Geolocation
    const pos = await getPosition();

    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    //Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.countryCode}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.countryCode}`;
  } catch (err) {
    console.error(`${err} 🙅‍♂️`);
    renderError(`💔 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

// console.log('1. Will get location');
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(`2: ${err.message} 😥`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmI();
  } catch (err) {
    err => alert(`${err.message}`);
  }
})();


const getThreeCountries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);
    const data = await Promise.all(
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`)
    );
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};
getThreeCountries('portugal', 'canada', 'tanzania');
*/

//Promise.race: the first settled promise (rejected or resolved) "wins the race"
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
});

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(0.1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled: returns an array of all settled promises
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
]).then(res => console.log(res));

// Promise.all: to resolve, requires all promises to be resolved
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
]).then(res => console.log(res));

// Promise.any: to resolve, requires just one promise to be resolved (returns first resolved promise)
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
]).then(res => console.log(res));
