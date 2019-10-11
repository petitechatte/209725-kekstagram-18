// Модуль работы с сервером данных

'use strict';

(function () {
  // Адрес сервера данных
  var URL_DATA = 'https://js.dump.academy/kekstagram/data';

  // Ожидаемое время загрузки данных
  var TIMEOUT_LIMIT = 4000;
  // Ожидаемые статусы HTTP-ответа
  var OK_STATUS = 200;
  var WRONG_REQUEST_STATUS = 400;
  var UNAUTHORIZED_STATUS = 401;
  var NOT_FOUND_STATUS = 404;
  var SERVER_ERROR_STATUS = 500;

  window.load = function (onLoad, onError) {
    createRequest(onLoad, onError, 'GET', URL_DATA);
  };

  // Создаем запрос на сервер
  var createRequest = function (onLoad, onError, method, url, content) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case OK_STATUS:
          onLoad(xhr.response);
          break;
        case WRONG_REQUEST_STATUS:
          onError('Неверный запрос.');
          break;
        case UNAUTHORIZED_STATUS:
          onError('Пользователь не авторизован.');
          break;
        case NOT_FOUND_STATUS:
          onError('Ничего не найдено.');
          break;
        case SERVER_ERROR_STATUS:
          onError('Сервер недоступен.');
          break;
        default:
          onError('Статус ответа: ' + String(xhr.status) + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + String(xhr.timeout) + ' мс');
    });

    xhr.timeout = TIMEOUT_LIMIT;

    xhr.send(content);
  };
})();
