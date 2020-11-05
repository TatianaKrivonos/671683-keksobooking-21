'use strict';
const adForm = document.querySelector(`.ad-form`);
const adFormSelectCapacity = adForm.querySelector(`select[name = capacity]`);
const adFormInputPrice = adForm.querySelector(`input[name = price]`);
const fragment = document.createDocumentFragment();

const capacityMap = {
  100: [`не для гостей`],
  1: [`для 1 гостя`],
  2: [`для 1 гостя`, `для 2 гостей`],
  3: [`для 1 гостя`, `для 2 гостей`, `для 3 гостей`],
};

const valueMap = {
  "не для гостей": 0,
  "для 1 гостя": 1,
  "для 2 гостей": 2,
  "для 3 гостей": 3
};

const priceMap = {
  "bungalow": 0,
  "flat": 1000,
  "house": 5000,
  "palace": 10000
};

const createOption = (text) => {
  const option = document.createElement(`option`);
  option.textContent = text;
  option.value = valueMap[text];
  return option;
};

const renderCapacityList = (roomsNum) => {
  adFormSelectCapacity.innerHTML = ``;
  capacityMap[roomsNum].forEach((el) => {
    fragment.appendChild(createOption(el));
  });
  adFormSelectCapacity.appendChild(fragment);
};

const getPrice = (type) => {
  adFormInputPrice.min = priceMap[type];
  adFormInputPrice.max = 1000000;
  adFormInputPrice.placeholder = priceMap[type];
};

const synchronizeSelects = (select, val) => {
  select.selectedIndex = [...select].findIndex((el) => el.value === val);
};

const validateTextInput = (input, minLength, maxLength) => {
  const valueLength = input.value.length;
  if (valueLength < minLength) {
    input.setCustomValidity(`Ещё ` + (minLength - valueLength) + ` символов`);
  } else if (valueLength > maxLength) {
    input.setCustomValidity(`Удалите лишние ` + (valueLength - maxLength) + ` символов`);
  } else {
    input.setCustomValidity(``);
  }
  input.reportValidity();
};

window.form = {
  renderCapacityList,
  getPrice,
  synchronizeSelects,
  validateTextInput,
};
