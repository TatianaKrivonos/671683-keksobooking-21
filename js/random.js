'use strict';
(function () {
  const getRandomNum = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
  const getRandomEl = (list) => list[getRandomNum(0, list.length - 1)];
  const getRandomArr = (arr) => {
    const firstNum = getRandomNum(0, arr.length - 1);
    const lastNum = getRandomNum(firstNum, arr.length - 1);
    return arr.splice(firstNum, lastNum);
  };

  window.random = {
    getRandomNum,
    getRandomEl,
    getRandomArr
  };
})();
