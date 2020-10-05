'use strict';
(function () {
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const CHECKIN_TIME = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT_TIME = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const ROOMS = 3;
  const GUESTS = [`one`, `two`, `any`, `not for guests`];

  const map = document.querySelector(`.map`);

  const createAds = (amount) => Array.from({length: amount}, (_, i) => ({
    author: {
      avatar: `img/avatars/user0${i + 1}.png`,
    },
    offer: {
      title: `title${i + 1}`,
      address: `${window.random.getRandomNum(0, 1000)}, ${window.random.getRandomNum(0, 1000)}`,
      price: window.random.getRandomNum(1000, 50000),
      type: window.random.getRandomEl(TYPES),
      rooms: window.random.getRandomNum(1, ROOMS),
      guests: window.random.getRandomEl(GUESTS),
      checkin: window.random.getRandomEl(CHECKIN_TIME),
      checkout: window.random.getRandomEl(CHECKOUT_TIME),
      features: window.random.getRandomArr(FEATURES),
      description: `description${i + 1}`,
      photos: window.random.getRandomArr(PHOTOS)
    },
    location: {
      x: window.random.getRandomNum(0, map.clientWidth),
      y: window.random.getRandomNum(130, 630)
    }
  }));

  window.data = {
    createAds,
  };
})();
