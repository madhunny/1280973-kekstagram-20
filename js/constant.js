'use strict';
(function () {

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
  var bodyElement = document.querySelector('body');

  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_COUNT = 5;
  var textHashtagsElement = document.querySelector('.text__hashtags');

  var uploadFileElement = document.querySelector('#upload-file');
  var uploadCancelButtonElement = document.querySelector('#upload-cancel');
  var uploadImageOverlayElement = document.querySelector('.img-upload__overlay');
  var uploadImagePreviewElement = document.querySelector('.img-upload__preview img');
  var activeEffect = 'none';

  var IMAGE_MIN_SCALE = 25;
  var IMAGE_MAX_SCALE = 100;
  var IMAGE_SCALE_STEP = 25;
  var EFFECT_LEVEL_MAX = 452;

  var numOfDisplayedComments = 5;
  var photoDetailedComments = [];

  var uploadImageEffectLevelElement = document.querySelector('.img-upload__effect-level');
  var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
  var scaleControlValueElement = document.querySelector('.scale__control--value');

  var effectLevelValueElement = document.querySelector('.effect-level__value');
  var effectsItemElement = document.querySelectorAll('.effects__item');
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var dragging = false;
  var moveListener = null;

  var GET_DATA_URL = 'https://javascript.pages.academy/kekstagram/data';
  var SEND_DATA_URL = 'https://javascript.pages.academy/kekstagram';
  var TIME_OUT = 2000;
  var StatusCode = {
    OK: 200
  };

  window.constant = {
    NUMBERS_PHOTOS: NUMBERS_PHOTOS,
    NUMBERS_COMMENTS: NUMBERS_COMMENTS,
    AVATAR_MIN: AVATAR_MIN,
    AVATAR_MAX: AVATAR_MAX,
    LIKES_MIN: LIKES_MIN,
    LIKES_MAX: LIKES_MAX,
    NAMES: NAMES,
    MESSAGES: MESSAGES,

    pictureElement: pictureElement,
    picturesElements: picturesElements,
    bodyElement: bodyElement,

    HASHTAG_MAX_LENGTH: HASHTAG_MAX_LENGTH,
    HASHTAG_MIN_LENGTH: HASHTAG_MIN_LENGTH,
    HASHTAG_MAX_COUNT: HASHTAG_MAX_COUNT,
    textHashtagsElement: textHashtagsElement,

    uploadFileElement: uploadFileElement,
    uploadCancelButtonElement: uploadCancelButtonElement,
    uploadImageOverlayElement: uploadImageOverlayElement,
    uploadImagePreviewElement: uploadImagePreviewElement,
    activeEffect: activeEffect,

    IMAGE_MIN_SCALE: IMAGE_MIN_SCALE,
    IMAGE_MAX_SCALE: IMAGE_MAX_SCALE,
    IMAGE_SCALE_STEP: IMAGE_SCALE_STEP,
    EFFECT_LEVEL_MAX: EFFECT_LEVEL_MAX,

    numOfDisplayedComments: numOfDisplayedComments,
    photoDetailedComments: photoDetailedComments,

    uploadImageEffectLevelElement: uploadImageEffectLevelElement,
    scaleControlSmallerElement: scaleControlSmallerElement,
    scaleControlBiggerElement: scaleControlBiggerElement,
    scaleControlValueElement: scaleControlValueElement,

    effectLevelValueElement: effectLevelValueElement,
    effectsItemElement: effectsItemElement,
    effectLevelDepthElement: effectLevelDepthElement,
    effectLevelPinElement: effectLevelPinElement,
    effectLevelLineElement: effectLevelLineElement,
    dragging: dragging,
    moveListener: moveListener,
    GET_DATA_URL: GET_DATA_URL,
    SEND_DATA_URL: SEND_DATA_URL,
    TIME_OUT: TIME_OUT,
    StatusCode: StatusCode

  };
})();
