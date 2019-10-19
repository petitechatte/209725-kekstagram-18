// Модуль работы окна загрузки фотографии

'use strict';

(function () {
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
    document.addEventListener('keydown', window.utils.escKeydownHandler);
    // Сбрасываем фильтр по умолчанию
    noEffectInput.checked = 'checked';
    window.toggleFilter();
    // Устанавливаем масштаб по умолчанию
    window.scale.resetScale();
    // Показываем окно
    imageEditForm.classList.remove('hidden');
  };

  // Закрытие формы обработки фотографии

  window.closeUploadForm = function () {
    imageEditForm.classList.add('hidden');
    document.removeEventListener('keydown', window.utils.escKeydownHandler);
    // сбрасываем значение поля для срабатывания change при повторной загрузке того же файла
    fileUpload.value = '';
  };

  // Добавляем обработчики для открытия и закрытия формы

  fileUpload.addEventListener('change', function () {
    openUploadForm();
  });

  uploadCloseButton.addEventListener('click', function () {
    window.closeUploadForm();
  });

  // Потеря фокуса текстовыми полями при нажатии ESC

  hashtagInput.addEventListener('keydown', window.utils.escKeydownHandler);
  descriptionInput.addEventListener('keydown', window.utils.escKeydownHandler);
})();
