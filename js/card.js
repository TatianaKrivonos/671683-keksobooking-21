'use strict';
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const fragment = document.createDocumentFragment();
const mapFiltersContainer = window.global.map.querySelector(`.map__filters-container`);

let closedCbs = [];

const typeMap = {
  "palace": `Дворец`,
  "flat": `Квартира`,
  "house": `Дом`,
  "bungalow": `Бунгало`,
};

const renderAdPopup = (ad) => {
  const adPopup = cardTemplate.cloneNode(true);

  adPopup.querySelector(`.popup__title`).textContent = ad.offer.title;
  adPopup.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  adPopup.querySelector(`.popup__text--price`).textContent = ad.offer.price + `₽/ночь`;
  adPopup.querySelector(`.popup__type`).textContent = typeMap[ad.offer.type];
  adPopup.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests;
  adPopup.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;

  const popupFeatures = adPopup.querySelector(`.popup__features`);
  ad.offer.features.forEach((el) => {
    const popupFeatureItem = document.createElement(`li`);
    popupFeatureItem.classList.add(`popup__feature`, `popup__feature--${el}`);
    popupFeatures.appendChild(popupFeatureItem);
  });

  adPopup.querySelector(`.popup__description`).textContent = ad.offer.description;
  const popupPhotos = adPopup.querySelector(`.popup__photos`);
  ad.offer.photos.forEach((el) => {
    const popupPhotoItem = document.createElement(`img`);
    popupPhotoItem.classList.add(`popup__photo`);
    popupPhotoItem.src = el;
    popupPhotoItem.width = 45;
    popupPhotoItem.height = 40;
    popupPhotoItem.alt = `Фотография жилья`;
    popupPhotos.appendChild(popupPhotoItem);
  });
  adPopup.querySelector(`.popup__avatar`).src = ad.author.avatar;

  return adPopup;
};

const openPopup = (ad) => {
  const popup = renderAdPopup(ad);
  fragment.appendChild(popup);
  window.global.map.insertBefore(fragment, mapFiltersContainer);
  const onPopupClose = createClosePopupHandler(popup);
  document.addEventListener(`keydown`, onPopupClose);
  popup.addEventListener(`click`, onPopupClose);

  return {
    closed: (cb) => closedCbs.push(cb),
    close: onPopupClose,
  };
};

const createClosePopupHandler = (popup) => {
  const onClose = () => {
    closedCbs.forEach((cb) => cb());
    closedCbs = [];

    document.removeEventListener(`keydown`, onClose);
    popup.remove();
  };

  return onClose;
};

window.card = {
  openPopup,
};
