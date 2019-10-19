// Модуль служебных функций

'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  window.utils = {
    // Обработка нажатия ESC
    escKeydownHandler: function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        if (evt.target.classList.contains('text__hashtags') || evt.target.tagName === 'TEXTAREA') {
          // Потеря фокуса текстовым полем при нажатии ESC
          evt.stopPropagation();
          evt.target.blur();
        } else {
          // Закрытие формы
          window.closeUploadForm();
        }
      }
    }
  };
})();
