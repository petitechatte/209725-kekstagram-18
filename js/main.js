'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  // Параметры валидации хештегов
  var MIN_HASHTAG_LENGTH = 2; // хеш-тег не может состоять только из одной решётки
  var MAX_HASHTAG_LENGTH = 20; // максимальная длина одного хэш-тега 20 символов, включая решётку
  var HASHTAGS_LIMIT = 5; // нельзя указать больше пяти хэш-тегов

  var fileUpload = window.formElements.uploadForm.querySelector('#upload-file');
  var uploadCloseButton = window.formElements.imageEditForm.querySelector('.img-upload__cancel');
  var noEffectInput = window.formElements.imageEditForm.querySelector('#effect-none');

  // Открытие формы обработки фотографии

  var openUploadForm = function () {
    // Добавляем обработчик нажатия Esc
    document.addEventListener('keydown', escKeydownHandler);
    // Сбрасываем фильтр по умолчанию
    noEffectInput.checked = 'checked';
    window.toggleFilter();
    // Устанавливаем масштаб по умолчанию
    window.resetScale();
    // Показываем окно
    window.formElements.imageEditForm.classList.remove('hidden');
  };

  // Закрытие формы обработки фотографии

  var closeUploadForm = function () {
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
        closeUploadForm();
        // сбрасываем значение поля для срабатывания change при повторной загрузке того же файла
        fileUpload.value = '';
      }
    }
  };

  // Добавляем обработчики для открытия и закрытия формы

  fileUpload.addEventListener('change', function () {
    openUploadForm();
  });

  uploadCloseButton.addEventListener('click', function () {
    closeUploadForm();
  });

  // Валидация формы

  var hashtagInput = window.formElements.imageEditForm.querySelector('.text__hashtags');
  var descriptionInput = window.formElements.imageEditForm.querySelector('.text__description');

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
