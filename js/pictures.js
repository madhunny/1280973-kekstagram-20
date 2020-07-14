'use strict';
(function () {


  var pictureElement = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElements = document.querySelector('.pictures');

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
    window.data.photos.forEach(function (photo) {
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

})();
