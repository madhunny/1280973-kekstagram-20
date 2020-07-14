'use strict';
(function () {

  var uploadFileElement = document.querySelector('#upload-file');
  var uploadCancelButtonElement = document.querySelector('#upload-cancel');
  var uploadImageOverlayElement = document.querySelector('.img-upload__overlay');
  var uploadImagePreviewElement = document.querySelector('.img-upload__preview img');
  var activeEffect = 'none';

  var openPopupImageModification = function () {
    var file = uploadFileElement.files[0];
    uploadImagePreviewElement.src = URL.createObjectURL(file);
    uploadImageOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', popupEscapePress);
  };

  var closePopupImageModification = function () {
    uploadImageOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFileElement.value = '';
    uploadImagePreviewElement.classList.remove(activeEffect);
    document.removeEventListener('keydown', popupEscapePress);
  };

  uploadFileElement.addEventListener('change', openPopupImageModification);
  uploadCancelButtonElement.addEventListener('click', closePopupImageModification);
  uploadCancelButtonElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopupImageModification();
    }
  });

  var popupEscapePress = function (evt) {
    if (evt.key === 'Escape' && evt.target !== window.hashtags) {
      evt.preventDefault();
      closePopupImageModification();
    }
  };

  window.upload = {
    activeEffect: activeEffect,
    uploadImagePreviewElement: uploadImagePreviewElement,
    uploadCancelButtonElement: uploadCancelButtonElement
  };
})();
