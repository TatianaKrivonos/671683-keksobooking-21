'use strict';
(function () {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_HEIGHT_ACTIVE = 87;

  const fragment = document.createDocumentFragment();
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const similarAdElement = map.querySelector(`.map__pins`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const adFormInputAddress = adForm.querySelector(`input[name = address]`);
  const adFormSelectRooms = adForm.querySelector(`select[name = rooms]`);
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
    window.util.setDisableFalse(adFormFieldsets);
    window.util.setDisableFalse(filtersFormSelects);
  };

  window.util.setDisableTrue(adFormFieldsets);
  window.util.setDisableTrue(filtersFormSelects);
  window.form.renderCapacityList(adFormSelectRooms.value);

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

  const similarAds = window.data.createAds(8);

  similarAds.forEach((ad) => fragment.appendChild(window.pin.renderAd(ad)));
  similarAdElement.appendChild(fragment);

  fragment.appendChild(window.card.renderAdPopup(similarAds[0]));
  map.insertBefore(fragment, mapFiltersContainer);
})();
