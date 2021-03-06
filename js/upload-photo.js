// Модуль работы окна загрузки фотографии

'use strict';

(function () {
  // Сохранение глобальных переменных в локальные для упрощения кода
  var mainElement = window.utils.mainElement;
  var uploadForm = window.popupElements.uploadForm;
  var fileUpload = window.popupElements.fileUpload;
  var imageEditForm = window.popupElements.imageEditForm;
  var uploadCloseButton = window.popupElements.uploadCloseButton;
  var noEffectInput = window.popupElements.noEffectInput;
  var hashtagInput = window.popupElements.hashtagInput;
  var descriptionInput = window.popupElements.descriptionInput;

  // Создаем флаги открытия модальных окон
  var isUploadPopupOpen = false;
  var isSuccessPopupOpen = false;
  var isErrorPopupOpen = false;

  // Создаем переменные для хранения элементов модального окна
  var popup;
  var popupContainer;
  var popupCloseButtons;
  var popupName;

  // Создаем окно сообщения об успешной загрузке

  var createSuccessPopup = function () {
    var successTemplate = document.querySelector('#success').content;
    var fragment = successTemplate.cloneNode(true);
    mainElement.appendChild(fragment);

    // Переключаем флаг
    isSuccessPopupOpen = true;

    // Добавляем возможность закрыть окно разными способами
    providePopupClosing();
  };

  // Удаляем окно с сообщением

  var removePopup = function () {
    // Удаляем обработчики
    [].forEach.call(popupCloseButtons, function (button) {
      button.removeEventListener('click', popupCloseButtonClickHandler);
    });
    popup.removeEventListener('click', popupClickHandler);
    document.removeEventListener('keydown', documentKeydownHandler);

    // Удаляем окно
    popup.remove();

    // Переключаем флаг
    if (isSuccessPopupOpen) {
      isSuccessPopupOpen = false;
    } else if (isErrorPopupOpen) {
      isErrorPopupOpen = false;
    }
  };

  // Удаление окна по клику на кнопке

  var popupCloseButtonClickHandler = function () {
    removePopup();
  };

  // Удаление окна по клику на произвольной области

  var popupClickHandler = function (evt) {
    if (evt.target !== popupContainer) {
      removePopup();
    }
  };

  // Обеспечиваем закрытие окна с сообщением

  var providePopupClosing = function () {
    if (isSuccessPopupOpen) {
      popupName = 'success';
    } else if (isErrorPopupOpen) {
      popupName = 'error';
    }

    // Находим элементы окна
    popup = mainElement.querySelector('section.' + popupName);
    popupContainer = popup.querySelector('.' + popupName + '__inner');
    popupCloseButtons = popup.querySelectorAll('.' + popupName + '__button');

    // Добавляем фокус кнопке закрытия сообщения об успешной загрузке
    if (isSuccessPopupOpen) {
      popupCloseButtons[0].focus();
    }

    // Добавляем обработчики событий
    [].forEach.call(popupCloseButtons, function (button) {
      button.addEventListener('click', popupCloseButtonClickHandler);
    });
    popup.addEventListener('click', popupClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
  };

  // Закрытие модальных окон по нажатию Esc

  var documentKeydownHandler = function (evt) {
    if (isUploadPopupOpen) {
      window.utils.isEscEvent(evt, window.closeUploadForm);
    } else if (isSuccessPopupOpen || isErrorPopupOpen) {
      window.utils.isEscEvent(evt, removePopup);
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
    document.addEventListener('keydown', documentKeydownHandler);
    // Сбрасываем фильтр по умолчанию
    noEffectInput.checked = 'checked';
    window.toggleFilter();
    // Устанавливаем масштаб по умолчанию
    window.scale.reset();
    // Показываем окно
    imageEditForm.classList.remove('hidden');
  };

  // Закрытие формы обработки фотографии

  window.closeUploadForm = function () {
    // Переключаем флаг
    isUploadPopupOpen = false;
    imageEditForm.classList.add('hidden');
    document.removeEventListener('keydown', documentKeydownHandler);
    // Сбрасываем значения полей формы
    fileUpload.value = '';
    hashtagInput.value = '';
    descriptionInput.value = '';
    // Убираем красную рамку и сообщение о невалидности поля
    hashtagInput.style.border = 'none';
    hashtagInput.setCustomValidity('');
  };

  // Добавляем обработчики для открытия и закрытия формы

  fileUpload.addEventListener('change', function () {
    openUploadForm();
  });

  uploadCloseButton.addEventListener('click', function () {
    window.closeUploadForm();
  });

  // Подтверждаем отправку формы

  var formuUloadHandler = function () {
    // Закрываем окно с формой
    window.closeUploadForm();
    // Показываем окно с сообщением об успешной загрузке
    createSuccessPopup();
  };

  // Реагируем на ошибку загрузки
  var uploadErrorHandler = function () {
    // Закрываем окно с формой
    window.closeUploadForm();
    // Показываем сообщение об ошибке
    window.backend.showErrorMessage();
    // Переключаем флаг
    isErrorPopupOpen = true;
    // Обеспечиваем закрытие окна с ошибкой
    providePopupClosing();
  };

  // Отправляем форму асинхронно на сервер

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), formuUloadHandler, uploadErrorHandler);
  });
})();
