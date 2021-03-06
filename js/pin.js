'use strict';
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const similarAdTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const renderAd = (ad) => {
  const adElement = similarAdTemplate.cloneNode(true);
  adElement.style = `left: ${ad.location.x - Math.floor(PIN_WIDTH / 2)}px; top: ${ad.location.y - PIN_HEIGHT}px;`;

  const adImg = adElement.querySelector(`img`);
  adImg.src = ad.author.avatar;
  adImg.alt = ad.offer.title;

  return adElement;
};

window.pin = {
  renderAd,
};
