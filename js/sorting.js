// Модуль сортировки фотографий

'use strict';

(function () {
  var filtersBlock = document.querySelector('.img-filters');

  window.showFilters = function () {
    filtersBlock.classList.remove('img-filters--inactive');
  };
})();
