// Модуль для устранения "дребезга"

'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  // Создаем общий счетчик для кнопок сортировки
  var lastTimeout = null;

  window.debounce = function (cb) {
    return function () {
      // Получаем аргументы, переданные в функцию
      var parameters = arguments;
      // Отключаем текущий таймер перед созданием нового таймера
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      // Добавляем новый таймер
      lastTimeout = window.setTimeout(function () {
        // Вызываем функцию-коллбэк и передаем в нее аргументы
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
