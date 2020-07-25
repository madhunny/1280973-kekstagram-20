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

  window.constant.effectLevelPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordinateValue = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var pinValue = {
        x: startCoordinateValue.x - moveEvt.clientX,
      };

      startCoordinateValue = {
        x: moveEvt.clientX,
      };

      window.constant.effectLevelPinElement.style.left = (window.constant.effectLevelPinElement.offsetLeft - pinValue.x) + 'px';
      var data = parseInt(window.constant.effectLevelPinElement.style.left, 10) / window.constant.EFFECT_LEVEL_MAX;
      if (data < 0) {
        window.constant.effectLevelPinElement.style.left = 0 + 'px';
        onMouseUp();
      } else if (data > 1) {
        onMouseUp();
        window.constant.effectLevelPinElement.style.left = window.constant.EFFECT_LEVEL_MAX + 'px';
      }

      window.constant.effectLevelDepthElement.style.width = window.constant.effectLevelPinElement.style.left;
    };

    var onMouseUp = function () {
      renderEffectLevel(window.constant.activeEffect);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  function renderEffectLevel(activeEffect) {
    var inputValue = parseInt(window.constant.effectLevelPinElement.style.left, 10) / window.constant.EFFECT_LEVEL_MAX;
    switch (activeEffect) {
      case 'none': window.constant.uploadImagePreviewElement.style.filter = '';
        break;
      case 'chrome': window.constant.uploadImagePreviewElement.style.filter = 'grayscale(' + inputValue + ')';
        break;
      case 'sepia': window.constant.uploadImagePreviewElement.style.filter = 'sepia(' + inputValue + ')';
        break;
      case 'marvin': window.constant.uploadImagePreviewElement.style.filter = 'invert(' + inputValue * 100 + '%)';
        break;
      case 'phobos': window.constant.uploadImagePreviewElement.style.filter = 'blur(' + 3 * inputValue + 'px)';
        break;
      case 'heat': window.constant.uploadImagePreviewElement.style.filter = 'brightness(' + (1 + inputValue * 2) + ')';
        break;
    }
  }

  function getRadioValue(item) {
    var radioElement = item.querySelector('.effects__radio');
    radioElement.addEventListener('click', function () {
      window.constant.uploadCancelButtonElement.classList.remove(window.constant.activeEffect);
      window.constant.uploadImagePreviewElement.style.filter = '';
      window.constant.activeEffect = radioElement.value;
      window.constant.effectLevelPinElement.style.left = 0 + 'px';
      window.constant.effectLevelDepthElement.style.width = 0 + 'px';
      window.constant.uploadImagePreviewElement.classList = '';
      if (window.constant.activeEffect !== 'none') {
        window.constant.uploadImagePreviewElement.classList.add('effects__preview--' + window.constant.activeEffect);
      }

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
