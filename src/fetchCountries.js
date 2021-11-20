const URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  return fetch(URL + name)
    .then(response => {
      if (response.error) {
        console.log(response.error);
        return Promise.reject(new Error(response.error));
      }
      return response;
    })
    .then(response => response.json());
}
export { URL, fetchCountries };