import './css/styles.css';
import { BASE_URL, fetchCountries } from './fetchCountries';
import { creatingMarkup, creatMarkupUpToTenElem, creatMarkupOneElem } from './creatingMarkup';
import refs from './refs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

function handleInput(e) {
  let name = e.target.value.trim();

  fetchCountries(`${name}`)
  .then(creatingMarkup)
  .catch(Notiflix.Notify.warning('Oops, there is no country with that name'));
}

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
