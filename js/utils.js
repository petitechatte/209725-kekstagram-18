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

  // Обработка нажатия ESC
  var escKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      if (evt.target.classList.contains('text__hashtags') || evt.target.tagName === 'TEXTAREA') {
        // Потеря фокуса текстовым полем при нажатии ESC
        evt.stopPropagation();
        evt.target.blur();
      } else {
        // Закрытие формы
        window.closeUploadForm();
      }
    }
  };

  window.utils = {
    getRandomValue: getRandomValue,
    selectData: selectData,
    escKeydownHandler: escKeydownHandler
  };
})();
