// Модуль просмотра фотографии

'use strict';

(function () {
  // Находим элементы в галерее
  var fullViewPopup = document.querySelector('.big-picture');
  var fullViewPhoto = fullViewPopup.querySelector('.big-picture__img img');

  window.showFullViewPopup = function (currentData) {
    fullViewPopup.classList.remove('hidden');
    fullViewPhoto.src = currentData[0].url;
  };
})();
