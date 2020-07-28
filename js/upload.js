'use strict';
(function () {

  function popupEscapePress(evt) {
    if (evt.key === 'Escape' &&
      (evt.target !== window.constant.textHashtagsElement && evt.target !== window.constant.textDescriptionElement)
    ) {
      evt.preventDefault();
      closePopupImageModification();
    }
  }

  function onKeyDownCloseSuccessMessage(evt) {
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  }
  function onKeyDownCloseErrorMessage(evt) {
    if (evt.key === 'Escape') {
      closeErrorMessage();
    }
  }

  function closeSuccessMessage() {
    var successMessageElement = document.querySelector('section.success');
    successMessageElement.remove();
    document.removeEventListener('click', onClickCloseSuccessMessage);
    document.removeEventListener('keydown', onKeyDownCloseSuccessMessage);
  }

  function closeErrorMessage() {
    var errorMessageElement = document.querySelector('section.error');
    errorMessageElement.remove();
    document.removeEventListener('click', onClickCloseErrorMessage);
    document.removeEventListener('keydown', onKeyDownCloseErrorMessage);
  }

  function onClickCloseSuccessMessage(evt) {
    var successMessageElement = document.querySelector('section.success');
    var successButtonElement = document.querySelector('.success__button');
    if (evt.target === successButtonElement || evt.target.contains(successMessageElement)) {
      closeSuccessMessage();
    }
  }

  function onClickCloseErrorMessage(evt) {
    var errorMessageElement = document.querySelector('section.error');
    if (evt.target.contains(errorMessageElement)) {
      closeErrorMessage();
    }
  }

  function openSuccessMessage() {
    var successTemplateElement = document.querySelector('#success').content.cloneNode(true);
    document.querySelector('main').appendChild(successTemplateElement);
    document.addEventListener('click', onClickCloseSuccessMessage);
    document.addEventListener('keydown', onKeyDownCloseSuccessMessage);
  }

  function openErrorMessage() {
    var errorTemplateElement = document.querySelector('#error').content.cloneNode(true);
    document.querySelector('main').appendChild(errorTemplateElement);
    document.addEventListener('click', onClickCloseErrorMessage);
    document.addEventListener('keydown', onKeyDownCloseErrorMessage);

    var errorButtonElement = document.querySelector('.error__button');
    errorButtonElement.addEventListener('click', function () {
      document.querySelector('section.error').remove();
      window.constant.uploadFileElement.click();
    });
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
    window.constant.textDescriptionElement.value = '';
    window.constant.textHashtagsElement.value = '';
    window.pictures.changeFilter('filter-default');
    openSuccessMessage();
  }

  function uploadError() {
    closePopupImageModification();
    openErrorMessage();
  }

  function init() {
    window.constant.uploadFileElement.addEventListener('change', openPopupImageModification);
    window.constant.uploadCancelButtonElement.addEventListener('click', closePopupImageModification);
    window.constant.uploadImageFormElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var formData = new FormData(window.constant.uploadImageFormElement);
      window.backend.save(formData, uploadSuccess, uploadError);
    });

  }

  window.upload = {
    init: init
  };

})();
