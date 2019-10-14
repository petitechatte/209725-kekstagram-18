// Модуль сортировки фотографий

'use strict';

(function () {
  // Количество случайных фотографий
  var SELECTED_PHOTOS_NUMBER = 10;

  // Элементы DOM
  var filtersBlock = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var randomPhotos = [];

  // Получаем случайное значение из массива

  var getRandomValue = function (data) {
    return data[Math.floor(Math.random() * (data.length))];
  };

  // Выбираем элементы для массива заданной длины из другого массива

  var selectData = function (data, elementsNumber) {
    var selectedElements = [];
    var element;

    while (selectedElements.length < elementsNumber) {
      element = getRandomValue(data);

      if (selectedElements.indexOf(element) === -1) {
        selectedElements.push(element);
      }
    }

    return selectedElements;
  };

  // Подбираем случайные фотографии

  var getRandomPhotos = function () {
    randomPhotos = selectData(window.gallery.initialData, SELECTED_PHOTOS_NUMBER);
    window.gallery.updatePhotos(randomPhotos);
  };

  window.activateFilters = function () {
    // Показываем кнопки-фильтры
    filtersBlock.classList.remove('img-filters--inactive');
    // Добвляем кнопкам обработчики
    filterPopular.addEventListener('click', function () {
      window.gallery.updatePhotos(window.gallery.initialData);
    });
    filterRandom.addEventListener('click', function () {
      getRandomPhotos();
    });
  };
})();
