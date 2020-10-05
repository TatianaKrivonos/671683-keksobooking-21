'use strict';
(function () {

  const setDisableTrue = (arr) => {
    arr.forEach((el) => {
      el.disabled = true;
    });
  };

  const setDisableFalse = (arr) => {
    arr.forEach((el) => {
      el.disabled = false;
    });
  };

  window.util = {
    setDisableTrue,
    setDisableFalse,
  };
})();
