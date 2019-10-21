// Модуль служебных функций

'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  // Получаем случайное значение из массива
  var getRandomValue = function (data) {
    return data[Math.floor(Math.random() * (data.length))];
  };

  // Выбираем элементы для массива заданной длины из другого массива
  var selectData = function (data, elementsNumber) {
    var selectedElements = [];
    var element;

    while (selectedElements.length < elementsNumber) {
      element = getRandomValue(data);

      if (selectedElements.indexOf(element) === -1) {
        selectedElements.push(element);
      }
    }

    return selectedElements;
  };

  // Проверка нажатия нажатия ESC
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEY_CODE) {
      action();
    }
  };

  window.utils = {
    getRandomValue: getRandomValue,
    selectData: selectData,
    isEscEvent: isEscEvent
  };
})();
