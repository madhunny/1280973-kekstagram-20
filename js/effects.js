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

      var effectPxValue = window.constant.effectLevelPinElement.offsetLeft - pinValue.x;
      var effectLevel = effectPxValue / window.constant.EFFECT_LEVEL_MAX;

      if (effectLevel < 0) {
        effectLevel = 0;
      } else if (effectLevel > 1) {
        effectLevel = 1;
      }

      setEffectLevel(effectLevel);
      if (effectLevel === 0 || effectLevel === 1) {
        onMouseUp();
      }
    };

    var onMouseUp = function () {
      renderEffectLevel(window.constant.activeEffect, window.constant.effectLevel);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  function setEffectLevel(effectLevel) {
    window.constant.effectLevel = effectLevel;
    window.constant.effectLevelPinElement.style.left = effectLevel * window.constant.EFFECT_LEVEL_MAX + 'px';
    window.constant.effectLevelDepthElement.style.width = window.constant.effectLevelPinElement.style.left;
  }

  function renderEffectLevel(activeEffect, effectLevel) {
    switch (activeEffect) {
      case 'none': window.constant.uploadImagePreviewElement.style.filter = '';
        break;
      case 'chrome': window.constant.uploadImagePreviewElement.style.filter = 'grayscale(' + effectLevel + ')';
        break;
      case 'sepia': window.constant.uploadImagePreviewElement.style.filter = 'sepia(' + effectLevel + ')';
        break;
      case 'marvin': window.constant.uploadImagePreviewElement.style.filter = 'invert(' + effectLevel * 100 + '%)';
        break;
      case 'phobos': window.constant.uploadImagePreviewElement.style.filter = 'blur(' + 3 * effectLevel + 'px)';
        break;
      case 'heat': window.constant.uploadImagePreviewElement.style.filter = 'brightness(' + (1 + effectLevel * 2) + ')';
        break;
    }
  }

  function applyEffect(activeEffect) {
    window.constant.uploadCancelButtonElement.classList.remove();
    window.constant.uploadImagePreviewElement.style.filter = '';
    window.constant.activeEffect = activeEffect;
    window.constant.uploadImagePreviewElement.classList = '';
    if (activeEffect !== 'none') {
      window.constant.uploadImagePreviewElement.classList.add('effects__preview--' + activeEffect);
    }

    if (activeEffect === 'none') {
      window.constant.uploadImageEffectLevelElement.classList.add('hidden');
    } else {
      window.constant.uploadImageEffectLevelElement.classList.remove('hidden');
      renderEffectLevel(activeEffect, window.constant.effectLevel);
    }
  }

  function setupEffect(item) {
    var radioElement = item.querySelector('.effects__radio');
    radioElement.addEventListener('click', function () {
      setEffectLevel(1);
      applyEffect(radioElement.value);
    });
  }

  function modifyImageEffect() {
    window.constant.effectsItemElement.forEach(function (item) {
      setupEffect(item);
    });
  }

  function reset() {
    setEffectLevel(1);
    applyEffect('none');
  }

  function init() {
    reset();
    modifyImageEffect();
  }

  window.effects = {
    init: init,
    reset: reset,
    scaleImage: scaleImage
  };

})();
