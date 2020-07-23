'use strict';
(function () {

  var StatusCode = {
    OK: 200
  };

  function madeRequest(url, method, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.constant.TIME_OUT;

    xhr.open(method, url);
    xhr.send(data);
  }

  function load(onSuccess, onError) {
    madeRequest(window.constant.GET_DATA_URL, 'GET', onSuccess, onError);
  }

  function save(data, onSuccess, onError) {
    madeRequest(window.constant.SEND_DATA_URL, 'POST', onSuccess, onError, data);
  }

  window.backend = {
    load: load,
    save: save
  };

})();
