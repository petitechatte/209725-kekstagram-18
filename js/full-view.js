// Модуль просмотра фотографии

'use strict';

(function () {
  var DEFAULT_COMMENTS_NUMBER = 5;

  // Находим элементы в галерее
  var fullViewPopup = document.querySelector('.big-picture');
  var fullViewPhoto = fullViewPopup.querySelector('.big-picture__img img');
  var fullViewHeading = fullViewPopup.querySelector('.social__caption');
  var fullViewLikes = fullViewPopup.querySelector('.likes-count');
  var fullViewCommentsCounter = fullViewPopup.querySelector('.social__comment-count');
  var fullViewCommentsNumber = fullViewCommentsCounter.querySelector('.comments-count');
  var fullViewVisibleCommentsNumber = fullViewCommentsCounter.querySelector('.visible-comments-count');
  var fullViewCommentsList = fullViewPopup.querySelector('.social__comments');
  var fullViewComment = fullViewCommentsList.querySelector('.social__comment');
  var fullViewCommentsLoader = fullViewPopup.querySelector('.comments-loader');
  var fullViewCloseButton = fullViewPopup.querySelector('#picture-cancel');

  var totalCommentsNumber;
  var currentCommentsNumber;
  var hiddenComments;

  // Обновляем данные в окне просмотра фотографии

  var updateFullViewPopup = function (currentPost) {
    fullViewPhoto.src = currentPost.url;
    fullViewPhoto.alt = currentPost.description;
    fullViewHeading.textContent = currentPost.description;
    fullViewLikes.textContent = currentPost.likes;
    totalCommentsNumber = currentPost.comments.length;
    fullViewCommentsNumber.textContent = String(totalCommentsNumber);
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
      // Делаем скрытыми все комментарии после 5-го
      if (i >= DEFAULT_COMMENTS_NUMBER) {
        commentBlock.classList.add('visually-hidden'); // класс hidden не работает из-за переопределения свойства display в стилях
      }
      // Добавляем комментарий в список
      fragment.appendChild(commentBlock);
    }

    // Показываем список комментариев
    fullViewCommentsList.innerHTML = '';
    fullViewCommentsList.appendChild(fragment);
  };

  // Закрытие окна загрузки файла по нажатию Esc

  var documentKeydownHandler = function (evt) {
    window.utils.isEscEvent(evt, closeFullViewPopup);
  };

  // Переключаем загрузчик комментариев

  var toggleCommentsLoader = function () {
    if (!hiddenComments.length) {
      // Прячем "загрузчик" комментариев
      fullViewCommentsLoader.classList.add('hidden');
    } else if (fullViewCommentsLoader.classList.contains('hidden')) {
      // Показываем "загрузчик" комментариев
      fullViewCommentsLoader.classList.remove('hidden');
    }
  };

  // Обновляем счетчик комментариев

  var updateCommentsNumber = function () {
    hiddenComments = fullViewCommentsList.querySelectorAll('.social__comment.visually-hidden');
    currentCommentsNumber = totalCommentsNumber - hiddenComments.length;
    fullViewVisibleCommentsNumber.textContent = String(currentCommentsNumber);
  };

  // Показываем пост с полноразмерной фотографией

  window.showFullViewPopup = function (currentPost) {
    // Подставляем данные в разметку поста
    updateFullViewPopup(currentPost);
    // Создаем список комментариев
    createComments(currentPost.comments);
    // Корректируем число комментариев (если общее число комментариев < 5)
    updateCommentsNumber();
    // Скрываем "загрузчик" комментариев (если общее число комментариев <= 5)
    toggleCommentsLoader();
    // Добавляем обработчик нажатия Esc
    document.addEventListener('keydown', documentKeydownHandler);
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
    document.removeEventListener('keydown', documentKeydownHandler);
    // Удаляем класс у body
    document.body.classList.remove('modal-open');
  };

  fullViewCloseButton.addEventListener('click', function () {
    closeFullViewPopup();
  });

  // "Подгружаем" следующие комментарии

  var showMoreComments = function () {
    for (var i = 0; i < hiddenComments.length; i++) {
      if (i < DEFAULT_COMMENTS_NUMBER) {
        hiddenComments[i].classList.remove('visually-hidden');
      }
    }
  };

  fullViewCommentsLoader.addEventListener('click', function () {
    showMoreComments();
    updateCommentsNumber();
    toggleCommentsLoader();
  });
})();
