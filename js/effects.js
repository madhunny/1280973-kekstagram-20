'use strict';
(function () {

  var IMAGE_MIN_SCALE = 25;
  var IMAGE_MAX_SCALE = 100;
  var IMAGE_SCALE_STEP = 25;

  var uploadImageEffectLevelElement = document.querySelector('.img-upload__effect-level');
  var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
  var scaleControlValueElement = document.querySelector('.scale__control--value');

  window.upload.style.transform = 'scale(' + parseInt(scaleControlValueElement.value, 10) / IMAGE_MAX_SCALE + ')';
  uploadImageEffectLevelElement.classList.add('hidden');


  var scaleImage = function (value) {
    scaleControlValueElement.value = value + '%';
    window.upload.style.transform = 'scale(' + value / IMAGE_MAX_SCALE + ')';
  };

  scaleControlSmallerElement.addEventListener('click', function () {
    var valueScaleSmaller = parseInt(scaleControlValueElement.value, 10);
    if (valueScaleSmaller <= IMAGE_MIN_SCALE) {
      return;
    }
    scaleImage(valueScaleSmaller - IMAGE_SCALE_STEP);
  });
  scaleControlBiggerElement.addEventListener('click', function () {
    var valueScaleBigger = parseInt(scaleControlValueElement.value, 10);
    if (valueScaleBigger >= IMAGE_MAX_SCALE) {
      return;
    }
    scaleImage(valueScaleBigger + IMAGE_SCALE_STEP);
  });

  var effectLevelValueElement = document.querySelector('.effect-level__value');
  var effectsItemElement = document.querySelectorAll('.effects__item');
  var effectLevelDepthElement = document.querySelectorAll('.effect__level__depth');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var dragging = false;
  var moveListener = null;

  function updatePin() {
    effectLevelPinElement.style.setProperty('left', effectLevelValueElement.value + '%');
    effectLevelDepthElement.style.setProperty('width', effectLevelValueElement.value + '%');
  }
  effectLevelPinElement.addEventListener('mousedown', function () {
    document.addEventListener('mousemove', function (event) {
      effectLevelValueElement.value = effectLevelPinElement.offsetLeft - event.clientX;
      updatePin();
      renderEffectLevel(effectLevelValueElement.value);
    });
    dragging = true;
  }, false);

  document.addEventListener('mouseup', function () {
    if (dragging) {
      dragging = false;
      document.removeEventListener('mousemove', moveListener);
    }
  }, false);


  var renderEffectLevel = function (pinValue) {
    effectLevelPinElement.addEventListener('mouseup', function () {
      var inputValue = parseInt(effectLevelValueElement.value, 10);
      switch (pinValue) {
        case 'chrome': window.upload.style.filter = 'grayscale(' + ((1 / 100) * inputValue) + ')';
          break;
        case 'sepia': window.upload.style.filter = 'sepia(' + ((1 / 100) * inputValue) + ')';
          break;
        case 'marvin': window.upload.style.filter = 'invert(' + inputValue + '%)';
          break;
        case 'phobos': window.upload.style.filter = 'blur(' + ((3 / 100) * inputValue) + 'px)';
          break;
        case 'heat': window.upload.style.filter = 'brightness(' + ((3 / 100) * inputValue) + ')';
          break;
      }
    });
  };

  var getRadioValue = function (item) {
    var radioElement = item.querySelector('.effects__radio');
    radioElement.addEventListener('click', function () {
      window.upload.classList.remove(window.upload);
      window.upload.style.filter = '';
      window.upload = radioElement.value;
      window.upload.classList.add('effects__preview--' + window.upload);
      if (window.upload === 'none') {
        uploadImageEffectLevelElement.classList.add('hidden');
      } else {
        uploadImageEffectLevelElement.classList.remove('hidden');
        renderEffectLevel(window.upload);
      }
    });
  };

  function imageEffect() {
    effectsItemElement.forEach(function (item) {
      getRadioValue(item);
    });
  }
  imageEffect();

})();
