// Модуль работы окна загрузки фотографии

'use strict';

(function () {
  // Сохранение глобальных переменных в локальные для упрощения кода
  var mainElement = window.utils.mainElement;
  var uploadForm = window.formElements.uploadForm;
  var fileUpload = window.formElements.fileUpload;
  var imageEditForm = window.formElements.imageEditForm;
  var uploadCloseButton = window.formElements.uploadCloseButton;
  var noEffectInput = window.formElements.noEffectInput;
  var hashtagInput = window.formElements.hashtagInput;
  var descriptionInput = window.formElements.descriptionInput;

  // Создаем окно сообщения об успешной загрузке

  var creatSuccessPopup = function () {
    var successTemplate = document.querySelector('#success').content;
    var fragment = successTemplate.cloneNode(true);
    mainElement.appendChild(fragment);
  };

  // Закрытие окна загрузки файла по нажатию Esc

  var windowEscKeydownHandler = function (evt) {
    window.utils.isEscEvent(evt, window.closeUploadForm);
  };

  // Потеря фокуса полями ввода по нажатию Esc

  window.utils.createFieldEscListener(hashtagInput);
  window.utils.createFieldEscListener(descriptionInput);

  // Открытие формы обработки фотографии

  var openUploadForm = function () {
    // Добавляем обработчик нажатия Esc
    document.addEventListener('keydown', windowEscKeydownHandler);
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
    document.removeEventListener('keydown', windowEscKeydownHandler);
    // Сбрасываем значения полей формы
    fileUpload.value = '';
    hashtagInput.value = '';
    descriptionInput.value = '';
  };

  // Подтверждаем отправку формы

  var confirmFormSubmit = function () {
    // Закрываем окно с формой
    window.closeUploadForm();
    // Показываем окно с сообщением об успешной загрузке
    creatSuccessPopup();
  };

  // Добавляем обработчики для открытия и закрытия формы

  fileUpload.addEventListener('change', function () {
    openUploadForm();
  });

  uploadCloseButton.addEventListener('click', function () {
    window.closeUploadForm();
  });

  // Отправляем форму асинхронно на сервер

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), confirmFormSubmit);
  });
})();
