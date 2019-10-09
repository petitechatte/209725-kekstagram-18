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

  // Переменная для хранения имени фильтра в момент переключения
  var currentFilter;

  // Отображение ползунка для регуляции эффекта

  var toggleEffectController = function (filter) {
    if (filter === 'none') {
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
    return window.formElements.imageEditForm.querySelector('.effects__radio:checked').value;
  };

  // Применяем выбранный фильтр

  var applyFilter = function (filter) {
    window.formElements.photoPreview.classList.add('effects__preview--' + filter);
  };

  // Настраиваем интенсивность фильтра в соответствии с выбранным уровнем эффекта

  var tuneEffect = function (filter, level) {
    var filterEffect = '';

    switch (filter) {
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

  // Сбрасываем эффект по умолчанию

  var resetFilter = function () {
    // Удаляем класс предыдущего эффекта
    window.formElements.photoPreview.classList.remove('effects__preview--' + currentFilter);
    // Убираем инлайновые стили, если пользователь успел потрогать слайдер
    window.formElements.photoPreview.style = '';
  };

  // Реализуем переключение фильтров по клику

  window.toggleFilter = function () {
    // Сбрасываем старый фильтр
    resetFilter();
    // Обновляем значение текущего фильтра
    currentFilter = getCurrentFilter();
    toggleEffectController(currentFilter);
    setEffectLevel(DEFAULT_EFFECT_LEVEL);
    applyFilter(currentFilter);
  };

  // Добавляем обработчики на каждый фильтр

  for (var filterIndex = 0; filterIndex < filters.length; filterIndex++) {
    filters[filterIndex].addEventListener('input', function () {
      window.toggleFilter();
    });
  }

  // Рассчитываем положение ползунка в процентах

  var getEffectLevelPinPosition = function () {
    return Math.round((effectLevelPin.offsetLeft / effectLevelLine.offsetWidth) * 100);
  };

  // Применяем эффект после установки ползунка

  effectLevelPin.addEventListener('mouseup', function () {
    setEffectLevel(getEffectLevelPinPosition());
    tuneEffect(getCurrentFilter(), getEffectLevelPinPosition());
  });
})();
