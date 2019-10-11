// Модуль добавления галереи фотографий на страницу

'use strict';

(function () {
  // Находим в разметке шаблон фотографий для галереи
  var photoTemplate = document.querySelector('#picture').content;

  // Создаем разметку для поста с фотографией

  var createPhotoCard = function (photoPosts, index) {
    var currentPost = photoPosts[index];
    var photoCard = photoTemplate.cloneNode(true);
    var picture = photoCard.querySelector('.picture__img');
    var pictureLikesNumber = photoCard.querySelector('.picture__likes');
    var pictureCommentsNumber = photoCard.querySelector('.picture__comments');

    picture.src = currentPost.url;
    picture.alt = currentPost.description;
    pictureLikesNumber.textContent = String(currentPost.likes);
    pictureCommentsNumber.textContent = String(currentPost.comments.length);

    return photoCard;
  };

  // Добавляем фотографии на страницу

  var renderPhotos = function (data) {
    var picturesBlock = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(createPhotoCard(data, i));
    }

    picturesBlock.appendChild(fragment);
  };

  // Создаем сообщение об ошибке загрузки данных

  var showAdaptedErrorMessage = function (response) {
    window.backend.showErrorMessage();
    var popup = document.querySelector('.error');
    var errorTitle = popup.querySelector('.error__title');
    var errorContent = popup.querySelector('.error__buttons');
    errorTitle.textContent = 'Ошибка загрузки данных';
    errorContent.innerHTML = response;
  };

  // Получаем c сервера данные для фотопостов
  window.backend.load(renderPhotos, showAdaptedErrorMessage);
})();
