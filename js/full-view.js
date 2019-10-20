// Модуль просмотра фотографии

'use strict';

(function () {
  // Находим элементы в галерее
  var fullViewPopup = document.querySelector('.big-picture');
  var fullViewPhoto = fullViewPopup.querySelector('.big-picture__img img');
  var fullViewHeading = fullViewPopup.querySelector('.social__caption');
  var fullViewLikes = fullViewPopup.querySelector('.likes-count');
  var fullViewCommentsNumber = fullViewPopup.querySelector('.comments-count');
  var fullViewCommentsList = fullViewPopup.querySelector('.social__comments');
  var fullViewComment = fullViewCommentsList.querySelector('.social__comment');

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
    var post = currentData[0];
    fullViewPopup.classList.remove('hidden');
    fullViewPhoto.src = post.url;
    fullViewPhoto.alt = post.description;
    fullViewHeading.textContent = post.description;
    fullViewLikes.textContent = post.likes;
    fullViewCommentsNumber.textContent = post.comments.length;
    createComments(post.comments);
  };
})();
