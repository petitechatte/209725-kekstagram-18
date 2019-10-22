// Модуль работы окна загрузки фотографии

'use strict';

(function () {
  // Сохранение глобальных переменных в локальные для упрощения кода
  var fileUpload = window.formElements.fileUpload;
  var imageEditForm = window.formElements.imageEditForm;
  var uploadCloseButton = window.formElements.uploadCloseButton;
  var noEffectInput = window.formElements.noEffectInput;
  var hashtagInput = window.formElements.hashtagInput;
  var descriptionInput = window.formElements.descriptionInput;

  // Закрытие окна загрузки файла по нажатию Esc

  var uploadPopupEscKeydownHandler = function (evt) {
    window.utils.isEscEvent(evt, window.closeUploadForm);
  };

  // Потеря фокуса текстовыми полями при нажатии ESC

  var createFieldEscListener = function (field) {
    field.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, function () {
        evt.stopPropagation();
        evt.target.blur();
      });
    });
  };

  createFieldEscListener(hashtagInput);
  createFieldEscListener(descriptionInput);

  // Открытие формы обработки фотографии

  var openUploadForm = function () {
    // Добавляем обработчик нажатия Esc
    document.addEventListener('keydown', uploadPopupEscKeydownHandler);
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
    document.removeEventListener('keydown', uploadPopupEscKeydownHandler);
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
})();
