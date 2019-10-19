// Модуль работы окна загрузки фотографии

'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  // Сохранение глобальных переменных в локальные для упрощения кода
  var uploadForm = window.formElements.uploadForm;
  var imageEditForm = window.formElements.imageEditForm;
  var hashtagInput = window.formElements.hashtagInput;

  // Элементы окна формы
  var fileUpload = uploadForm.querySelector('#upload-file');
  var uploadCloseButton = imageEditForm.querySelector('.img-upload__cancel');
  var noEffectInput = imageEditForm.querySelector('#effect-none');
  var descriptionInput = imageEditForm.querySelector('.text__description');

  // Открытие формы обработки фотографии

  var openUploadForm = function () {
    // Добавляем обработчик нажатия Esc
    document.addEventListener('keydown', escKeydownHandler);
    // Сбрасываем фильтр по умолчанию
    noEffectInput.checked = 'checked';
    window.toggleFilter();
    // Устанавливаем масштаб по умолчанию
    window.scale.resetScale();
    // Показываем окно
    imageEditForm.classList.remove('hidden');
  };

  // Закрытие формы обработки фотографии

  var closeUploadForm = function () {
    imageEditForm.classList.add('hidden');
    document.removeEventListener('keydown', escKeydownHandler);
    // сбрасываем значение поля для срабатывания change при повторной загрузке того же файла
    fileUpload.value = '';
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

  // Потеря фокуса текстовыми полями при нажатии ESC

  hashtagInput.addEventListener('keydown', escKeydownHandler);
  descriptionInput.addEventListener('keydown', escKeydownHandler);
})();
