// Модуль валидации хэш-тегов

'use strict';

(function () {
  // Параметры валидации хештегов
  var MIN_HASHTAG_LENGTH = 2; // хеш-тег не может состоять только из одной решётки
  var MAX_HASHTAG_LENGTH = 20; // максимальная длина одного хэш-тега 20 символов, включая решётку
  var HASHTAGS_LIMIT = 5; // нельзя указать больше пяти хэш-тегов

  // Удаление пустых строк из массива

  var removeExtraSpaces = function (words) {
    for (var k = 0; k < words.length; k++) {
      if (words[k] === '') {
        words.splice(k, 1);
        removeExtraSpaces(words);
      }
    }
  };

  // Валидация формы

  var validateHashtags = function () {
    // Получаем значение поля
    var text = window.formElements.hashtagInput.value.toLowerCase(); // хэш-теги нечувствительны к регистру
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

    window.formElements.hashtagInput.setCustomValidity(errorMessage);
  };

  window.formElements.hashtagInput.addEventListener('input', function () {
    validateHashtags();
  });
})();
