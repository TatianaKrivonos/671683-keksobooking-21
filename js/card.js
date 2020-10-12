'use strict';
(function () {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const fragment = document.createDocumentFragment();
  const map = document.querySelector(`.map`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);

  const renderAdPopup = (ad) => {
    const adPopup = cardTemplate.cloneNode(true);

    adPopup.querySelector(`.popup__title`).textContent = ad.offer.title;
    adPopup.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    adPopup.querySelector(`.popup__text--price`).textContent = ad.offer.price + `₽/ночь`;
    adPopup.querySelector(`.popup__type`).textContent = ad.offer.type;
    adPopup.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests;
    adPopup.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;

    const popupFeatures = adPopup.querySelector(`.popup__features`);
    ad.offer.features.forEach((el) => {
      const popupFeatureItem = document.createElement(`li`);
      popupFeatureItem.className = `popup__feature popup__feature--${el}`;
      popupFeatures.appendChild(popupFeatureItem);
    });

    adPopup.querySelector(`.popup__description`).textContent = ad.offer.description;
    const popupPhotos = adPopup.querySelector(`.popup__photos`);
    ad.offer.photos.forEach((el) => {
      const popupPhotoItem = document.createElement(`img`);
      popupPhotoItem.className = `popup__photo`;
      popupPhotoItem.src = el;
      popupPhotoItem.width = 45;
      popupPhotoItem.height = 40;
      popupPhotoItem.alt = `Фотография жилья`;
      popupPhotos.appendChild(popupPhotoItem);
    });
    adPopup.querySelector(`.popup__avatar`).src = ad.author.avatar;

    return adPopup;
  };

  const createEscHandler = (popup) => function onPopupEscPress(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup(popup);
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  const openPopup = (popup) => {
    const mapCard = map.querySelector(`.map__card`);
    if (mapCard) {
      mapCard.remove();
    }
    fragment.appendChild(popup);
    map.insertBefore(fragment, mapFiltersContainer);
    document.addEventListener(`keydown`, createEscHandler(popup));
  };

  const closePopup = (popup) => {
    popup.remove();
  };

  window.card = {
    renderAdPopup,
    openPopup,
    closePopup,
  };
})();
