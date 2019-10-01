'use strict';

(function () {
  var ESC_KEYCODE = 27;

  // Параметры настройки фотографии
  var MIN_SCALE = 0; // минимальный масштаб фотографии
  var MAX_SCALE = 100; // максимальный масштаб фотогрфии
  var DEFAULT_SCALE = 100; // масштаб фотографии по умолчанию
  var SCALE_STEP = 25; // шаг изменения масштаба
  var DEFAULT_EFFECT_LEVEL = 100; // уровень эффекта при переключении фильтра
  var MAX_BLUR = 3; // максимальный эффект размытия в пикселях
  var MAX_BRIGHTNESS = 3; // максимальная яркость фотографии
  var MIN_BRIGHTNESS = 1; // минимальная яркость фотографии

  // Параметры валидации хештегов
  var MIN_HASHTAG_LENGTH = 2; // хеш-тег не может состоять только из одной решётки
  var MAX_HASHTAG_LENGTH = 20; // максимальная длина одного хэш-тега 20 символов, включая решётку
  var HASHTAGS_LIMIT = 5; // нельзя указать больше пяти хэш-тегов

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

  var uploadForm = document.querySelector('#upload-select-image');
  var fileUpload = uploadForm.querySelector('#upload-file');
  var imageEditForm = uploadForm.querySelector('.img-upload__overlay');
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
    if (currentScale >= MIN_SCALE && currentScale <= MAX_SCALE) {
      scaleValue.value = String(currentScale) + '%';
      photoPreview.style.transform = 'scale(' + String(currentScale / 100) + ')';
    } else if (currentScale < MIN_SCALE) {
      currentScale = MIN_SCALE;
    } else {
      currentScale = MAX_SCALE;
    }
  };

  // Уменьшаем масштаб

  scaleSmallerButton.addEventListener('click', function () {
    currentScale -= SCALE_STEP;
    setScale();
  });

  // Увеличиваем масштаб

  scaleBiggerButton.addEventListener('click', function () {
    currentScale += SCALE_STEP;
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

  var effectLevelInput = effectController.querySelector('.effect-level__value');
  var effectLevelLine = effectController.querySelector('.effect-level__line');
  var effectLevelBar = effectController.querySelector('.effect-level__depth');
  var effectLevelPin = effectController.querySelector('.effect-level__pin');

  // Устанавливаем уровень эффекта

  var setEffectLevel = function (level) {
    effectLevelInput.value = String(level);
    effectLevelBar.style.width = String(level) + '%';
    effectLevelPin.style.left = String(level) + '%';
  };

  // Определяем текущий фильтр

  var getCurrentFilter = function () {
    return imageEditForm.querySelector('.effects__radio:checked');
  };

  // Настраиваем интенсивность фильтра в соответсвии с выбранным уровнем

  var tuneEffect = function (filter, level) {
    if (filter.value === 'chrome') {
      photoPreview.style.filter = 'grayscale(' + String(level / 100) + ')';
    } else if (filter.value === 'sepia') {
      photoPreview.style.filter = 'sepia(' + String(level / 100) + ')';
    } else if (filter.value === 'marvin') {
      photoPreview.style.filter = 'invert(' + String(level) + '%)';
    } else if (filter.value === 'phobos') {
      photoPreview.style.filter = 'blur(' + String(level / 100 * MAX_BLUR) + 'px)';
    } else if (filter.value === 'heat') {
      photoPreview.style.filter = 'brightness(' + String(MIN_BRIGHTNESS + level / 100 * (MAX_BRIGHTNESS - MIN_BRIGHTNESS)) + ')';
    } else {
      photoPreview.style.filter = 'none';
    }
  };

  // Реализуем переключение фильтров по клику

  var toggleFilterHandler = function () {
    toggleEffectController(getCurrentFilter());
    setEffectLevel(DEFAULT_EFFECT_LEVEL);
    tuneEffect(getCurrentFilter(), DEFAULT_EFFECT_LEVEL);
  };

  // Добавляем обработчики на каждый фильтр

  for (var filterIndex = 0; filterIndex < filters.length; filterIndex++) {
    filters[filterIndex].addEventListener('input', toggleFilterHandler);
  }

  // Применяем эффект после установки ползунка

  var effectPinMouseUpHandler = function () {
    // Рассчитываем положение ползунка в процентах
    var effectLevel = Math.round((effectLevelPin.offsetLeft / effectLevelLine.offsetWidth) * 100);
    checkedFilter = imageEditForm.querySelector('.effects__radio:checked');
    setEffectLevel(effectLevel);
    tuneEffect(checkedFilter, effectLevel);
  };

  effectLevelPin.addEventListener('mouseup', effectPinMouseUpHandler);

  // Валидация формы

  var hashtagInput = imageEditForm.querySelector('.text__hashtags');
  var descriptionInput = imageEditForm.querySelector('.text__description');

  // Потеря фокуса полем при нажатии ESC

  var inputEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
      var target = evt.target;
      target.blur();
    }
  };

  hashtagInput.addEventListener('keydown', inputEscPressHandler);
  descriptionInput.addEventListener('keydown', inputEscPressHandler);

  // Валидация хештегов

  var validateHashtags = function () {
    var text = hashtagInput.value;

    if (text) {
      var hashtags = text.split(' ');
      var hashtag = '';

      for (var i = 0; i < hashtags.length; i++) {
        hashtag = hashtags[i].toLowerCase(); // теги нечувствительны к регистру
        if (hashtag.indexOf('#') !== 0) {
          hashtagInput.setCustomValidity('Хэш-тег должен начинаться с символа #');
        } else if (hashtag.length < MIN_HASHTAG_LENGTH) {
          hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
          hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else {
          hashtagInput.setCustomValidity('');
        }
      }

      if (hashtags.length > HASHTAGS_LIMIT) {
        hashtagInput.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
      }

    } else {
      hashtagInput.setCustomValidity('');
    }
  };

  hashtagInput.addEventListener('input', validateHashtags);

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    uploadForm.submit();
  });

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
