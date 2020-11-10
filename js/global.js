'use strict';
const map = document.querySelector(`.map`);
const filtersForm = document.querySelector(`.map__filters`);
const similarAdElement = map.querySelector(`.map__pins`);
const adForm = document.querySelector(`.ad-form`);

window.global = {
  map,
  filtersForm,
  similarAdElement,
  adForm
};

