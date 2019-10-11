// Модуль добавления галереи фотографий на страницу

'use strict';

(function () {
  // Находим в разметке шаблон для оформления фотографий пользователей
  var template = document.querySelector('#picture').content;

  // Создаем разметку для поста с фотографией

  var createPhotoCard = function (photoPosts, index) {
    var currentPost = photoPosts[index];
    var photoCard = template.cloneNode(true);
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

  // Получаем c сервера данные для фотопостов
  window.load(renderPhotos);
})();
