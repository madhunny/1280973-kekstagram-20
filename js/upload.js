'use strict';
(function () {

  function popupEscapePress(evt) {
    if (evt.key === 'Escape' && evt.target !== window.constant.textHashtagsElement) {
      evt.preventDefault();
      closePopupImageModification();
    }
  }

  function openPopupImageModification() {
    var file = window.constant.uploadFileElement.files[0];
    window.constant.uploadImagePreviewElement.src = URL.createObjectURL(file);
    window.effects.scaleImage(100);
    window.constant.uploadImageOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', popupEscapePress);
  }

  function closePopupImageModification() {
    window.constant.uploadImageOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    window.constant.uploadFileElement.value = '';
    window.effects.resetEffect();
    document.removeEventListener('keydown', popupEscapePress);
  }

  function uploadSuccess() {
    closePopupImageModification();
    var successTemplateElement = document.querySelector('#success').content.cloneNode(true);
    document.querySelector('main').appendChild(successTemplateElement);
  }

  function uploadError() {
    closePopupImageModification();
    var errorTemplateElement = document.querySelector('#error').content.cloneNode(true);
    document.querySelector('main').appendChild(errorTemplateElement);
    var errorButtonElement = document.querySelector('.error__button');
    errorButtonElement.addEventListener('click', function () {
      document.querySelector('section.error').remove();
      window.constant.uploadFileElement.click();
    });
  }

  function init() {
    window.constant.uploadFileElement.addEventListener('change', openPopupImageModification);
    window.constant.uploadCancelButtonElement.addEventListener('click', closePopupImageModification);
    window.constant.uploadCancelButtonElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        closePopupImageModification();
      }
    });

    window.constant.uploadImageFormElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var formData = new FormData(window.constant.uploadImageFormElement);
      window.backend.save(formData, uploadSuccess, uploadError);
    });

    document.addEventListener('click', function (evt) {
      var successMessageElement = document.querySelector('section.success');
      var errorMessageElement = document.querySelector('section.error');
      var successButtonElement = document.querySelector('.success__button');
      if (evt.target.contains(errorMessageElement)) {
        errorMessageElement.remove();
      } else if (evt.target === successButtonElement || evt.target.contains(successMessageElement)) {
        successMessageElement.remove();
      }
    });
  }

  window.upload = {
    init: init
  };

})();
