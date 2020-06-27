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
      avatar: 'img/avatar-' + getRandomNumberFromRange(AVATAR_MIN, AVATAR_MAX) + '.svg',
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

function getCommentForBigPicture(arr) {
  var commentBigPictureElement = document.querySelector('#big_picture').content;
  var commentElement = commentBigPictureElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = arr.avatar;
  commentElement.querySelector('.social__picture').alt = arr.name;
  commentElement.querySelector('.social__text').textContent = arr.message;
  return commentElement;
}

function renderBigPicture(photo) {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImgElement = document.querySelector('.big-picture__img img');
  var likesCountElement = document.querySelector('.likes-count');
  var socialCaptionElement = document.querySelector('.social__caption');
  var commentsCountElement = document.querySelector('.comments-count');
  var socialCommentsElement = document.querySelector('.social__comments');
  var socialCommentCountElement = document.querySelector('.social__comment-count');
  var commentsLoaderElement = document.querySelector('.comments-loader');

  bigPictureElement.classList.remove('hidden');
  bigPictureImgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  socialCaptionElement.textContent = photo.description;
  commentsCountElement.textContent = photo.comments.length;
  for (var i = 0; i <= photo.comments.length; i++) {
    socialCommentsElement.appendChild(getCommentForBigPicture(photo.comments[i]));
  }
  socialCommentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  document.querySelector('body').classList.add('modal-open');
}

renderBigPicture(photos[0]);

var uploadFileElement = document.querySelector('#upload-file');
var uploadCancelButtonElement = document.querySelector('#upload-cancel');
var uploadImageOverlayElement = document.querySelector('.img-upload__overlay');
var uploadImagePreviewElement = document.querySelector('.img-upload__preview img');

var openPopupImageModification = function () {
  uploadImageOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', popupEscapePress);
};

var closePopupImageModification = function () {
  uploadImageOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileElement.value = '';
  uploadImagePreviewElement.className = '';
  document.removeEventListener('keydown', popupEscapePress);
};

uploadFileElement.addEventListener('change', function () {
  openPopupImageModification();
});
uploadCancelButtonElement.addEventListener('click', function () {
  closePopupImageModification();
});
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

textHashtagsElement.addEventListener('blur', function () {
  var values = (textHashtagsElement.value).split(' ');
  var regexp = /^#[a-zA-Zа-яА-Я0-9]*$/;
  var result;
  for (var i = 0; i < values.length; i++) {
    for (var j = i + 1; j < values.length; j++) {
      if (values[i].toLowerCase() === values[j].toLowerCase()) {
        result = true;
      }
    }
    if (values[i][0] !== '#') {
      textHashtagsElement.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
    }
    else if (!regexp.test(values[i])) {
      textHashtagsElement.setCustomValidity('Имя хештега не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
    }
    else if (values[i].length < 2) {
      textHashtagsElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    }
    else if (values[i].length > 20) {
      textHashtagsElement.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку;');
    }
    else if (values[i].indexOf('#', 1) > 0) {
      textHashtagsElement.setCustomValidity('Хэш-теги разделяются пробелами;');
    }
    else if (result) {
      textHashtagsElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды;');
    }
    else if (values.length > 5) {
      textHashtagsElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов;');
    }
    else {
      textHashtagsElement.setCustomValidity('');
    }
  }
});
