// Вспомогательный модуль для работы с элементами формы в других модулях

'use strict';

(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var fileUpload = uploadForm.querySelector('#upload-file');
  var imageEditForm = uploadForm.querySelector('.img-upload__overlay');
  var uploadCloseButton = imageEditForm.querySelector('.img-upload__cancel');
  var photoPreview = imageEditForm.querySelector('.img-upload__preview img');
  var effectController = imageEditForm.querySelector('.img-upload__effect-level');
  var noEffectInput = imageEditForm.querySelector('#effect-none');
  var hashtagInput = imageEditForm.querySelector('.text__hashtags');
  var descriptionInput = imageEditForm.querySelector('.text__description');
  var submitFormButton = uploadForm.querySelector('#upload-submit');

  window.popupElements = {
    uploadForm: uploadForm,
    fileUpload: fileUpload,
    imageEditForm: imageEditForm,
    uploadCloseButton: uploadCloseButton,
    photoPreview: photoPreview,
    effectController: effectController,
    noEffectInput: noEffectInput,
    hashtagInput: hashtagInput,
    descriptionInput: descriptionInput,
    submitFormButton: submitFormButton
  };
})();
