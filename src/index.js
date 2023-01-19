import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

function cleanHtml() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}

inputEl.addEventListener(
  'input',
  debounce(e => {
    const trimmedValue = inputEl.value.trim();
    cleanHtml();
    if (trimmedValue !== '') {
      fetchCountries(trimmedValue).then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          renderCountryList(data);
        } else if (data.length === 1) {
          renderOneCountry(data);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</b>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryListEl.innerHTML = markup;
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</b>
                </li>`;
    })
    .join('');
  countryListEl.innerHTML = markup;
}
