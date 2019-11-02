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

  // Создаем флаги открытия модальных окон
  var isUploadPopupOpen = false;
  var isSuccessPopupOpen = false;

  // Создаем переменные для хранения элементов модального окна
  var successPopup;
  var successPopupContainer;
  var successPopupCloseButton;

  // Создаем окно сообщения об успешной загрузке

  var creatSuccessPopup = function () {
    var successTemplate = document.querySelector('#success').content;
    var fragment = successTemplate.cloneNode(true);
    mainElement.appendChild(fragment);
    // Переключаем флаг
    isSuccessPopupOpen = true;
    // Добавляем возможность закрыть окно разными способами
    provideClosure();
  };

  // Удаляем окно
  var removeSuccessPopup = function () {
    // Удаляем обработчики
    successPopupCloseButton.removeEventListener('click', successPopupCloseButtonClickHandler);
    successPopup.removeEventListener('click', successPopupClickHandler);
    document.removeEventListener('keydown', documentEscKeydownHandler);
    // Удаляем окно
    successPopup.remove();
    // Переключаем флаг
    isSuccessPopupOpen = false;
  };

  var successPopupClickHandler = function (evt) {
    if (evt.target !== successPopupContainer) {
      removeSuccessPopup();
    }
  };

  var successPopupCloseButtonClickHandler = function () {
    removeSuccessPopup();
  };

  // Обеспечиваем закрытие по клику окна сообщения об успешной загрузке

  var provideClosure = function () {
    successPopup = mainElement.querySelector('section.success');
    successPopupContainer = successPopup.querySelector('.success__inner');
    successPopupCloseButton = successPopup.querySelector('.success__button');

    // Добавляем фокус кнопке закрытия
    successPopupCloseButton.focus();

    // Добавляем обработчики событий
    successPopupCloseButton.addEventListener('click', successPopupCloseButtonClickHandler);
    successPopup.addEventListener('click', successPopupClickHandler);
    document.addEventListener('keydown', documentEscKeydownHandler);
  };

  // Закрытие модального окна по нажатию Esc

  var documentEscKeydownHandler = function (evt) {
    if (isUploadPopupOpen) {
      window.utils.isEscEvent(evt, window.closeUploadForm);
    } else if (isSuccessPopupOpen) {
      window.utils.isEscEvent(evt, removeSuccessPopup);
    }
  };

  // Потеря фокуса полями ввода по нажатию Esc

  window.utils.createFieldEscListener(hashtagInput);
  window.utils.createFieldEscListener(descriptionInput);

  // Открытие формы обработки фотографии

  var openUploadForm = function () {
    // Переключаем флаг
    isUploadPopupOpen = true;
    // Добавляем обработчик нажатия Esc
    document.addEventListener('keydown', documentEscKeydownHandler);
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
    // Переключаем флаг
    isUploadPopupOpen = false;
    imageEditForm.classList.add('hidden');
    document.removeEventListener('keydown', documentEscKeydownHandler);
    // Сбрасываем значения полей формы
    fileUpload.value = '';
    hashtagInput.value = '';
    descriptionInput.value = '';
  };

  // Добавляем обработчики для открытия и закрытия формы

  fileUpload.addEventListener('change', function () {
    openUploadForm();
  });

  uploadCloseButton.addEventListener('click', function () {
    window.closeUploadForm();
  });

  // Подтверждаем отправку формы

  var confirmFormSubmit = function () {
    // Закрываем окно с формой
    window.closeUploadForm();
    // Показываем окно с сообщением об успешной загрузке
    creatSuccessPopup();
  };

  // Реагируем на ошибку загрузки
  var onSubmitErrorCallback = function () {
    // Закрываем окно с формой
    window.closeUploadForm();
    // Показываем сообщение об ошибке
    window.backend.showErrorMessage();
  };

  // Отправляем форму асинхронно на сервер

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), confirmFormSubmit, onSubmitErrorCallback);
  });
})();
