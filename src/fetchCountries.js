const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  return fetch(BASE_URL + name)
    .then(response => {
      if (response.ok === false) {
        return Promise.reject(new Error(response.statusText));
      }
      return response.json();
    })
}

export { BASE_URL, fetchCountries };