// Модуль сортировки фотографий

'use strict';

(function () {
  // Количество случайных фотографий
  var SELECTED_PHOTOS_NUMBER = 10;

  var randomPhotos = [];
  var copiedPhotos = [];

  // Выбираем случайные фотографии

  var showRandomPhotos = function () {
    randomPhotos = window.utils.selectData(window.gallery.initialData, SELECTED_PHOTOS_NUMBER);
    window.gallery.updateGallery(randomPhotos);
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
    window.gallery.updateGallery(discussedPhotos);
  };

  // Экспортируем функции сортировки
  window.sorting = {
    showRandomPhotos: showRandomPhotos,
    showDiscussedPhotos: showDiscussedPhotos
  };
})();
