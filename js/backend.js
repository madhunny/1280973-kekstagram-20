'use strict';
(function () {

  var STATUS_CODE = {
    ok: 200,
    badRequest: 400,
    notFound: 404,
    internalServerError: 500
  };

  function getData(url, method, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS_CODE.ok:
          onSuccess(xhr.response);
          break;
        case STATUS_CODE.badRequest:
          error = 'Неверный запрос';
          break;
        case STATUS_CODE.notFound:
          error = 'Не найдено';
          break;
        case STATUS_CODE.internalServerError:
          error = 'Возникла внутренняя ошибка сервера';
          break;
        default:
          error = 'Произошла ошибка, статус:' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
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
    getData(window.constant.GET_DATA_URL, 'GET', onSuccess, onError);
  }

  function save(data, onSuccess, onError) {
    getData(window.constant.SEND_DATA_URL, 'POST', onSuccess, onError, data);
  }

  window.backend = {
    getData: getData,
    load: load,
    save: save
  };

})();
