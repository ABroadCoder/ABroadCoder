const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

//Important API Information
// API URL: https://forkify-api.jonas.io/
// API Key: a8fcce8a-6270-4510-8ce9-6ec0302a95e5

///////////////////////////////////////

fetch(
  'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886?key=a8fcce8a-6270-4510-8ce9-6ec0302a95e5'
);
