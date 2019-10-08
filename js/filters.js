// Модуль работы с фотофильтрами

'use strict';

(function () {
  // Параметры настройки эффектов фотографии
  var DEFAULT_EFFECT_LEVEL = 100; // уровень эффекта при переключении фильтра
  var MAX_BLUR = 3; // максимальный эффект размытия в пикселях
  var MAX_BRIGHTNESS = 3; // максимальная яркость фотографии
  var MIN_BRIGHTNESS = 1; // минимальная яркость фотографии

  // Элементы управления эффектами
  var effectLevelInput = window.formElements.effectController.querySelector('.effect-level__value');
  var effectLevelLine = window.formElements.effectController.querySelector('.effect-level__line');
  var effectLevelBar = window.formElements.effectController.querySelector('.effect-level__depth');
  var effectLevelPin = window.formElements.effectController.querySelector('.effect-level__pin');
  var filters = window.formElements.imageEditForm.querySelectorAll('.effects__radio');

  // Отображение ползунка для регуляции эффекта

  var toggleEffectController = function (filter) {
    if (filter.value === 'none') {
      // Прячем ползунок эффекта при отсутствии фильтра
      window.formElements.effectController.classList.add('hidden');
    } else {
      // Показываем ползунок при выборе фильтра
      window.formElements.effectController.classList.remove('hidden');
    }
  };

  // Устанавливаем уровень эффекта

  var setEffectLevel = function (level) {
    effectLevelInput.value = String(level);
    effectLevelBar.style.width = String(level) + '%';
    effectLevelPin.style.left = String(level) + '%';
  };

  // Определяем текущий фильтр

  var getCurrentFilter = function () {
    return window.formElements.imageEditForm.querySelector('.effects__radio:checked');
  };

  // Настраиваем интенсивность фильтра в соответствии с выбранным уровнем

  var tuneEffect = function (filter, level) {
    var filterEffect = '';

    switch (filter.value) {
      case 'chrome':
        filterEffect = 'grayscale(' + String(level / 100) + ')';
        break;

      case 'sepia':
        filterEffect = 'sepia(' + String(level / 100) + ')';
        break;

      case 'marvin':
        filterEffect = 'invert(' + String(level) + '%)';
        break;

      case 'phobos':
        filterEffect = 'blur(' + String(level / 100 * MAX_BLUR) + 'px)';
        break;

      case 'heat':
        filterEffect = 'brightness(' + String(MIN_BRIGHTNESS + level / 100 * (MAX_BRIGHTNESS - MIN_BRIGHTNESS)) + ')';
        break;

      default:
        filterEffect = 'none';
    }

    window.formElements.photoPreview.style.filter = filterEffect;
  };

  // Реализуем переключение фильтров по клику

  var toggleFilterHandler = function () {
    toggleEffectController(getCurrentFilter());
    setEffectLevel(DEFAULT_EFFECT_LEVEL);
    tuneEffect(getCurrentFilter(), DEFAULT_EFFECT_LEVEL);
  };

  // Добавляем обработчики на каждый фильтр

  for (var filterIndex = 0; filterIndex < filters.length; filterIndex++) {
    filters[filterIndex].addEventListener('input', toggleFilterHandler);
  }

  // Применяем эффект после установки ползунка

  var effectPinMouseUpHandler = function () {
    // Рассчитываем положение ползунка в процентах
    var effectLevel = Math.round((effectLevelPin.offsetLeft / effectLevelLine.offsetWidth) * 100);
    setEffectLevel(effectLevel);
    tuneEffect(getCurrentFilter(), effectLevel);
  };

  effectLevelPin.addEventListener('mouseup', effectPinMouseUpHandler);
})();
