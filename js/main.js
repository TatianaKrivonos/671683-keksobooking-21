'use strict';
(function () {
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_HEIGHT_ACTIVE = 87;
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const adFormInputTitle = adForm.querySelector(`input[name = title]`);
  const adFormSelectRooms = adForm.querySelector(`select[name = rooms]`);
  const adFormSelectTypes = adForm.querySelector(`select[name = type]`);
  const adFormSelectTimeIn = adForm.querySelector(`select[name = timein]`);
  const adFormSelectTimeOut = adForm.querySelector(`select[name = timeout]`);
  const resetBtn = adForm.querySelector(`.ad-form__reset`);
  const filtersForm = document.querySelector(`.map__filters`);
  const filtersFormSelects = filtersForm.querySelectorAll(`select`);
  const housingTypeSelector = filtersForm.querySelector(`select[name = housing-type]`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  let mainPinX = mainPin.offsetLeft;
  let mainPinY = mainPin.offsetTop;

  const activatePage = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.util.setDisable(adFormFieldsets, false);
    window.util.setDisable(filtersFormSelects, false);
    window.load.getData(onSuccess, onError);
  };

  const unActivatePage = () => {
    map.classList.add(`map--faded`);
    map.querySelector(`.pins__container`).innerHTML = ``;
    adForm.classList.add(`ad-form--disabled`);
    window.util.setDisable(adFormFieldsets, true);
    window.util.setDisable(filtersFormSelects, true);
    adForm.reset();
    window.util.getNewMainPinAddress(mainPinX, mainPinY, MAIN_PIN_HEIGHT);
  };

  window.util.setDisable(adFormFieldsets, true);
  window.util.setDisable(filtersFormSelects, true);
  window.form.renderCapacityList(adFormSelectRooms.value);
  window.form.getPrice(adFormSelectTypes.value);
  window.util.getNewMainPinAddress(mainPinX, mainPinY, MAIN_PIN_HEIGHT);

  mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinX = mainPin.offsetLeft;
      mainPinY = mainPin.offsetTop;

      window.move.getNewLocation(mainPinX - shift.x, mainPinY - shift.y);
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      onMouseMove(upEvt);
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

    if (evt.which === 1) {
      activatePage();
      window.util.getNewMainPinAddress(mainPinX, mainPinY, MAIN_PIN_HEIGHT_ACTIVE);
    }
  });

  mainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
      window.util.getNewMainPinAddress(mainPinX, mainPinY, MAIN_PIN_HEIGHT_ACTIVE);
    }
  });

  adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    window.upload.sendData(new FormData(adForm), onSuccessSend, onErrorSend);
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

  resetBtn.addEventListener(`click`, () => {
    unActivatePage();
  });

  let housingType = `any`;
  let ads = [];

  const updateAds = () => {
    const sameHousingTypes = ads.filter((ad) => {
      return ad.offer.type === housingType;
    });
    const filteredAds = sameHousingTypes.concat(ads);
    const uniqueAds = filteredAds.filter((ad, index) => {
      return filteredAds.indexOf(ad) === index;
    });
    window.render.createAd(uniqueAds);
  };

  housingTypeSelector.addEventListener(`change`, () => {
    const newHousingType = housingTypeSelector.value;
    housingType = newHousingType;
    updateAds();
    const popup = document.querySelector(`.map__card`);
    if (popup) {
      window.util.closePopup(popup);
    }
  });

  const onSuccess = (data) => {
    ads = data;
    updateAds();
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

  const onSuccessSend = () => {
    document.body.insertAdjacentElement(`afterbegin`, successTemplate);
    document.addEventListener(`keydown`, window.util.createEscHandler(document.querySelector(`.success`)));
    unActivatePage();
  };

  const onErrorSend = () => {
    const main = document.querySelector(`main`);
    main.insertAdjacentElement(`afterbegin`, errorTemplate);
    const errorBlock = document.querySelector(`.error`);
    document.addEventListener(`keydown`, window.util.createEscHandler(errorBlock));
    if (errorBlock) {
      errorBlock.addEventListener(`click`, () => {
        errorBlock.remove();
      });
    }
  };

})();
