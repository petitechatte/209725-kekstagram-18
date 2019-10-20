// Модуль просмотра фотографии

'use strict';

(function () {
  // Находим элементы в галерее
  var fullViewPopup = document.querySelector('.big-picture');
  var fullViewPhoto = fullViewPopup.querySelector('.big-picture__img img');
  var fullViewHeading = fullViewPopup.querySelector('.social__caption');
  var fullViewLikes = fullViewPopup.querySelector('.likes-count');
  var fullViewCommentsCounter = fullViewPopup.querySelector('.social__comment-count');
  var fullViewCommentsNumber = fullViewCommentsCounter.querySelector('.comments-count');
  var fullViewCommentsList = fullViewPopup.querySelector('.social__comments');
  var fullViewComment = fullViewCommentsList.querySelector('.social__comment');
  var fullViewCommentsLoader = fullViewPopup.querySelector('.comments-loader');

  // Обновляем данные в окне просмотра фотографии

  var updateFullViewPopup = function (post) {
    fullViewPhoto.src = post.url;
    fullViewPhoto.alt = post.description;
    fullViewHeading.textContent = post.description;
    fullViewLikes.textContent = post.likes;
    fullViewCommentsNumber.textContent = post.comments.length;
  };

  // Создаем комментарии к посту

  var createComments = function (comments) {
    var fragment = document.createDocumentFragment();
    var commentBlock;
    var commentatorAvatar;
    var commentText;

    for (var i = 0; i < comments.length; i++) {
      // Копируем разметку комментария
      commentBlock = fullViewComment.cloneNode(true);
      fullViewCommentsList.appendChild(commentBlock);
      commentatorAvatar = commentBlock.querySelector('.social__picture');
      commentText = commentBlock.querySelector('.social__text');
      // Заполняем шаблон комментария данными
      commentatorAvatar.src = comments[i].avatar;
      commentatorAvatar.alt = comments[i].name;
      commentText.textContent = comments[i].message;
      // Добавляем комментарий в список
      fragment.appendChild(commentBlock);
    }

    // Показываем список комментариев
    fullViewCommentsList.innerHTML = '';
    fullViewCommentsList.appendChild(fragment);
  };

  // Показываем пост с полноразмерной фотографией

  window.showFullViewPopup = function (currentData) {
    // Подставляем данные в разметку поста
    var currentPost = currentData[0];
    updateFullViewPopup(currentPost);
    // Создаем список комментариев
    createComments(currentPost.comments);
    // Прячем счетчик  и загрузчик комментариев
    fullViewCommentsCounter.classList.add('visually-hidden');
    fullViewCommentsLoader.classList.add('visually-hidden');
    // Отображаем окно просмотра
    fullViewPopup.classList.remove('hidden');
  };
})();
