// Модуль валидации хэш-тегов

'use strict';

(function () {
  // Параметры валидации хештегов
  var MIN_HASHTAG_LENGTH = 2; // хеш-тег не может состоять только из одной решётки
  var MAX_HASHTAG_LENGTH = 20; // максимальная длина одного хэш-тега 20 символов, включая решётку
  var HASHTAGS_LIMIT = 5; // нельзя указать больше пяти хэш-тегов

  // Сохранение глобальных переменных в локальные для упрощения кода
  var uploadForm = window.popupElements.uploadForm;
  var hashtagInput = window.popupElements.hashtagInput;
  var submitFormButton = window.popupElements.submitFormButton;

  // Удаление пустых строк из массива

  var removeEmptyStrings = function (words) {
    var filteredWords = words.filter(function (word) {
      return word !== '';
    });
    return filteredWords;
  };

  // Валидация формы

  var validateHashtags = function () {
    // Убираем красную рамку
    hashtagInput.style.border = 'none';

    // Получаем значение поля
    var text = hashtagInput.value.toLowerCase(); // хэш-теги нечувствительны к регистру
    var hashtagSymbols = [];
    var errorMessage = '';

    if (text) {
      // Превращаем введенный текст в массив хэш-тегов
      var hashtags = text.split(' ');
      // Удаляем пустые строки, возникшие из-за лишних пробелов, для адекватного подсчета хэш-тегов
      hashtags = removeEmptyStrings(hashtags);

      if (hashtags.length > HASHTAGS_LIMIT) {
        errorMessage = 'Нельзя указывать больше пяти хэш-тегов';
      } else {
        hashtags.forEach(function (hashtag, i, words) {
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
            for (var j = i + 1; j < words.length; j++) {
              if (words[j] === words[i]) {
                errorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
              }
            }
          }
        });
      }
    }

    hashtagInput.setCustomValidity(errorMessage);
  };

  hashtagInput.addEventListener('input', function () {
    validateHashtags();
  });

  submitFormButton.addEventListener('click', function () {
    var invalidInput = uploadForm.querySelector('input:invalid');
    if (invalidInput) {
      invalidInput.style.border = '2px solid red';
    }
  });
})();
