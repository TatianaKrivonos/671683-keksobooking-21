'use strict';
const DEBOUNCE_INTERVAL = 500;

const setClickInterval = (cb) => {
  let lastTimeout = null;
  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.debounce = {
  setClickInterval
};
