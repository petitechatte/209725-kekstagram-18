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
  var fullViewCloseButton = fullViewPopup.querySelector('#picture-cancel');

  // Обновляем данные в окне просмотра фотографии

  var updateFullViewPopup = function (currentPost) {
    fullViewPhoto.src = currentPost.url;
    fullViewPhoto.alt = currentPost.description;
    fullViewHeading.textContent = currentPost.description;
    fullViewLikes.textContent = currentPost.likes;
    fullViewCommentsNumber.textContent = String(currentPost.comments.length);
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

  // Закрытие окна загрузки файла по нажатию Esc

  var documentEscKeydownHandler = function (evt) {
    window.utils.isEscEvent(evt, closeFullViewPopup);
  };

  // Показываем пост с полноразмерной фотографией

  window.showFullViewPopup = function (currentPost) {
    // Подставляем данные в разметку поста
    updateFullViewPopup(currentPost);
    // Создаем список комментариев
    createComments(currentPost.comments);
    // Прячем счетчик  и загрузчик комментариев
    fullViewCommentsCounter.classList.add('visually-hidden');
    fullViewCommentsLoader.classList.add('visually-hidden');
    // Добавляем обработчик нажатия Esc
    document.addEventListener('keydown', documentEscKeydownHandler);
    // Отображаем окно просмотра
    fullViewPopup.classList.remove('hidden');
    // Добавляем класс для body согласно ТЗ
    document.body.classList.add('modal-open');
  };

  // Закрываем окно просмотра фотографии
  var closeFullViewPopup = function () {
    // Прячем окно
    fullViewPopup.classList.add('hidden');
    // Удаляем обработчик нажатия Esc
    document.removeEventListener('keydown', documentEscKeydownHandler);
    // Удаляем класс у body
    document.body.classList.remove('modal-open');
  };

  fullViewCloseButton.addEventListener('click', closeFullViewPopup);
})();
