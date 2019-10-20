// Модуль добавления галереи фотографий на страницу

'use strict';

(function () {
  // Находим контейнер для размещения фотографий
  var picturesBlock = document.querySelector('.pictures');
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
    var fragment = document.createDocumentFragment();

    // Страхуемся от неправильного формата данных с сервера
    try {
      // Создаем фотографии для галлереи
      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(createPhotoCard(data, i));
      }
      picturesBlock.appendChild(fragment);
      // Добавляем обработчики на фотографии в галерее
      var photoPreview = picturesBlock.querySelector('.picture');
      photoPreview.addEventListener('click', function () {
        window.showFullViewPopup(data);
      });
    } catch (err) {
      showAdaptedErrorMessage(err.message);
    }
  };

  // Удаляем фотографии
  var removePhotos = function () {
    // Собираем список текущих фотографий
    var galleryPhotos = picturesBlock.querySelectorAll('.picture');
    if (galleryPhotos.length > 0) {
      galleryPhotos.forEach(function (photo) {
        photo.remove();
      });
    }
  };

  // Получаем фотографии с сервера

  var getPhotos = function (response) {
    renderPhotos(response);
    // Показываем фильтры для сортировки
    window.activateSortingFilters();

    // Экспортируем данные для сортировки
    window.gallery = {
      // Сохраняем исходный массив данных после загрузки
      initialData: response,
      // Обновляем фотогаллерею
      updatePhotos: function (data) {
        // Удаляем старые фотографии из галереи
        removePhotos();
        // Добавляем в галерею новые фотографии из массива данных
        renderPhotos(data);
      }
    };
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

  // Посылаем запрос на сервер
  window.backend.load(getPhotos, showAdaptedErrorMessage);
})();
