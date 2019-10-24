// Модуль активации сортировочных фильтров

'use strict';

(function () {
  // Элементы DOM
  var filtersBlock = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  window.activateSortingFilters = function () {
    // Показываем кнопки-фильтры
    filtersBlock.classList.remove('img-filters--inactive');
    // Добвляем кнопкам обработчики
    filterPopular.addEventListener('click', window.debounce(function () {
      window.gallery.updateGallery(window.gallery.initialData);
    }));
    filterRandom.addEventListener('click', window.debounce(function () {
      window.sorting.showRandomPhotos();
    }));
    filterDiscussed.addEventListener('click', window.debounce(function () {
      window.sorting.showDiscussedPhotos();
    }));
  };
})();
