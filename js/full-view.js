// Модуль просмотра фотографии

'use strict';

(function () {
  // Находим элементы в галерее
  var fullViewPopup = document.querySelector('.big-picture');
  var fullViewPhoto = fullViewPopup.querySelector('.big-picture__img img');
  var fullViewPhotoLikes = fullViewPopup.querySelector('.likes-count');
  var fullViewPhotoCommentsNumber = fullViewPopup.querySelector('.comments-count');

  // Показываем пост с полноразмерной фотографией

  window.showFullViewPopup = function (currentData) {
    fullViewPopup.classList.remove('hidden');
    fullViewPhoto.src = currentData[0].url;
    fullViewPhoto.alt = currentData[0].description;
    fullViewPhotoLikes.textContent = currentData[0].likes;
    fullViewPhotoCommentsNumber.textContent = currentData[0].comments.length;
  };
})();
