// Модуль работы с фотофильтрами

'use strict';

(function () {
  // Параметры настройки эффектов фотографии
  var DEFAULT_EFFECT_LEVEL = 100; // уровень эффекта при переключении фильтра
  var MAX_BLUR = 3; // максимальный эффект размытия в пикселях
  var MAX_BRIGHTNESS = 3; // максимальная яркость фотографии
  var MIN_BRIGHTNESS = 1; // минимальная яркость фотографии

  // Сохранение глобальных переменных в локальные для упрощения кода
  var imageEditForm = window.formElements.imageEditForm;
  var photoPreview = window.formElements.photoPreview;
  var effectController = window.formElements.effectController;

  // Элементы управления эффектами
  var effectLevelInput = effectController.querySelector('.effect-level__value');
  var effectLevelLine = effectController.querySelector('.effect-level__line');
  var effectLevelBar = effectController.querySelector('.effect-level__depth');
  var effectLevelPin = effectController.querySelector('.effect-level__pin');
  var filters = imageEditForm.querySelectorAll('.effects__radio');

  var currentFilter; // переменная для хранения имени фильтра в момент переключения

  // Отображение ползунка для регуляции эффекта

  var toggleEffectController = function (filter) {
    if (filter === 'none') {
      // Прячем ползунок эффекта при отсутствии фильтра
      effectController.classList.add('hidden');
    } else {
      // Показываем ползунок при выборе фильтра
      effectController.classList.remove('hidden');
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
    return imageEditForm.querySelector('.effects__radio:checked').value;
  };

  // Применяем выбранный фильтр

  var applyFilter = function (filter) {
    photoPreview.classList.add('effects__preview--' + filter);
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

    photoPreview.style.filter = filterEffect;
  };

  // Сбрасываем эффект по умолчанию

  var resetFilter = function () {
    // Удаляем класс предыдущего эффекта
    photoPreview.classList.remove('effects__preview--' + currentFilter);
    // Убираем инлайновые стили, если пользователь успел потрогать слайдер
    photoPreview.style = '';
  };

  // Реализуем переключение фильтров по клику

  window.toggleFilter = function () {
    // Сбрасываем старый фильтр (удаляются все инлайновые стили, в том числе и настройки масштаба)
    resetFilter();
    // Возвращаем настройки масштаба, установленные на предыдущем фильтре
    window.scale.setScale();
    // Обновляем значение текущего фильтра
    currentFilter = getCurrentFilter();
    // Настраиваем слайдер
    toggleEffectController(currentFilter);
    setEffectLevel(DEFAULT_EFFECT_LEVEL);
    // Применяем эффект
    applyFilter(currentFilter);
  };

  // Добавляем обработчики на каждый фильтр

  for (var filterIndex = 0; filterIndex < filters.length; filterIndex++) {
    filters[filterIndex].addEventListener('input', function () {
      window.toggleFilter();
    });
  }

  // Перемещение ползунка

  var pinMousemoveHandler = function () {
    // Применяем эффект после установки ползунка
    setEffectLevel(getEffectLevelPinPosition());
    tuneEffect(getCurrentFilter(), getEffectLevelPinPosition());
  };

  var pinMouseupHandler = function () {
    // Удаляем обработчики событий мыши
    effectLevelPin.removeEventListener('mousemove', pinMousemoveHandler);
    effectLevelPin.removeEventListener('mouseup', pinMouseupHandler);
  };

  var pinMousedownHandler = function () {
    // Добавляем обработчики событий мыши
    effectLevelPin.addEventListener('mousemove', pinMousemoveHandler);
    effectLevelPin.addEventListener('mouseup', pinMouseupHandler);
  };

  // Рассчитываем положение ползунка в процентах

  var getEffectLevelPinPosition = function () {
    return Math.round((effectLevelPin.offsetLeft / effectLevelLine.offsetWidth) * 100);
  };

  effectLevelPin.addEventListener('mousedown', pinMousedownHandler);
})();
