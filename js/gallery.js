// Модуль добавления галереи фотографий на страницу

'use strict';

(function () {
  // Находим контейнер для размещения фотографий
  var picturesBlock = document.querySelector('.pictures');
  // Находим в разметке шаблон фотографий для галереи
  var photoTemplate = document.querySelector('#picture').content;
  // Создаем переменную для хранения обработчика в области видимости модуля (для последующего удаления)
  var galleryPhotoClickHandler;

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
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(createPhotoCard(data, i));
    }
    picturesBlock.appendChild(fragment);
  };

  // Создаем обработчик по клику

  var createClickListener = function (link, currentPost) {
    galleryPhotoClickHandler = function () {
      window.showFullViewPopup(currentPost);
    };

    link.addEventListener('click', galleryPhotoClickHandler);
  };

  // Добавляем обработчики на все фотографии галереи

  var activateGallery = function (data) {
    var photoPreviews = picturesBlock.querySelectorAll('.picture');

    for (var j = 0; j < photoPreviews.length; j++) {
      createClickListener(photoPreviews[j], data[j]);
    }
  };

  // Заполняем галерею

  var createGallery = function (data) {
    // Страхуемся от неправильного формата данных с сервера
    try {
      // Создаем фотографии для галлереи
      renderPhotos(data);
      // Добавляем обработчики на фотографии в галерее
      activateGallery(data);
    } catch (err) {
      showAdaptedErrorMessageCallback(err.message);
    }
  };

  // Удаляем фотографии
  var clearGallery = function () {
    // Собираем список текущих фотографий
    var galleryPhotos = picturesBlock.querySelectorAll('.picture');
    for (var i = 0; i < galleryPhotos.length; i++) {
      galleryPhotos[i].removeEventListener('click', galleryPhotoClickHandler);
      galleryPhotos[i].remove();
    }
  };

  // Получаем фотографии с сервера

  var getPhotosCallback = function (response) {
    // Заполняем галерею
    createGallery(response);
    // Показываем фильтры для сортировки
    window.activateSortingFilters();

    // Экспортируем данные для сортировки
    window.gallery = {
      // Сохраняем исходный массив данных после загрузки
      initialData: response,
      // Обновляем фотогаллерею
      updateGallery: function (data) {
        // Удаляем старые фотографии из галереи
        clearGallery();
        // Добавляем в галерею новые фотографии из массива данных
        createGallery(data);
      }
    };
  };

  // Создаем сообщение об ошибке загрузки данных

  var showAdaptedErrorMessageCallback = function (response) {
    window.backend.showErrorMessage();
    var errorWrapper = document.querySelector('.error__inner');
    var errorTitle = errorWrapper.querySelector('.error__title');
    var errorButtons = errorWrapper.querySelector('.error__buttons');
    var errorText = document.createElement('p');
    errorTitle.textContent = 'Ошибка загрузки данных';
    errorButtons.innerHTML = '';
    errorText.innerHTML = response;
    errorWrapper.insertBefore(errorText, errorButtons);
  };

  // Посылаем запрос на сервер
  window.backend.load(getPhotosCallback, showAdaptedErrorMessageCallback);
})();
