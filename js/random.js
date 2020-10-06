'use strict';
(function () {
  const getNum = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
  const getEl = (list) => list[getNum(0, list.length - 1)];
  const getArr = (arr) => {
    const firstNum = getNum(0, arr.length - 1);
    const lastNum = getNum(firstNum, arr.length - 1);
    return arr.splice(firstNum, lastNum);
  };

  window.random = {
    getNum,
    getEl,
    getArr
  };
})();
