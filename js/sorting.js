// Модуль сортировки фотографий

'use strict';

(function () {
  var filtersBlock = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  window.showFilters = function () {
    filtersBlock.classList.remove('img-filters--inactive');
    filterPopular.addEventListener('click', function () {
      window.gallery.updatePhotos(window.gallery.initialData);
    });
  };
})();
