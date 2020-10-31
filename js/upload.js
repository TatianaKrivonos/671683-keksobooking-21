'use strict';
const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
const StatusCode = {
  OK: 200
};
const sendData = (data, onSuccessSend, onErrorSend) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccessSend();
    } else {
      onErrorSend();
    }
  });

  xhr.addEventListener(`error`, () => {
    onErrorSend();
  });

  xhr.open(`POST`, UPLOAD_URL);
  xhr.send(data);
};

window.upload = {
  sendData
};
