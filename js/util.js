'use strict';
(function () {

  const setDisable = (arr, boolean) => {
    arr.forEach((el) => {
      el.disabled = boolean;
    });
  };

  window.util = {
    setDisable,
  };
})();
