const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  return fetch(BASE_URL + name)
    .then(response => {
      console.log(response);
      if (response.headers.ok === false) {
        console.log(response.error);
        return Promise.reject(new Error(response.error));
      }
      return response;
    })
    .then(response => response.json());
}

export { BASE_URL, fetchCountries };