'use strict';

var NUMBERS_PHOTOS = 25;
var NUMBERS_COMMENTS = 3;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var NAMES = ['Anton', 'Katia', 'Maks', 'Sergej', 'Olga', 'Vika'];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент ? !',
];

var HASHTAG_MAX_LENGTH = 20;
var HASHTAG_MIN_LENGTH = 2;
var HASHTAG_MAX_COUNT = 5;
var IMAGE_MIN_SCALE = 25;
var IMAGE_MAX_SCALE = 100;
var IMAGE_SCALE_STEP = 25;

var pictureElement = document.querySelector('#picture').content.querySelector('.picture');
var picturesElements = document.querySelector('.pictures');

function getRandomNumberFromRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomElementFromArray(arr) {
  var randomIndex = getRandomNumberFromRange(0, arr.length);
  var randomElement = arr[randomIndex];
  return randomElement;
}

function getComments() {
  var comments = [];
  for (var i = 1; i <= NUMBERS_COMMENTS; i++) {
    var comment = {
      avatar:
        'img/avatar-' +
        getRandomNumberFromRange(AVATAR_MIN, AVATAR_MAX) +
        '.svg',
      message: getRandomElementFromArray(MESSAGES),
      name: getRandomElementFromArray(NAMES),
    };
    comments.push(comment);
  }
  return comments;
}

function getPhotos() {
  var photos = [];
  for (var i = 1; i <= NUMBERS_PHOTOS; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      description: ' ',
      likes: getRandomNumberFromRange(LIKES_MIN, LIKES_MAX),
      comments: getComments(),
    };
    photos.push(photo);
  }
  return photos;
}

var photos = getPhotos();

var renderPhoto = function (photo) {
  var photoElement = pictureElement.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.addEventListener('click', function (ev) {
    ev.preventDefault();
    renderBigPicture(photo);
  });

  return photoElement;
};

var renderContent = function () {
  var fragment = document.createDocumentFragment();
  photos.forEach(function (photo) {
    fragment.appendChild(renderPhoto(photo));
  });
  picturesElements.appendChild(fragment);

  return fragment;
};

renderContent();

function renderCommentForBigPicture(commentBigPictureElement, comment) {
  var commentElement = commentBigPictureElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
}

var bodyElement = document.querySelector('body');

function closeBigPicture() {
  var bigPictureElement = document.querySelector('.big-picture');
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
}

function renderBigPicture(photo) {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImgElement = document.querySelector('.big-picture__img img');
  var likesCountElement = document.querySelector('.likes-count');
  var socialCaptionElement = document.querySelector('.social__caption');
  var commentsCountElement = document.querySelector('.comments-count');
  var socialCommentsElement = document.querySelector('.social__comments');
  document.getElementById('picture-cancel').addEventListener('click', closeBigPicture);

  bigPictureElement.classList.remove('hidden');
  bigPictureImgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  socialCaptionElement.textContent = photo.description;
  commentsCountElement.textContent = photo.comments.length;
  var templateSocialCommentElement = document.querySelector('.social__comment').cloneNode(true);
  document.querySelector('.social__comments').textContent = '';

  photo.comments.forEach(function (comment) {
    socialCommentsElement.appendChild(renderCommentForBigPicture(templateSocialCommentElement, comment));
  });

  bodyElement.classList.add('modal-open');
}

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

var textHashtagsElement = document.querySelector('.text__hashtags');

var popupEscapePress = function (evt) {
  if (evt.key === 'Escape' && evt.target !== textHashtagsElement) {
    evt.preventDefault();
    closePopupImageModification();
  }
};

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

var uploadImageEffectLevelElement = document.querySelector('.img-upload__effect-level');
var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
var scaleControlValueElement = document.querySelector('.scale__control--value');

uploadImagePreviewElement.style.transform = 'scale(' + parseInt(scaleControlValueElement.value, 10) / IMAGE_MAX_SCALE + ')';
uploadImageEffectLevelElement.classList.add('hidden');


var scaleImage = function (value) {
  scaleControlValueElement.value = value + '%';
  uploadImagePreviewElement.style.transform = 'scale(' + value / IMAGE_MAX_SCALE + ')';
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
      case 'chrome': uploadImagePreviewElement.style.filter = 'grayscale(' + ((1 / 100) * inputValue) + ')';
        break;
      case 'sepia': uploadImagePreviewElement.style.filter = 'sepia(' + ((1 / 100) * inputValue) + ')';
        break;
      case 'marvin': uploadImagePreviewElement.style.filter = 'invert(' + inputValue + '%)';
        break;
      case 'phobos': uploadImagePreviewElement.style.filter = 'blur(' + ((3 / 100) * inputValue) + 'px)';
        break;
      case 'heat': uploadImagePreviewElement.style.filter = 'brightness(' + ((3 / 100) * inputValue) + ')';
        break;
    }
  });
};

var getRadioValue = function (item) {
  var radioElement = item.querySelector('.effects__radio');
  radioElement.addEventListener('click', function () {
    uploadCancelButtonElement.classList.remove(activeEffect);
    uploadImagePreviewElement.style.filter = '';
    activeEffect = radioElement.value;
    uploadImagePreviewElement.classList.add('effects__preview--' + activeEffect);
    if (activeEffect === 'none') {
      uploadImageEffectLevelElement.classList.add('hidden');
    } else {
      uploadImageEffectLevelElement.classList.remove('hidden');
      renderEffectLevel(activeEffect);
    }
  });
};

function imageEffect() {
  effectsItemElement.forEach(function (item) {
    getRadioValue(item);
  });
}
imageEffect();
