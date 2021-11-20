import './css/styles.css';
import { BASE_URL, fetchCountries } from './fetchCountries';
import refs from './refs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

function handleInput(e) {
  let name = e.target.value.trim();

  fetchCountries(`${name}`)
    .then(data => {
      //console.log(data);
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      if (data.length < 10 && data.length > 1) {
        //console.log(data);
        crietMarkupUpToTenElem(data);
      } else {
        //console.log(data);
        criateMarkupOneElem(data);
      }
    })

    .catch(error => Notiflix.Notify.warning('Oops, there is no country with that name'));
}

function crietMarkupUpToTenElem(data) {
  console.log(data);
  const markupUpToTenElem = data.map(
    ({ flags, altSpellings }) =>
      `<li><img src="${flags.svg}"alt="flag"><p>${altSpellings}</p></li>`,
  );
  refs.list.innerHTML = markupUpToTenElem.join('');
}

function criateMarkupOneElem([{ altSpellings, capital, population, languages, flags }]) {
  const markupOneElem = `
  <ul>${altSpellings}
    <li>capital: ${capital}</li>
    <li>population: ${population}</li>
    <li>languages: ${languages}</li>
    <li>
      <img src="${flags.svg}"alt="flag"></li>
  </ul>
  `;

  refs.div.innerHTML = markupOneElem;
}

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
