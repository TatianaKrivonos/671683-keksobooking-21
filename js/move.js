'use strict';
const MAIN_PIN_HEIGHT_ACTIVE = 87;
const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);
const mapLimits = {
  top: 130 - MAIN_PIN_HEIGHT_ACTIVE,
  right: map.offsetWidth - Math.floor(mainPin.clientWidth / 2),
  left: -Math.floor(mainPin.clientWidth / 2),
  bottom: 630 - MAIN_PIN_HEIGHT_ACTIVE,
};

const relocate = (newLocation) => {
  mainPin.style.left = newLocation.x + `px`;
  mainPin.style.top = newLocation.y + `px`;
  window.util.getNewMainPinAddress(newLocation.x, newLocation.y, MAIN_PIN_HEIGHT_ACTIVE);
};

const getNewLocation = (newMainPinX, newMainPinY) => {
  let newLocation = {
    x: mapLimits.left,
    y: mapLimits.top
  };
  if (newMainPinX > mapLimits.right) {
    newLocation.x = mapLimits.right;
  } else if (newMainPinX > mapLimits.left) {
    newLocation.x = newMainPinX;
  }
  if (newMainPinY > mapLimits.bottom) {
    newLocation.y = mapLimits.bottom;
  } else if (newMainPinY > mapLimits.top) {
    newLocation.y = newMainPinY;
  }
  relocate(newLocation);
};

window.move = {
  getNewLocation,
};
