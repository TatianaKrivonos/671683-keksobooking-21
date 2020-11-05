'use strict';
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_HEIGHT_ACTIVE = 87;
const MAIN_PIN_START_COORDINATE_X = 570;
const MAIN_PIN_START_COORDINATE_Y = 375;
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
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
const housePhotoPreview = adForm.querySelector(`.ad-form__photo img`);
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
let housingPrice = `any`;
let housingRooms = `any`;
let housingGuests = `any`;
let housingFeatures = [];
let ads = [];

const priceMap = {
  "any": (price) => price > 0,
  "middle": (price) => (price > 10000 && price < 50000),
  "low": (price) => price < 10000,
  "high": (price) => price > 50000
};

const roomsMap = {
  "any": (rooms) => rooms > 0,
  "1": (rooms) => rooms === 1,
  "2": (rooms) => rooms === 2,
  "3": (rooms) => rooms === 3
};

const guestsMap = {
  "any": (guests) => guests > 0,
  "1": (guests) => guests === 1,
  "2": (guests) => guests === 2,
  "0": (guests) => guests === 0
};

const getRank = (ad) => {
  const features = ad.offer.features;
  let rank = 0;
  if (ad.offer.type === housingType) {
    rank += 5;
  }
  if (priceMap[housingPrice](ad.offer.price)) {
    rank += 4;
  }
  if (roomsMap[housingRooms](ad.offer.rooms)) {
    rank += 3;
  }
  if (guestsMap[housingGuests](ad.offer.guests)) {
    rank += 2;
  }
  if (housingFeatures.some((el) => features.includes(el))) {
    rank += 1;
  }

  return rank;
};

const arrsComparator = (arr1, arr2) => {
  if (arr1.length > arr2.length) {
    return 1;
  } else if (arr1.length < arr2.length) {
    return -1;
  } else {
    return 0;
  }
};

const updateAds = () => {
  window.render.createAd(ads.sort((left, right) => {
    let rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = arrsComparator(left.offer.features, right.offer.features);
    }
    return rankDiff;
  }));
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
