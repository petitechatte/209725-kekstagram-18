// Модуль получения Data URL фотографии пользователя

'use strict';

(function () {
  // Допустимые форматы файла
  var IMAGE_FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

  // Сохраняем глобальные переменные в локальные для удобства чтения
  var photoPreview = window.formElements.photoPreview;
  var fileUpload = window.formElements.fileUpload;

  // Получаем файл пользователя

  var getUserPhoto = function () {
    var file = fileUpload.files[0];
    var fileName = file.name.toLowerCase();

    // Проверяем формат загруженного файла
    var matches = IMAGE_FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        // Подставляем новое изображение форму
        photoPreview.src = reader.result;
      });

      // Переводим файл в Data URL
      reader.readAsDataURL(file);
    }
  };

  // Добавляем обработчик загрузки файла

  fileUpload.addEventListener('change', function () {
    getUserPhoto();
  });
})();
