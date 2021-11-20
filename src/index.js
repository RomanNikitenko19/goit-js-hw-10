import './css/styles.css';
import { URL, fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import refs from './refs';

const DEBOUNCE_DELAY = 300;

function handleInput(e) {
  let name = e.target.value.trim();

  fetchCountries(`${name}`)
    .then(data => {
      //console.log(data);
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return
      }
      if (data.length < 10 && data.length > 1) {
        //console.log(data);
        return crietMarkupUpToTenElem(data);
      } else {
        console.log(data);
        return criateMarkupOneElem(data);
      }
    })
    .catch(error => console.log(error)); //Notiflix.Notify.warning('Oops, there is no country with that name'));
}

function crietMarkupUpToTenElem(data) {
  //console.log(data);
  const markupUpToTenElem = data.map(
    elem => `<li><img src="${elem.flags.svg}"alt="flag"><p>${elem.altSpellings}</p></li>`,
  );
  refs.list.innerHTML = markupUpToTenElem.join('');
};

function criateMarkupOneElem(data) {
  //console.log(data);
  const markupOneElem = `
  <ul>${data.altSpellings}
    <li>capital: ${data.capital}</li>
    <li>population: ${data.population}</li>
    <li>languages: ${data.languages}</li>
    <li>
      <img src="${data.flags.svg}"alt="flag"></li>
  </ul>
  `;

  refs.div.innerHTML = markupOneElem;
}

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));