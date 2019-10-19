// Модуль сортировки фотографий

'use strict';

(function () {
  // Количество случайных фотографий
  var SELECTED_PHOTOS_NUMBER = 10;

  var randomPhotos = [];
  var copiedPhotos = [];

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

  // Выбираем случайные фотографии

  var showRandomPhotos = function () {
    randomPhotos = selectData(window.gallery.initialData, SELECTED_PHOTOS_NUMBER);
    window.gallery.updatePhotos(randomPhotos);
  };

  // Дополнительная сортировка по количеству лайков

  var compareLikes = function (a, b) {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  };

  // Сортируем фотографии по убыванию количества комментариев

  var sortPhotos = function () {
    copiedPhotos = window.gallery.initialData.slice();
    copiedPhotos.sort(function (a, b) {
      // Проверяем рейтинг сходства
      var commentsDiff = b.comments.length - a.comments.length;
      if (commentsDiff === 0) {
        // При одинаковом количестве комментариев сортируем по количеству лайков
        commentsDiff = compareLikes(a.likes, b.likes);
      }
      return commentsDiff;
    });
    return copiedPhotos;
  };

  var showDiscussedPhotos = function () {
    var discussedPhotos = sortPhotos();
    window.gallery.updatePhotos(discussedPhotos);
  };

  // Экспортируем функции сортировки
  window.sorting = {
    showRandomPhotos: showRandomPhotos,
    showDiscussedPhotos: showDiscussedPhotos
  };
})();
