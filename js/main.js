'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  var fileUpload = window.formElements.uploadForm.querySelector('#upload-file');
  var uploadCloseButton = window.formElements.imageEditForm.querySelector('.img-upload__cancel');
  var noEffectInput = window.formElements.imageEditForm.querySelector('#effect-none');
  var descriptionInput = window.formElements.imageEditForm.querySelector('.text__description');

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

  // Потеря фокуса текстовыми полями при нажатии ESC

  window.formElements.hashtagInput.addEventListener('keydown', escKeydownHandler);
  descriptionInput.addEventListener('keydown', escKeydownHandler);
})();
