'use strict';
(function () {

  function renderPhoto(photo) {
    var photoElement = window.constant.pictureElement.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.addEventListener('click', function (ev) {
      ev.preventDefault();
      renderBigPicture(photo);
    });

    return photoElement;
  }

  function renderContent() {
    var fragment = document.createDocumentFragment();
    window.data.photos(window.constant.NUMBERS_PHOTOS, window.constant.NUMBERS_COMMENTS).forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });
    window.constant.picturesElements.appendChild(fragment);

    return fragment;
  }

  function renderCommentForBigPicture(commentBigPictureElement, comment) {
    var commentElement = commentBigPictureElement.cloneNode(true).content;
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  }

  function closeBigPicture() {
    var bigPictureElement = document.querySelector('.big-picture');
    bigPictureElement.classList.add('hidden');
    window.constant.bodyElement.classList.remove('modal-open');
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
    var templateSocialCommentElement = document.querySelector('#social__comment').cloneNode(true);
    document.querySelector('.social__comments').textContent = '';

    photo.comments.forEach(function (comment) {
      socialCommentsElement.appendChild(renderCommentForBigPicture(templateSocialCommentElement, comment));
    });

    window.constant.bodyElement.classList.add('modal-open');
  }

  function init() {
    renderContent();
  }

  window.pictures = {
    init: init,
  };
})();
