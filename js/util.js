'use strict';
const MAIN_PIN_WIDTH = 65;

const adForm = document.querySelector(`.ad-form`);
const adFormInputAddress = adForm.querySelector(`input[name = address]`);

const setDisable = (arr, boolean) => {
  arr.forEach((el) => {
    el.disabled = boolean;
  });
};

const getNewMainPinAddress = (x, y, height) => {
  adFormInputAddress.value = `${x + Math.floor(MAIN_PIN_WIDTH / 2)}, ${y + height}`;
};

const createEscHandler = (popup) => {
  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup(popup);
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };
  return onPopupEscPress;
};

const closePopup = (popup) => {
  popup.remove();
};

window.util = {
  setDisable,
  getNewMainPinAddress,
  closePopup,
  createEscHandler
};
