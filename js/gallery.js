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

  var createPhotoCard = function (currentPost) {
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

    data.forEach(function (post) {
      fragment.appendChild(createPhotoCard(post));
    });

    picturesBlock.appendChild(fragment);
  };

  // Создаем обработчик по клику

  var createGalleryPhotoClickListener = function (link, currentPost) {
    galleryPhotoClickHandler = function () {
      window.showFullViewPopup(currentPost);
    };

    link.addEventListener('click', galleryPhotoClickHandler);
  };

  // Добавляем обработчики на все фотографии галереи

  var activateGallery = function (data) {
    var photoPreviews = picturesBlock.querySelectorAll('.picture');

    [].forEach.call(photoPreviews, function (preview, i) {
      createGalleryPhotoClickListener(preview, data[i]);
    });
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
      showAdaptedErrorMessage(err.message);
    }
  };

  // Удаляем фотографии
  var clearGallery = function () {
    // Собираем список текущих фотографий
    var galleryPhotos = picturesBlock.querySelectorAll('.picture');
    [].forEach.call(galleryPhotos, function (photo) {
      photo.removeEventListener('click', galleryPhotoClickHandler);
      photo.remove();
    });
  };

  // Получаем фотографии с сервера

  var getPhotos = function (response) {
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

  var dataLoadHandler = function (response) {
    getPhotos(response);
  };

  // Создаем сообщение об ошибке загрузки данных

  var showAdaptedErrorMessage = function (response) {
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

  var loadingErrorHandler = function (response) {
    showAdaptedErrorMessage(response);
  };

  // Посылаем запрос на сервер
  window.backend.load(dataLoadHandler, loadingErrorHandler);
})();
