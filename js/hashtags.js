'use strict';
(function () {

  function validateHashTags() {
    var hashtags = (window.constant.textHashtagsElement.value).trim().split(' ');
    var hashtagSymbols = /^#[a-zа-я0-9]*$/i;
    window.constant.textHashtagsElement.setCustomValidity('');

    if (hashtags.length > window.constant.HASHTAG_MAX_COUNT) {
      window.constant.textHashtagsElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов;');
      return;
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      for (var j = i + 1; j < hashtags.length; j++) {
        if (hashtag.toLowerCase() === hashtags[j].toLowerCase()) {
          window.constant.textHashtagsElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды;');
          return;
        }
      }
      if (hashtag[0] !== '#') {
        window.constant.textHashtagsElement.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
        return;
      } else if (hashtag.indexOf('#', 1) > 0) {
        window.constant.textHashtagsElement.setCustomValidity('Хэш-теги разделяются пробелами;');
        return;
      } else if (!hashtagSymbols.test(hashtag)) {
        window.constant.textHashtagsElement.setCustomValidity('Имя хештега не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
        return;
      } else if (hashtag.length < window.constant.HASHTAG_MIN_LENGTH) {
        window.constant.textHashtagsElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        return;
      } else if (hashtag.length > window.constant.HASHTAG_MAX_LENGTH) {
        window.constant.textHashtagsElement.setCustomValidity('Максимальная длина одного хэш-тега ' + window.constant.HASHTAG_MAX_LENGTH + ' символов, включая решётку;');
        return;
      }
    }
  }

  function init() {
    window.constant.textHashtagsElement.addEventListener('blur', validateHashTags);
    window.constant.textHashtagsElement.addEventListener('input', function () {
      window.constant.textHashtagsElement.setCustomValidity('');
    });
  }

  window.hashtags = {
    init: init
  };

})();
