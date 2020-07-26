'use strict';
(function () {

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

  window.constant.uploadFileElement.addEventListener('change', openPopupImageModification);
  window.constant.uploadCancelButtonElement.addEventListener('click', closePopupImageModification);
  window.constant.uploadCancelButtonElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopupImageModification();
    }
  });

  function popupEscapePress(evt) {
    if (evt.key === 'Escape' && evt.target !== window.hashtags.textHashtagsElement) {
      evt.preventDefault();
      closePopupImageModification();
    }
  }

})();
