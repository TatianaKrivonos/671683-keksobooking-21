'use strict';
const MAIN_PIN_WIDTH = 65;

const adFormInputAddress = window.global.adForm.querySelector(`input[name = address]`);

const isEnter = (evt) => evt.key === `Enter`;

const setDisable = (arr, boolean) => {
  arr.forEach((el) => {
    el.disabled = boolean;
  });
};

const getNewMainPinAddress = (x, y, height) => {
  adFormInputAddress.value = `${x + Math.floor(MAIN_PIN_WIDTH / 2)}, ${y + height}`;
};

window.util = {
  isEnter,
  setDisable,
  getNewMainPinAddress,
};
