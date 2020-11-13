'use strict';
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_HEIGHT_ACTIVE = 80;
const MAIN_PIN_START_COORDINATE_X = 570;
const MAIN_PIN_START_COORDINATE_Y = 375;
const mainPin = window.global.map.querySelector(`.map__pin--main`);
const adFormFieldsets = window.global.adForm.querySelectorAll(`fieldset`);
const adFormInputTitle = window.global.adForm.querySelector(`input[name = title]`);
const adFormSelectRooms = window.global.adForm.querySelector(`select[name = rooms]`);
const adFormSelectTypes = window.global.adForm.querySelector(`select[name = type]`);
const adFormSelectTimeIn = window.global.adForm.querySelector(`select[name = timein]`);
const adFormSelectTimeOut = window.global.adForm.querySelector(`select[name = timeout]`);
const resetBtn = window.global.adForm.querySelector(`.ad-form__reset`);
const filtersFormSelects = window.global.filtersForm.querySelectorAll(`select`);
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const avatarPreview = window.global.adForm.querySelector(`.ad-form-header__preview img`);
const housePhotoPreview = window.global.adForm.querySelector(`.ad-form__photo img`);
const priceMap = {
  "any": (price) => price > 0,
  "middle": (price) => (price >= 10000 && price < 50000),
  "low": (price) => price < 10000,
  "high": (price) => price > 50000
};
const roomsMap = {
  "any": (rooms) => rooms >= 0,
  "1": (rooms) => rooms === 1,
  "2": (rooms) => rooms === 2,
  "3": (rooms) => rooms === 3
};
const guestsMap = {
  "any": (guests) => guests >= 0,
  "1": (guests) => guests === 1,
  "2": (guests) => guests === 2,
  "0": (guests) => guests === 0
};
let mainPinX = mainPin.offsetLeft;
let mainPinY = mainPin.offsetTop;

const activatePage = () => {
  window.global.map.classList.remove(`map--faded`);
  window.global.adForm.classList.remove(`ad-form--disabled`);
  window.util.setDisable(adFormFieldsets, false);
  window.util.setDisable(filtersFormSelects, false);
  window.load.getData(onSuccess, onError);
};

const unActivatePage = () => {
  window.global.map.classList.add(`map--faded`);
  window.global.map.querySelector(`.pins__container`).innerHTML = ``;
  window.global.adForm.classList.add(`ad-form--disabled`);
  window.util.setDisable(adFormFieldsets, true);
  window.util.setDisable(filtersFormSelects, true);
  window.global.adForm.reset();
  window.form.getPrice(adFormSelectTypes.value);
  window.form.renderCapacityList(adFormSelectRooms.value);
  window.util.getNewMainPinAddress(MAIN_PIN_START_COORDINATE_X, MAIN_PIN_START_COORDINATE_Y, MAIN_PIN_HEIGHT);
  mainPin.style.left = MAIN_PIN_START_COORDINATE_X + `px`;
  mainPin.style.top = MAIN_PIN_START_COORDINATE_Y + `px`;
  avatarPreview.src = `img/muffin-grey.svg`;
  housePhotoPreview.src = `img/muffin-grey.svg`;
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
    window.global.map.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  window.global.map.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);

  if (evt.which === 1) {
    activatePage();
    window.util.getNewMainPinAddress(mainPinX, mainPinY, MAIN_PIN_HEIGHT_ACTIVE);
  }
});

mainPin.addEventListener(`keydown`, (evt) => {
  if (window.util.isEnter(evt)) {
    activatePage();
    window.util.getNewMainPinAddress(mainPinX, mainPinY, MAIN_PIN_HEIGHT_ACTIVE);
  }
});

window.global.adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.upload.sendData(new FormData(window.global.adForm), onSuccessSend, onErrorSend);
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
let housingPrice = `any`;
let housingRooms = `any`;
let housingGuests = `any`;
let housingFeatures = [];
let ads = [];

const updateAds = () => {

  const typeFilter = (ad) => {
    return ad.offer.type === housingType || housingType === `any`;
  };

  const priceFilter = (ad) => {
    return priceMap[housingPrice](ad.offer.price) || housingPrice === `any`;
  };

  const roomsFilter = (ad) => {
    return roomsMap[housingRooms](ad.offer.rooms) || housingRooms === `any`;
  };

  const guestsFilter = (ad) => {
    return guestsMap[housingGuests](ad.offer.guests) || housingGuests === `any`;
  };

  const featuresFilter = (ad) => {
    const features = ad.offer.features;
    return housingFeatures.every((el) => features.includes(el)) || housingFeatures.length === 0;
  };

  const filteredAds = ads
    .filter(typeFilter)
    .filter(priceFilter)
    .filter(roomsFilter)
    .filter(guestsFilter)
    .filter(featuresFilter);

  window.render.createAd(filteredAds);
};

window.filter.setHousingTypeHandler(window.debounce.setClickInterval((type) => {
  housingType = type;
  updateAds();
}));

window.filter.setHousingPriceHandler(window.debounce.setClickInterval((price) => {
  housingPrice = price;
  updateAds();
}));

window.filter.setHousingRoomsHandler(window.debounce.setClickInterval((rooms) => {
  housingRooms = rooms;
  updateAds();
}));

window.filter.setHousingGuestsHandler(window.debounce.setClickInterval((guests) => {
  housingGuests = guests;
  updateAds();
}));

window.filter.setHousingFeaturesHandler(window.debounce.setClickInterval((features) => {
  housingFeatures = features;
  updateAds();
}));

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

const showMessageAfterSubmit = (message) => {
  const onMessageClose = createCloseMessageHandler(message);
  document.addEventListener(`keydown`, onMessageClose);
  message.addEventListener(`click`, onMessageClose);
};

const createCloseMessageHandler = (message) => {
  const onClose = () => {
    document.removeEventListener(`keydown`, onClose);
    message.remove();
  };
  return onClose;
};

const onSuccessSend = () => {
  document.body.insertAdjacentElement(`afterbegin`, successTemplate);
  const successBlock = document.querySelector(`.success`);
  showMessageAfterSubmit(successBlock);
  unActivatePage();
};

const onErrorSend = () => {
  const main = document.querySelector(`main`);
  main.insertAdjacentElement(`afterbegin`, errorTemplate);
  const errorBlock = document.querySelector(`.error`);
  showMessageAfterSubmit(errorBlock);
};
