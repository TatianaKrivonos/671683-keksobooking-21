/* eslint-disable no-unused-vars */
'use strict';
const filtersForm = document.querySelector(`.map__filters`);
const housingTypeSelector = filtersForm.querySelector(`select[name = housing-type]`);
const housingPriceSelector = filtersForm.querySelector(`select[name = housing-price]`);
const housingRoomSelector = filtersForm.querySelector(`select[name = housing-rooms]`);
const housingGuestSelector = filtersForm.querySelector(`select[name = housing-guests]`);
const housingFeaturesInputs = filtersForm.querySelectorAll(`.map__checkbox`);

const closeActivePopup = () => {
  const popup = document.querySelector(`.map__card`);
  if (popup) {
    window.util.closePopup(popup);
  }
};

const ad = {
  onHousingTypeChange: (type) => {},
  onHousingPriceChange: (price) => {},
  onHousingRoomsChange: (rooms) => {},
  onHousingGuestsChange: (guests) => {},
  onHousingFeaturesChange: (features) => {},
};

housingTypeSelector.addEventListener(`change`, () => {
  const newHousingType = housingTypeSelector.value;
  ad.onHousingTypeChange(newHousingType);
  closeActivePopup();
});

housingPriceSelector.addEventListener(`change`, () => {
  const newHousingPrice = housingPriceSelector.value;
  ad.onHousingPriceChange(newHousingPrice);
  closeActivePopup();
});

housingRoomSelector.addEventListener(`change`, () => {
  const newHousingRooms = housingRoomSelector.value;
  ad.onHousingRoomsChange(newHousingRooms);
  closeActivePopup();
});

housingGuestSelector.addEventListener(`change`, () => {
  const newHousingGuests = housingGuestSelector.value;
  ad.onHousingGuestsChange(newHousingGuests);
  closeActivePopup();
});

housingFeaturesInputs.forEach((checkBox) => {
  checkBox.addEventListener(`click`, () => {
    const newHousingFeatures = [];
    if (checkBox.checked) {
      newHousingFeatures.push(checkBox.value);
    } else {
      const index = newHousingFeatures.indexOf(checkBox);
      newHousingFeatures.splice(index, 1);
    }
    ad.onHousingFeaturesChange(newHousingFeatures);
    closeActivePopup();
  });
});

const setHousingTypeHandler = (cb) => {
  ad.onHousingTypeChange = cb;
};

const setHousingPriceHandler = (cb) => {
  ad.onHousingPriceChange = cb;
};

const setHousingRoomsHandler = (cb) => {
  ad.onHousingRoomsChange = cb;
};

const setHousingGuestsHandler = (cb) => {
  ad.onHousingGuestsChange = cb;
};

const setHousingFeaturesHandler = (cb) => {
  ad.onHousingFeaturesChange = cb;
};

window.filter = {
  setHousingTypeHandler,
  setHousingPriceHandler,
  setHousingRoomsHandler,
  setHousingGuestsHandler,
  setHousingFeaturesHandler
};
