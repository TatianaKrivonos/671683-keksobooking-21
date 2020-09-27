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
  const similarAddElement = map.querySelector(`.map__pins`);
  const similarAddTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const getRandomNum = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
  const getRandomEl = (list) => list[getRandomNum(0, list.length - 1)];

  const createAdds = (amount) => Array.from({length: amount}, (_, i) => ({
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
      features: FEATURES.splice(getRandomNum(0, FEATURES.length - 1), getRandomNum(0, FEATURES.length - 1)),
      description: `description${i + 1}`,
      photos: PHOTOS.splice(getRandomNum(0, PHOTOS.length - 1), getRandomNum(0, PHOTOS.length - 1)),
    },
    location: {
      x: getRandomNum(0, map.clientWidth),
      y: getRandomNum(130, 630)
    }
  }));

  const renderAdd = (add) => {
    const addElement = similarAddTemplate.cloneNode(true);
    addElement.style = `left: ${add.location.x + PIN_WIDTH}px; top: ${add.location.y + PIN_HEIGHT}px;`;
    addElement.querySelector(`img`).src = add.author.avatar;
    addElement.querySelector(`img`).alt = add.offer.title;
    return addElement;
  };

  map.classList.remove(`map--faded`);

  createAdds(8).forEach((add) => fragment.appendChild(renderAdd(add)));
  similarAddElement.appendChild(fragment);
})();
