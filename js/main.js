'use strict';
(function () {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_HEIGHT_ACTIVE = 87;
  const MAX_SIMILAR_AD_COUNT = 8;

  const fragment = document.createDocumentFragment();
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const similarAdElement = map.querySelector(`.map__pins`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const adFormInputAddress = adForm.querySelector(`input[name = address]`);
  const adFormInputTitle = adForm.querySelector(`input[name = title]`);
  const adFormSelectRooms = adForm.querySelector(`select[name = rooms]`);
  const adFormSelectTypes = adForm.querySelector(`select[name = type]`);
  const adFormSelectTimeIn = adForm.querySelector(`select[name = timein]`);
  const adFormSelectTimeOut = adForm.querySelector(`select[name = timeout]`);
  const filtersForm = document.querySelector(`.map__filters`);
  const filtersFormSelects = filtersForm.querySelectorAll(`select`);
  const mainPinX = +mainPin.style.left.replace(`px`, ``);
  const mainPinY = +mainPin.style.top.replace(`px`, ``);

  const getNewMainPinAddress = () => {
    adFormInputAddress.value = `${mainPinX + Math.floor(MAIN_PIN_WIDTH / 2)}, ${mainPinY + MAIN_PIN_HEIGHT_ACTIVE}`;
  };

  const activatePage = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.util.setDisable(adFormFieldsets, false);
    window.util.setDisable(filtersFormSelects, false);
    window.load.getData(onSuccess, onError);
  };

  window.util.setDisable(adFormFieldsets, true);
  window.util.setDisable(filtersFormSelects, true);
  window.form.renderCapacityList(adFormSelectRooms.value);
  window.form.getPrice(adFormSelectTypes.value);

  adFormInputAddress.value = `${mainPinX + Math.floor(MAIN_PIN_WIDTH / 2)}, ${mainPinY + Math.floor(MAIN_PIN_HEIGHT / 2)}`;

  mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      activatePage();
      getNewMainPinAddress();
    }
  });

  mainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
      getNewMainPinAddress();
    }
  });

  adFormSelectRooms.addEventListener(`change`, (evt) => {
    const options = evt.target.options;
    const selectedValue = options[options.selectedIndex].value;
    window.form.renderCapacityList(selectedValue);
  });

  adFormSelectTypes.addEventListener(`change`, (evt) => {
    const options = evt.target.options;
    const selectedValue = options[options.selectedIndex].value;
    window.form.getPrice(selectedValue);
  });

  adFormInputTitle.addEventListener(`input`, () => {
    window.form.validateTextInput(adFormInputTitle, 30, 100);
  });

  adFormSelectTimeIn.addEventListener(`change`, (evt) => {
    const options = evt.target.options;
    const selectedValue = options[options.selectedIndex].value;
    window.form.synchronizeSelects(adFormSelectTimeOut, selectedValue);
  });

  adFormSelectTimeOut.addEventListener(`change`, (evt) => {
    const options = evt.target.options;
    const selectedValue = options[options.selectedIndex].value;
    window.form.synchronizeSelects(adFormSelectTimeIn, selectedValue);
  });

  const onSuccess = (ads) => {

    for (let i = 0; i < MAX_SIMILAR_AD_COUNT; i++) {
      const pin = window.pin.renderAd(ads[i]);
      const popup = window.card.renderAdPopup(ads[i]);
      const closeCard = popup.querySelector(`.popup__close`);
      fragment.appendChild(pin);
      pin.addEventListener(`click`, () => {
        window.card.openPopup(popup);
      });

      pin.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          window.card.openPopup(popup);
        }
      });

      closeCard.addEventListener(`click`, () => {
        window.card.closePopup(popup);
      });
    }

    similarAdElement.appendChild(fragment);
  };

  const onError = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; padding: 15px 0; width: 100%; text-align: center; color: #FFFFFF; background-color: rgb(255, 36, 0);`;
    node.style.position = `fixed`;
    node.style.left = 0;
    node.style.top = 0;
    node.style.fontSize = `28px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

})();
