import './css/styles.css';
import { BASE_URL, fetchCountries } from './fetchCountries';
import refs from './refs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const WIDTH = 70;
const HEiGHT = 44;

function handleInput(e) {
  let name = e.target.value.trim();

  fetchCountries(`${name}`)
  .then(creatingMarkup)
  .catch(Notiflix.Notify.warning('Oops, there is no country with that name'));
}

function creatingMarkup(data) {
  switch (true) {
    case data.length < 10 && data.length > 1:
      refs.div.innerHTML = '';
      creatMarkupUpToTenElem(data);
      break;

    case data.length === 1:
      refs.list.innerHTML = '';
      creatMarkupOneElem(data);
      break;

    default:
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      refs.list.innerHTML = '';
  }
}

function creatMarkupUpToTenElem(data) {
  const markupUpToTenElem = data.map(
    ({ flags, altSpellings }) =>
      `<li><img src="${flags.png}"alt="flag"width="${WIDTH}px"height="${HEiGHT}px"><p>${altSpellings}</p></li>`,
  );
  refs.list.innerHTML = markupUpToTenElem.join('');
}

function creatMarkupOneElem([{ altSpellings, capital, population, languages, flags }]) {
  const markupOneElem = `
  <ul>
    <li>
      <img src="${flags.png}">
    </li>
    <li>${altSpellings}</li>
    <li>capital: ${capital}</li>
    <li>population: ${population}</li>
    <li>languages: ${Object.values(languages).join('')}</li>
  </ul>
  `;

  refs.div.innerHTML = markupOneElem;
}

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
