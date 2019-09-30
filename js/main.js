'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEFAULT_SCALE = 100; // масштаб фотографии по умолчанию
  var DEFAULT_EFFECT_LEVEL = 100;

  // Моковые данные для фотографий и комментариев
  var MOCK_PICTURE_TITLES = [
    'Мое рабочее место',
    'Зажгли вчера с ребятами',
    'Идеальный завтрак',
    'Зацените свежий look!',
    'Две загорелые коленки на фоне моря',
    'Королева спортзала',
    'Потратила на ногти ползарплаты'
  ];
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 15;
  var MOCK_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTATORS = ['Каролина', 'Димон', 'Звезда Кестаграмма', 'Безымянный Качок', 'Эстет', 'Нелюбитель'];
  var MOCK_AVATARS_NUMBER = 6; // Число аватар-заглушек в папке
  var MOCK_PHOTOS_NUMBER = 25; // Число моковых объектов-фотографий

  var fileUpload = document.querySelector('#upload-file');
  var imageEditForm = document.querySelector('.img-upload__overlay');
  var uploadCloseButton = imageEditForm.querySelector('.img-upload__cancel');
  var photoPreview = imageEditForm.querySelector('.img-upload__preview');
  var effectController = imageEditForm.querySelector('.img-upload__effect-level');
  var filters = imageEditForm.querySelectorAll('.effects__radio');
  var checkedFilter;

  // Открытие формы обработки фотографии

  var fileUploadHandler = function () {
    imageEditForm.classList.remove('hidden');
    document.addEventListener('keydown', escPressHandler);
    // Прячем ползунок эффекта по умолчанию (отсутствие фильтра)
    effectController.classList.add('hidden');
    // Устанавливаем масштаб по умолчанию
    setScale();
  };

  // Закрытие формы обработки фотографии

  var closeButtonClickHandler = function () {
    imageEditForm.classList.add('hidden');
    document.removeEventListener('keydown', escPressHandler);
  };

  // Закрытие формы нажатием ESC

  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeButtonClickHandler();
      // сбрасываем значение поля для срабатывания change при повторной загрузке того же файла
      fileUpload.value = '';
    }
  };

  // Добавляем обработчики для открытия и закрытия формы

  fileUpload.addEventListener('change', fileUploadHandler);
  uploadCloseButton.addEventListener('click', closeButtonClickHandler);

  // Работа с размерами фотографии

  var scaleValue = imageEditForm.querySelector('.scale__control--value');
  var scaleSmallerButton = imageEditForm.querySelector('.scale__control--smaller');
  var scaleBiggerButton = imageEditForm.querySelector('.scale__control--bigger');
  var currentScale = DEFAULT_SCALE;

  // Устанавливаем масштаб

  var setScale = function () {
    if (currentScale >= 0 && currentScale <= 100) {
      scaleValue.value = String(currentScale) + '%';
      photoPreview.style.transform = 'scale(' + String(currentScale / 100) + ')';
    } else if (currentScale < 0) {
      currentScale = 0;
    } else {
      currentScale = 100;
    }
  };

  // Уменьшаем масштаб

  scaleSmallerButton.addEventListener('click', function () {
    currentScale -= 25;
    setScale();
  });

  // Увеличиваем масштаб

  scaleBiggerButton.addEventListener('click', function () {
    currentScale += 25;
    setScale();
  });

  // Отображение ползунка для регуляции эффекта

  var toggleEffectController = function (filter) {
    if (filter.value === 'none') {
      // Прячем ползунок эффекта при отсутствии фильтра
      effectController.classList.add('hidden');
    } else {
      // Показываем ползунок при выборе фильтра
      effectController.classList.remove('hidden');
    }
  };

  // Настройка эффектов

  var effectLevelInput = imageEditForm.querySelector('.effect-level__value');
  var effectLevelBar = imageEditForm.querySelector('.effect-level__depth');
  var effectLevelPin = imageEditForm.querySelector('.effect-level__pin');

  var setDefaultLevel = function () {
    effectLevelInput.value = String(DEFAULT_EFFECT_LEVEL);
    effectLevelBar.style.width = String(DEFAULT_EFFECT_LEVEL) + '%';
    effectLevelPin.style.left = String(DEFAULT_EFFECT_LEVEL) + '%';
  };

  // Переключаем фильтры

  var applyFilter = function (filter) {
    // Сбрасываем все фильтры
    photoPreview.className = 'img-upload__preview';
    // Приводим яркость в соответствие с ТЗ
    if (filter.value === 'phobos') {
      photoPreview.style.filter = 'blur(3px)';
    }
    // Накладываем новый фильтр
    photoPreview.classList.add('effects__preview--' + filter.value);
  };

  var toggleFilterHandler = function () {
    checkedFilter = imageEditForm.querySelector('.effects__radio:checked');
    toggleEffectController(checkedFilter);
    applyFilter(checkedFilter);
    setDefaultLevel();
  };

  // Добавляем обработчики на каждый фильтр

  for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('input', toggleFilterHandler);
  }

  // Находим в разметке шаблон для оформления фотографий пользователей

  var template = document.querySelector('#picture').content;

  // Выбираем случайное значение из массива

  var getRandomValue = function (valuesList) {
    var randomIndex = Math.floor(Math.random() * valuesList.length);
    return valuesList[randomIndex];
  };

  // Получаем случайное значение из диапазона

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Создаем массив URL для картинок

  var generatePicturesUrl = function (picturesNumber, fileName, fileExtension) {
    var pictures = [];
    var url = '';

    for (var i = 1; i <= picturesNumber; i++) {
      url = fileName + String(i) + fileExtension;
      pictures.push(url);
    }

    return pictures;
  };

  // Создаем массив моковых аватарок
  var avatars = generatePicturesUrl(MOCK_AVATARS_NUMBER, 'img/avatar-', '.svg');

  // Создаем массив моковых фотографий
  var userPhotos = generatePicturesUrl(MOCK_PHOTOS_NUMBER, 'photos/', '.jpg');

  // Создаем случайный моковый комментарий

  var generateComment = function () {
    var randomComment = {
      avatar: getRandomValue(avatars),
      message: getRandomValue(MOCK_COMMENTS),
      name: getRandomValue(COMMENTATORS)
    };

    return randomComment;
  };

  // Создаем список комментариев к посту

  var generateCommentsList = function () {
    // Получаем случайное количество комментариев к посту
    var commentsNumber = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
    var photoComments = [];

    for (var i = 0; i < commentsNumber; i++) {
      photoComments.push(generateComment());
    }
    return photoComments;
  };

  // Собираем пост со случайными комментариями

  var generatePost = function (index) {
    var post = {
      url: userPhotos[index],
      description: getRandomValue(MOCK_PICTURE_TITLES),
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateCommentsList()
    };

    return post;
  };

  // Собираем массив постов

  var generatePostsList = function () {
    var posts = [];

    for (var i = 0; i < MOCK_PHOTOS_NUMBER; i++) {
      posts.push(generatePost(i));
    }

    return posts;
  };

  var photoPosts = generatePostsList();

  // Создаем разметку для поста с фотографией

  var createPhotoCard = function (index) {
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

  var renderPhotos = function () {
    var picturesBlock = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MOCK_PHOTOS_NUMBER; i++) {
      fragment.appendChild(createPhotoCard(i));
    }

    picturesBlock.appendChild(fragment);
  };

  renderPhotos();
})();
