// Модуль редактирования размера изображения

'use strict';

(function () {
  // Параметры изменения масштаба фотографии
  var MIN_SCALE = 0; // минимальный масштаб фотографии
  var MAX_SCALE = 100; // максимальный масштаб фотогрфии
  var DEFAULT_SCALE = 100; // масштаб фотографии по умолчанию
  var SCALE_STEP = 25; // шаг изменения масштаба

  var scaleValue = window.formElements.imageEditForm.querySelector('.scale__control--value');
  var scaleSmallerButton = window.formElements.imageEditForm.querySelector('.scale__control--smaller');
  var scaleBiggerButton = window.formElements.imageEditForm.querySelector('.scale__control--bigger');
  var currentScale = DEFAULT_SCALE;

  // Устанавливаем масштаб

  window.setScale = function () {
    if (currentScale >= MIN_SCALE && currentScale <= MAX_SCALE) {
      scaleValue.value = String(currentScale) + '%';
      window.formElements.photoPreview.style.transform = 'scale(' + String(currentScale / 100) + ')';
    } else if (currentScale < MIN_SCALE) {
      currentScale = MIN_SCALE;
    } else {
      currentScale = MAX_SCALE;
    }
  };

  // Уменьшаем масштаб

  scaleSmallerButton.addEventListener('click', function () {
    currentScale -= SCALE_STEP;
    window.setScale();
  });

  // Увеличиваем масштаб

  scaleBiggerButton.addEventListener('click', function () {
    currentScale += SCALE_STEP;
    window.setScale();
  });
})();
