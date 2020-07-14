'use strict';
(function () {

  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_COUNT = 5;

  var textHashtagsElement = document.querySelector('.text__hashtags');
  var validateHashTags = function () {
    var hashtags = (textHashtagsElement.value).split(' ');
    var hashtagSymbols = /^#[a-zа-я0-9]*$/i;
    textHashtagsElement.setCustomValidity('');

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      for (var j = i + 1; j < hashtags.length; j++) {
        if (hashtag.toLowerCase() === hashtags[j].toLowerCase()) {
          textHashtagsElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды;');
          return;
        }
      }
      if (hashtag[0] !== '#') {
        textHashtagsElement.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
        return;
      } else if (!hashtagSymbols.test(hashtag)) {
        textHashtagsElement.setCustomValidity('Имя хештега не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
        return;
      } else if (hashtag.length < HASHTAG_MIN_LENGTH) {
        textHashtagsElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        return;
      } else if (hashtag.length > HASHTAG_MAX_LENGTH) {
        textHashtagsElement.setCustomValidity('Максимальная длина одного хэш-тега ' + HASHTAG_MAX_LENGTH + ' символов, включая решётку;');
        return;
      } else if (hashtag.indexOf('#', 1) > 0) {
        textHashtagsElement.setCustomValidity('Хэш-теги разделяются пробелами;');
        return;
      } else if (hashtag.length > HASHTAG_MAX_COUNT) {
        textHashtagsElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов;');
        return;
      }
    }
  };

  textHashtagsElement.addEventListener('blur', validateHashTags);

  textHashtagsElement.addEventListener('input', function () {
    textHashtagsElement.setCustomValidity('');
  });

  window.hashtags = {
    textHashtagsElement: textHashtagsElement
  };

})();
