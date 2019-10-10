// Вспомогательный модуль для работы с элементами формы в других модулях

'use strict';

(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var imageEditForm = uploadForm.querySelector('.img-upload__overlay');
  var photoPreview = imageEditForm.querySelector('.img-upload__preview');
  var effectController = imageEditForm.querySelector('.img-upload__effect-level');
  var hashtagInput = imageEditForm.querySelector('.text__hashtags');

  window.formElements = {
    uploadForm: uploadForm,
    imageEditForm: imageEditForm,
    photoPreview: photoPreview,
    effectController: effectController,
    hashtagInput: hashtagInput
  };
})();
