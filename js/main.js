'use strict';

(function () {
  var ESC_KEY_CODE = 27;

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

  var fileUpload = window.formElements.uploadForm.querySelector('#upload-file');
  var uploadCloseButton = window.formElements.imageEditForm.querySelector('.img-upload__cancel');
  var filters = window.formElements.imageEditForm.querySelectorAll('.effects__radio');

  // Открытие формы обработки фотографии

  var fileUploadHandler = function () {
    window.formElements.imageEditForm.classList.remove('hidden');
    document.addEventListener('keydown', escKeydownHandler);
    // Прячем ползунок эффекта по умолчанию (отсутствие фильтра)
    window.formElements.effectController.classList.add('hidden');
    // Устанавливаем масштаб по умолчанию
    setScale();
  };

  // Закрытие формы обработки фотографии

  var closeButtonClickHandler = function () {
    window.formElements.imageEditForm.classList.add('hidden');
    document.removeEventListener('keydown', escKeydownHandler);
  };

  // Обработка нажатия ESC

  var escKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      if (evt.target.classList.contains('text__hashtags') || evt.target.tagName === 'TEXTAREA') {
        // Потеря фокуса текстовым полем при нажатии ESC
        evt.stopPropagation();
        evt.target.blur();
      } else {
        // Закрытие формы
        closeButtonClickHandler();
        // сбрасываем значение поля для срабатывания change при повторной загрузке того же файла
        fileUpload.value = '';
      }
    }
  };

  // Добавляем обработчики для открытия и закрытия формы

  fileUpload.addEventListener('change', fileUploadHandler);
  uploadCloseButton.addEventListener('click', closeButtonClickHandler);

  // Работа с размерами фотографии

  var scaleValue = window.formElements.imageEditForm.querySelector('.scale__control--value');
  var scaleSmallerButton = window.formElements.imageEditForm.querySelector('.scale__control--smaller');
  var scaleBiggerButton = window.formElements.imageEditForm.querySelector('.scale__control--bigger');
  var currentScale = DEFAULT_SCALE;

  // Устанавливаем масштаб

  var setScale = function () {
    if (currentScale >= MIN_SCALE && currentScale <= MAX_SCALE) {
      scaleValue.value = String(currentScale) + '%';
      window.formElements.photoPreview.style.transform = 'scale(' + String(currentScale / 100) + ')';
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
      window.formElements.effectController.classList.add('hidden');
    } else {
      // Показываем ползунок при выборе фильтра
      window.formElements.effectController.classList.remove('hidden');
    }
  };

  // Настройка эффектов

  var effectLevelInput = window.formElements.effectController.querySelector('.effect-level__value');
  var effectLevelLine = window.formElements.effectController.querySelector('.effect-level__line');
  var effectLevelBar = window.formElements.effectController.querySelector('.effect-level__depth');
  var effectLevelPin = window.formElements.effectController.querySelector('.effect-level__pin');

  // Устанавливаем уровень эффекта

  var setEffectLevel = function (level) {
    effectLevelInput.value = String(level);
    effectLevelBar.style.width = String(level) + '%';
    effectLevelPin.style.left = String(level) + '%';
  };

  // Определяем текущий фильтр

  var getCurrentFilter = function () {
    return window.formElements.imageEditForm.querySelector('.effects__radio:checked');
  };

  // Настраиваем интенсивность фильтра в соответствии с выбранным уровнем

  var tuneEffect = function (filter, level) {
    var filterEffect = '';

    switch (filter.value) {
      case 'chrome':
        filterEffect = 'grayscale(' + String(level / 100) + ')';
        break;

      case 'sepia':
        filterEffect = 'sepia(' + String(level / 100) + ')';
        break;

      case 'marvin':
        filterEffect = 'invert(' + String(level) + '%)';
        break;

      case 'phobos':
        filterEffect = 'blur(' + String(level / 100 * MAX_BLUR) + 'px)';
        break;

      case 'heat':
        filterEffect = 'brightness(' + String(MIN_BRIGHTNESS + level / 100 * (MAX_BRIGHTNESS - MIN_BRIGHTNESS)) + ')';
        break;

      default:
        filterEffect = 'none';
    }

    window.formElements.photoPreview.style.filter = filterEffect;
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
    setEffectLevel(effectLevel);
    tuneEffect(getCurrentFilter(), effectLevel);
  };

  effectLevelPin.addEventListener('mouseup', effectPinMouseUpHandler);

  // Валидация формы

  var hashtagInput = window.formElementsimageEditForm.querySelector('.text__hashtags');
  var descriptionInput = window.formElementsimageEditForm.querySelector('.text__description');

  // Потеря фокуса текстовым полем при нажатии ESC

  hashtagInput.addEventListener('keydown', escKeydownHandler);
  descriptionInput.addEventListener('keydown', escKeydownHandler);

  // Удаление пустых строк из массива

  var removeExtraSpaces = function (words) {
    for (var k = 0; k < words.length; k++) {
      if (words[k] === '') {
        words.splice(k, 1);
        removeExtraSpaces(words);
      }
    }
  };

  // Валидация хэш-тегов

  var validateHashtags = function () {
    // Получаем значение поля
    var text = hashtagInput.value.toLowerCase(); // хэш-теги нечувствительны к регистру
    var hashtag = '';
    var hashtagSymbols = [];
    var errorMessage = '';

    if (text) {
      // Превращаем введенный текст в массив хэш-тегов
      var hashtags = text.split(' ');
      // Удаляем лишние пробелы для адекватного подсчета хэш-тегов
      removeExtraSpaces(hashtags);

      if (hashtags.length > HASHTAGS_LIMIT) {
        errorMessage = 'Нельзя указывать больше пяти хэш-тегов';
      } else {
        for (var i = 0; i < hashtags.length; i++) {
          hashtag = hashtags[i];
          hashtagSymbols = hashtag.split('#');

          if (hashtagSymbols.length > 2) {
            errorMessage = 'Хэш-теги должны разделяться пробелами';
          } else if (hashtag.indexOf('#') !== 0) {
            errorMessage = 'Хэш-тег должен начинаться с символа #';
          } else if (hashtag.length < MIN_HASHTAG_LENGTH) {
            errorMessage = 'Хеш-тег не может состоять только из одной решётки';
          } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
            errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
          } else {
            for (var j = i + 1; j < hashtags.length; j++) {
              if (hashtags[j] === hashtags[i]) {
                errorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
              }
            }
          }
        }
      }
    }

    hashtagInput.setCustomValidity(errorMessage);
  };

  hashtagInput.addEventListener('input', function () {
    validateHashtags();
  });
})();
