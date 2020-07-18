'use strict';
(function () {

  window.constant.uploadImagePreviewElement.style.transform = 'scale(' + parseInt(window.constant.scaleControlValueElement.value, 10) / window.constant.IMAGE_MAX_SCALE + ')';
  window.constant.uploadImageEffectLevelElement.classList.add('hidden');

  function scaleImage(value) {
    window.constant.scaleControlValueElement.value = value + '%';
    window.constant.uploadImagePreviewElement.style.transform = 'scale(' + value / window.constant.IMAGE_MAX_SCALE + ')';
  }

  window.constant.scaleControlSmallerElement.addEventListener('click', function () {
    var valueScaleSmaller = parseInt(window.constant.scaleControlValueElement.value, 10);
    if (valueScaleSmaller <= window.constant.IMAGE_MIN_SCALE) {
      return;
    }
    scaleImage(valueScaleSmaller - window.constant.IMAGE_SCALE_STEP);
  });

  window.constant.scaleControlBiggerElement.addEventListener('click', function () {
    var valueScaleBigger = parseInt(window.constant.scaleControlValueElement.value, 10);
    if (valueScaleBigger >= window.constant.IMAGE_MAX_SCALE) {
      return;
    }
    scaleImage(valueScaleBigger + window.constant.IMAGE_SCALE_STEP);
  });

  function updatePin() {
    window.constant.effectLevelPinElement.style.setProperty('left', window.constant.effectLevelValueElement.value + '%');
    window.constant.effectLevelDepthElement.style.setProperty('width', window.constant.effectLevelValueElement.value + '%');
  }
  window.constant.effectLevelPinElement.addEventListener('mousedown', function () {
    document.addEventListener('mousemove', function (event) {
      window.constant.effectLevelValueElement.value = window.constant.effectLevelPinElement.offsetLeft - event.clientX;
      updatePin();
      renderEffectLevel(window.constant.effectLevelValueElement.value);
    });
    window.constant.dragging = true;
  }, false);

  document.addEventListener('mouseup', function () {
    if (window.constant.dragging) {
      window.constant.dragging = false;
      document.removeEventListener('mousemove', window.constant.moveListener);
    }
  }, false);

  function renderEffectLevel(pinValue) {
    window.constant.effectLevelPinElement.addEventListener('mouseup', function () {
      var inputValue = parseInt(window.constant.effectLevelValueElement.value, 10);
      switch (pinValue) {
        case 'chrome': window.constant.uploadImagePreviewElement.style.filter = 'grayscale(' + ((1 / 100) * inputValue) + ')';
          break;
        case 'sepia': window.constant.uploadImagePreviewElement.style.filter = 'sepia(' + ((1 / 100) * inputValue) + ')';
          break;
        case 'marvin': window.constant.uploadImagePreviewElement.style.filter = 'invert(' + inputValue + '%)';
          break;
        case 'phobos': window.constant.uploadImagePreviewElement.style.filter = 'blur(' + ((3 / 100) * inputValue) + 'px)';
          break;
        case 'heat': window.constant.uploadImagePreviewElement.style.filter = 'brightness(' + ((3 / 100) * inputValue) + ')';
          break;
      }
    });
  }

  function getRadioValue(item) {
    var radioElement = item.querySelector('.effects__radio');
    radioElement.addEventListener('click', function () {
      window.constant.uploadCancelButtonElement.classList.remove(window.constant.activeEffect);
      window.constant.uploadImagePreviewElement.style.filter = '';
      window.constant.activeEffect = radioElement.value;
      window.constant.uploadImagePreviewElement.classList.add('effects__preview--' + window.constant.activeEffect);
      if (window.constant.activeEffect === 'none') {
        window.constant.uploadImageEffectLevelElement.classList.add('hidden');
      } else {
        window.constant.uploadImageEffectLevelElement.classList.remove('hidden');
        renderEffectLevel(window.constant.activeEffect);
      }
    });
  }

  function modifyImageEffect() {
    window.constant.effectsItemElement.forEach(function (item) {
      getRadioValue(item);
    });
  }

  function init() {
    modifyImageEffect();
  }

  window.effects = {
    init: init
  };

})();
