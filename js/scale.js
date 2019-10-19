// Модуль редактирования размера изображения

'use strict';

(function () {
  // Параметры изменения масштаба фотографии
  var MIN_SCALE = 0; // минимальный масштаб фотографии
  var MAX_SCALE = 100; // максимальный масштаб фотогрфии
  var DEFAULT_SCALE = 100; // масштаб фотографии по умолчанию
  var SCALE_STEP = 25; // шаг изменения масштаба

  // Сохранение глобальных переменных в локальные для упрощения кода
  var imageEditForm = window.formElements.imageEditForm;
  var photoPreview = window.formElements.photoPreview;

  // Элементы управления масштабом
  var scaleValue = imageEditForm.querySelector('.scale__control--value');
  var scaleSmallerButton = imageEditForm.querySelector('.scale__control--smaller');
  var scaleBiggerButton = imageEditForm.querySelector('.scale__control--bigger');

  // Текущий масштаб фотографии
  var currentScale = DEFAULT_SCALE;

  // Устанавливаем масштаб
  var setScale = function () {
    if (currentScale >= MIN_SCALE && currentScale <= MAX_SCALE) {
      scaleValue.value = String(currentScale) + '%';
      photoPreview.style.transform = 'scale(' + String(currentScale / 100) + ')';
    } else if (currentScale < MIN_SCALE) {
      currentScale = MIN_SCALE;
    } else {
      currentScale = MAX_SCALE;
    }
  };

  // Уменьшаем масштаб

  scaleSmallerButton.addEventListener('click', function () {
    currentScale -= SCALE_STEP;
    setScale();
  });

  // Увеличиваем масштаб

  scaleBiggerButton.addEventListener('click', function () {
    currentScale += SCALE_STEP;
    setScale();
  });

  // Сбрасываем настройку масштаба до значения по умолчанию
  window.resetScale = function () {
    currentScale = DEFAULT_SCALE;
    setScale();
  };
})();
