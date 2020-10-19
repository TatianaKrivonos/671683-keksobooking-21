'use strict';
(function () {
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

  window.util = {
    setDisable,
    getNewMainPinAddress
  };
})();
