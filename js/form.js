'use strict';
(function () {
  const adForm = document.querySelector(`.ad-form`);
  const adFormSelectCapacity = adForm.querySelector(`select[name = capacity]`);
  const fragment = document.createDocumentFragment();

  const createOption = (text) => {
    const option = document.createElement(`option`);
    option.textContent = text;
    return option;
  };

  const capacityMap = {
    1: [`для 1 гостя`],
    2: [`для 1 гостя`, `для 2 гостей`],
    3: [`для 1 гостя`, `для 2 гостей`, `для 3 гостей`],
    100: [`не для гостей`]
  };

  const renderCapacityList = (roomsNum) => {
    adFormSelectCapacity.innerHTML = ``;
    capacityMap[roomsNum].forEach((el) => {
      fragment.appendChild(createOption(el));
    });
    adFormSelectCapacity.appendChild(fragment);
  };

  window.form = {
    renderCapacityList,
  };
})();
