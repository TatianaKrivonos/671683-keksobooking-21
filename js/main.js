'use strict';
(function () {
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const CHECKIN_TIME = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT_TIME = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const ROOMS = 3;
  const GUESTS = [`one`, `two`, `any`, `not for guests`];
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const fragment = document.createDocumentFragment();
  const map = document.querySelector(`.map`);
  const similarAdElement = map.querySelector(`.map__pins`);
  const similarAdTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);

  const getRandomNum = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
  const getRandomEl = (list) => list[getRandomNum(0, list.length - 1)];
  const getRandomArr = (arr) => {
    const firstNum = getRandomNum(0, arr.length - 1);
    const lastNum = getRandomNum(firstNum, arr.length - 1);
    return arr.splice(firstNum, lastNum);
  };

  const createAds = (amount) => Array.from({length: amount}, (_, i) => ({
    author: {
      avatar: `img/avatars/user0${i + 1}.png`,
    },
    offer: {
      title: `title${i + 1}`,
      address: `${getRandomNum(0, 1000)}, ${getRandomNum(0, 1000)}`,
      price: getRandomNum(1000, 50000),
      type: getRandomEl(TYPES),
      rooms: getRandomNum(1, ROOMS),
      guests: getRandomEl(GUESTS),
      checkin: getRandomEl(CHECKIN_TIME),
      checkout: getRandomEl(CHECKOUT_TIME),
      features: getRandomArr(FEATURES),
      description: `description${i + 1}`,
      photos: getRandomArr(PHOTOS),
    },
    location: {
      x: getRandomNum(0, map.clientWidth),
      y: getRandomNum(130, 630),
    }
  }));

  const renderAd = (ad) => {
    const adElement = similarAdTemplate.cloneNode(true);
    adElement.style = `left: ${ad.location.x + PIN_WIDTH}px; top: ${ad.location.y + PIN_HEIGHT}px;`;

    const adImg = adElement.querySelector(`img`);
    adImg.src = ad.author.avatar;
    adImg.alt = ad.offer.title;

    return adElement;
  };

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

  map.classList.remove(`map--faded`);

  const similarAds = createAds(8);

  similarAds.forEach((ad) => fragment.appendChild(renderAd(ad)));
  similarAdElement.appendChild(fragment);

  fragment.appendChild(renderAdPopup(similarAds[0]));
  map.insertBefore(fragment, mapFiltersContainer);
})();
