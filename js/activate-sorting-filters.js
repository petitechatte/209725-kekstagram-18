// Модуль активации сортировочных фильтров

'use strict';

(function () {
  // Элементы DOM
  var filtersBlock = document.querySelector('.img-filters');
  var filters = filtersBlock.querySelectorAll('.img-filters__button');
  var filterPopular = filtersBlock.querySelector('#filter-popular');
  var filterRandom = filtersBlock.querySelector('#filter-random');
  var filterDiscussed = filtersBlock.querySelector('#filter-discussed');
  var filterActive;

  var addFiltersClickListeners = function () {
    // Обработчики, которые меняют вид кнопок
    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener('click', function (evt) {
        filterActive = filtersBlock.querySelector('.img-filters__button--active');
        filterActive.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
      });
    }
    // Обработчики, которые запускают сортировку
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

  window.activateSortingFilters = function () {
    // Показываем кнопки-фильтры
    filtersBlock.classList.remove('img-filters--inactive');
    // Добвляем кнопкам обработчики
    addFiltersClickListeners();
  };
})();
