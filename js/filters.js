// Модуль работы с фотофильтрами

'use strict';

(function () {
  // Параметры настройки эффектов фотографии
  var DEFAULT_EFFECT_LEVEL = 100; // уровень эффекта при переключении фильтра
  var MAX_BLUR = 3; // максимальный эффект размытия в пикселях
  var MAX_BRIGHTNESS = 3; // максимальная яркость фотографии
  var MIN_BRIGHTNESS = 1; // минимальная яркость фотографии

  // Сохранение глобальных переменных в локальные для упрощения кода
  var imageEditForm = window.popupElements.imageEditForm;
  var photoPreview = window.popupElements.photoPreview;
  var effectController = window.popupElements.effectController;

  // Элементы управления эффектами
  var effectLevelInput = effectController.querySelector('.effect-level__value');
  var effectLevelLine = effectController.querySelector('.effect-level__line');
  var effectLevelBar = effectController.querySelector('.effect-level__depth');
  var effectLevelPin = effectController.querySelector('.effect-level__pin');
  var filters = imageEditForm.querySelectorAll('.effects__radio');

  var currentFilter; // переменная для хранения имени фильтра в момент переключения
  var effectLevel; // уровень эффекта
  var effectControllerCoordinates; // параметры слайдера
  var effectControllerMinX; // левый конец слайдера
  var effectControllerWidth; // правый конец слайдера
  var cursorRelativeX; // координата курсора относительно левого конца слайдера

  // Отображение ползунка для регуляции эффекта

  var toggleEffectController = function (filter) {
    if (filter === 'none') {
      // Прячем ползунок эффекта при отсутствии фильтра
      effectController.classList.add('hidden');
    } else {
      // Показываем ползунок при выборе фильтра
      effectController.classList.remove('hidden');
      // Находим параметры слайдера после его отрисовки на странице
      effectControllerCoordinates = effectLevelLine.getBoundingClientRect();
      // Используем свойство 'left', т.к. Edge не поддерживает свойство 'x'
      effectControllerMinX = effectControllerCoordinates.left;
      effectControllerWidth = effectControllerCoordinates.width;
    }
  };

  // Устанавливаем уровень эффекта

  var setEffectLevel = function (level) {
    effectLevelInput.value = String(level);
    effectLevelBar.style.width = level + '%';
    effectLevelPin.style.left = level + '%';
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
        filterEffect = 'grayscale(' + level / 100 + ')';
        break;

      case 'sepia':
        filterEffect = 'sepia(' + level / 100 + ')';
        break;

      case 'marvin':
        filterEffect = 'invert(' + level + '%)';
        break;

      case 'phobos':
        filterEffect = 'blur(' + level / 100 * MAX_BLUR + 'px)';
        break;

      case 'heat':
        filterEffect = 'brightness(' + (MIN_BRIGHTNESS + level / 100 * (MAX_BRIGHTNESS - MIN_BRIGHTNESS)) + ')';
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
    window.scale.set();
    // Обновляем значение текущего фильтра
    currentFilter = getCurrentFilter();
    // Настраиваем слайдер
    toggleEffectController(currentFilter);
    setEffectLevel(DEFAULT_EFFECT_LEVEL);
    // Применяем эффект
    applyFilter(currentFilter);
  };

  // Добавляем обработчики на каждый фильтр
  [].forEach.call(filters, function (filter) {
    filter.addEventListener('click', function () {
      window.toggleFilter();
    });
  });

  // Рассчитываем положение ползунка в процентах

  var getEffectLevelPinPosition = function (evt) {
    // Получаем значение координаты курсора относительно левого конца слайдера
    cursorRelativeX = evt.clientX - effectControllerMinX;
    // Получаем значение уровня эффекта в процентах
    effectLevel = Math.round((cursorRelativeX / effectControllerWidth) * 100);
    // Устанавливаем ограничения передвижения ползунка
    if (effectLevel < 0) {
      effectLevel = 0;
    } else if (effectLevel > 100) {
      effectLevel = 100;
    }
  };

  // Перемещение ползунка

  var documentMousemoveHandler = function (evt) {
    evt.preventDefault();
    // Определяем будущее положение ползунка
    getEffectLevelPinPosition(evt);
    // Устанавливаем соответствующий уровень эффекта и положение ползунка
    setEffectLevel(effectLevel);
    // Применяем выбранный уровень эффекта к превью фото
    tuneEffect(getCurrentFilter(), effectLevel);
  };

  var documentMouseupHandler = function (evt) {
    evt.preventDefault();
    // Удаляем обработчики событий мыши
    document.removeEventListener('mousemove', documentMousemoveHandler);
    document.removeEventListener('mouseup', documentMouseupHandler);
  };

  var effectLevelPinMousedownHandler = function (evt) {
    evt.preventDefault();
    // Добавляем обработчики событий мыши
    document.addEventListener('mousemove', documentMousemoveHandler);
    document.addEventListener('mouseup', documentMouseupHandler);
  };

  effectLevelPin.addEventListener('mousedown', effectLevelPinMousedownHandler);
})();
