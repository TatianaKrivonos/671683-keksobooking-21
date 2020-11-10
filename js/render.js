'use strict';
const MAX_SIMILAR_AD_COUNT = 5;
const fragment = document.createDocumentFragment();
const pinsContainer = document.createElement(`div`);
pinsContainer.classList.add(`pins__container`);

let popup = null;
let activePin = null;

const onActivatePin = (pin, ad) => {
  pin.classList.add(`map__pin--active`);
  activePin = pin;

  if (popup) {
    popup.close();
  }
  popup = window.card.openPopup(ad);
  popup.closed(() => {
    pin.classList.remove(`map__pin--active`);
    activePin = null;
  });
};

const createAd = (ads) => {
  const takeNumber = Math.min(ads.length, MAX_SIMILAR_AD_COUNT);

  pinsContainer.innerHTML = ``;

  for (let i = 0; i < takeNumber; i++) {
    const pin = window.pin.renderAd(ads[i]);
    fragment.appendChild(pin);

    pin.addEventListener(`click`, () => {
      onActivatePin(pin, ads[i]);
    });

    pin.addEventListener(`keydown`, (evt) => {
      if (window.util.isEnter(evt)) {
        onActivatePin(pin, ads[i]);
      }
    });
  }
  pinsContainer.appendChild(fragment);
  window.global.similarAdElement.appendChild(pinsContainer);
};

window.global.filtersForm.addEventListener(`change`, () => {
  if (popup) {
    popup.close();
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
      activePin = null;
    }
  }
});

window.render = {
  createAd,
};
