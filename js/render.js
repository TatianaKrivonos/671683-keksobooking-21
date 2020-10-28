'use strict';
const MAX_SIMILAR_AD_COUNT = 5;
const fragment = document.createDocumentFragment();
const map = document.querySelector(`.map`);
const similarAdElement = map.querySelector(`.map__pins`);
const pinsContainer = document.createElement(`div`);
pinsContainer.classList.add(`pins__container`);

const createAd = (ads) => {

  const takeNumber = ads.length > MAX_SIMILAR_AD_COUNT
    ? MAX_SIMILAR_AD_COUNT
    : ads.length;

  pinsContainer.innerHTML = ``;

  for (let i = 0; i < takeNumber; i++) {
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
      window.util.closePopup(popup);
    });
  }
  pinsContainer.appendChild(fragment);
  similarAdElement.appendChild(pinsContainer);
};

window.render = {
  createAd,
};
