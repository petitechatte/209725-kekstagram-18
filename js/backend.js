// Модуль работы с сервером данных

'use strict';

(function () {
  // Адрес сервера данных
  var Url = {
    DATA: 'https://js.dump.academy/kekstagram/data',
    UPLOAD: 'https://js.dump.academy/kekstagram'
  };

  // Ожидаемое время загрузки данных
  var TIMEOUT_LIMIT = 4000;

  // Ожидаемые статусы HTTP-ответа
  var Status = {
    OK: 200,
    WRONG_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  window.backend = {
    // Загружаем данные с сервера
    load: function (onLoad, onError) {
      createRequest(onLoad, onError, 'GET', Url.DATA);
    },
    // Отправляем данные на сервер
    save: function (data, onLoad, onError) {
      createRequest(onLoad, onError, 'POST', Url.UPLOAD, data);
    },
    // Создаем сообщение об ошибке загрузки
    showErrorMessage: function () {
      var errorTemplate = document.querySelector('#error').content;
      var errorMessagePopup = errorTemplate.cloneNode(true);
      window.utils.mainElement.appendChild(errorMessagePopup);
    }
  };

  // Создаем запрос на сервер
  var createRequest = function (onLoad, onError, method, url, content) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.OK:
          onLoad(xhr.response);
          break;
        case Status.WRONG_REQUEST:
          onError('Неверный запрос.');
          break;
        case Status.UNAUTHORIZED:
          onError('Пользователь не авторизован.');
          break;
        case Status.NOT_FOUND:
          onError('Ничего не найдено.');
          break;
        case Status.SERVER_ERROR:
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
