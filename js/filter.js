
'use strict';
const housingTypeSelector = window.global.filtersForm.querySelector(`select[name = housing-type]`);
const housingPriceSelector = window.global.filtersForm.querySelector(`select[name = housing-price]`);
const housingRoomSelector = window.global.filtersForm.querySelector(`select[name = housing-rooms]`);
const housingGuestSelector = window.global.filtersForm.querySelector(`select[name = housing-guests]`);
const housingFeaturesInputs = window.global.filtersForm.querySelectorAll(`.map__checkbox`);

const ad = {
  onHousingTypeChange: () => {},
  onHousingPriceChange: () => {},
  onHousingRoomsChange: () => {},
  onHousingGuestsChange: () => {},
  onHousingFeaturesChange: () => {},
};

housingTypeSelector.addEventListener(`change`, () => {
  const newHousingType = housingTypeSelector.value;
  ad.onHousingTypeChange(newHousingType);
});

housingPriceSelector.addEventListener(`change`, () => {
  const newHousingPrice = housingPriceSelector.value;
  ad.onHousingPriceChange(newHousingPrice);
});

housingRoomSelector.addEventListener(`change`, () => {
  const newHousingRooms = housingRoomSelector.value;
  ad.onHousingRoomsChange(newHousingRooms);
});

housingGuestSelector.addEventListener(`change`, () => {
  const newHousingGuests = housingGuestSelector.value;
  ad.onHousingGuestsChange(newHousingGuests);
});

let newHousingFeatures = [];
housingFeaturesInputs.forEach((checkBox) => {
  checkBox.addEventListener(`click`, () => {
    if (checkBox.checked) {
      newHousingFeatures.push(checkBox.value);
    } else {
      const index = newHousingFeatures.indexOf(checkBox.value);
      newHousingFeatures.splice(index, 1);
    }
    ad.onHousingFeaturesChange(newHousingFeatures);
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
