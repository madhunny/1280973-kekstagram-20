"use strict";
var NUMBERS_PHOTOS = 25;
var NUMBERS_COMMENTS = 3;

var NAMES = ["Anton", "Katia", "Maks", "Sergej", "Olga", "Vika"];
var MESSAGES = [
  "Всё отлично!",
  "В целом всё неплохо.Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают.",
  "Как можно было поймать такой неудачный момент ? !",
];

var pictureTemplateElement = document
  .querySelector("#picture")
  .content.querySelector(".picture");
var picturesElement = document.querySelector(".pictures");

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
  var reviews = [];
  for (var i = 1; i <= NUMBERS_COMMENTS; i++) {
    var comment = {
      avatar: "img/avatar-" + getRandomNumberFromRange(1, 6) + ".svg",
      message: getRandomElementFromArray(MESSAGES),
      name: getRandomElementFromArray(NAMES),
    };
    reviews.push(comment);
  }
  return reviews;
}

function getPhotos() {
  var photos = [];
  for (var i = 1; i <= NUMBERS_PHOTOS; i++) {
    var photo = {
      url: "photos/" + i + ".jpg",
      description: " ",
      likes: getRandomNumberFromRange(15, 200),
      comments: [],
    };
    photos.push(photo);
  }
  return photos;
}

var photos = getPhotos();

var renderPhoto = function (photo) {
  var photoElement = pictureTemplateElement.cloneNode(true);

  photoElement.querySelector(".picture__img").src = photo.url;
  photoElement.querySelector(".picture__likes").textContent = photo.likes;
  photoElement.querySelector(".picture__comments").textContent =
    photo.comments.length;

  return photoElement;
};

var renderContent = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPicture(photo[i]));
  }
  pictures.appendChild(fragment);

  return fragment;
};

renderContent();
