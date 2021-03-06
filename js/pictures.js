'use strict';
(function () {

  function onKeyDownCloseBigPicture(evt) {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  }

  function onClickCloseBigPicture(evt) {
    if (evt.target === window.constant.bigPictureOverlayElement) {
      closeBigPicture();
    }
  }

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

  function onPhotosLoadError(error) {
    var node = document.createElement('div');
    node.style = 'position: absolute; top: 10px; margin: 0 auto; width: 100%; background-color: indianred; font-size: 30px; text-align: center; line-height: 50px';
    var textError = document.createElement('span');
    textError.textContent = error;
    node.appendChild(textError);
    document.body.appendChild(node);
  }

  function renderContent(photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });
    window.constant.picturesElements.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });

    window.constant.picturesElements.appendChild(fragment);
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
    document.removeEventListener('keydown', onKeyDownCloseBigPicture);
    document.removeEventListener('click', onClickCloseBigPicture);
  }

  function renderBigPicture(photo) {
    window.constant.photoDetailedComments = photo.comments;
    var bigPictureElement = document.querySelector('.big-picture');
    var bigPictureImgElement = document.querySelector('.big-picture__img img');
    var likesCountElement = document.querySelector('.likes-count');
    var socialCaptionElement = document.querySelector('.social__caption');
    var commentsCountElement = document.querySelector('.comments-count');

    window.constant.commentsLoaderElement.classList.remove('hidden');
    window.constant.commentsLoaderElement.addEventListener('click', onLoadMoreClick);
    document.addEventListener('keydown', onKeyDownCloseBigPicture);
    document.addEventListener('click', onClickCloseBigPicture);

    bigPictureElement.classList.remove('hidden');
    bigPictureImgElement.src = photo.url;
    likesCountElement.textContent = photo.likes;
    socialCaptionElement.textContent = photo.description;
    commentsCountElement.textContent = window.constant.photoDetailedComments.length;

    var displayedComments = window.constant.photoDetailedComments.slice(0, window.constant.NUMBERS_INITIAL_COMMENTS);
    window.constant.numOfDisplayedComments = displayedComments.length;
    renderComments(displayedComments);

    window.constant.bodyElement.classList.add('modal-open');
  }

  function onLoadMoreClick() {
    window.constant.numOfDisplayedComments += window.constant.NUMBERS_MORE_COMMENTS;
    if (window.constant.numOfDisplayedComments >= window.constant.photoDetailedComments.length) {
      window.constant.numOfDisplayedComments = window.constant.photoDetailedComments.length;
      window.constant.commentsLoaderElement.classList.add('hidden');
    }
    renderComments(window.constant.photoDetailedComments.slice(0, window.constant.numOfDisplayedComments));
  }

  function renderComments(comments) {
    var commentsCountShownElement = document.querySelector('.comments-count-shown');
    commentsCountShownElement.textContent = window.constant.numOfDisplayedComments;
    var socialCommentsElement = document.querySelector('.social__comments');
    socialCommentsElement.textContent = '';
    var templateSocialCommentElement = document.querySelector('#social__comment').cloneNode(true);
    comments.forEach(function (comment) {
      socialCommentsElement.appendChild(renderCommentForBigPicture(templateSocialCommentElement, comment));
    });
  }

  function changeFilter(filterId) {
    document.querySelectorAll('.img-filters__button').forEach(function (el) {
      el.classList.remove('img-filters__button--active');
    });

    switch (filterId) {
      case 'filter-default': {
        renderContent(window.constant.loadedPhotos);
        break;
      }
      case 'filter-random': {
        var copyRandom = window.constant.loadedPhotos.slice();
        var shuffled = copyRandom.sort(function () {
          return 0.5 - Math.random();
        });
        var selected = shuffled.slice(0, window.constant.NUMBERS_RANDOM_PHOTOS);
        renderContent(selected);
        break;
      }
      case 'filter-discussed': {
        var copyDiscussed = window.constant.loadedPhotos.slice();
        var sorted = copyDiscussed.sort(function (photoA, photoB) {
          return photoB.comments.length - photoA.comments.length;
        });
        renderContent(sorted);
        break;
      }
    }
    document.getElementById(filterId).classList.add('img-filters__button--active');
  }

  function initPictureFilters() {
    var changeFilterDebounce = window.utils.debounce(function (element) {
      changeFilter(element.id);
    }, 500, false);
    document.querySelectorAll('.img-filters__button').forEach(function (element) {
      element.addEventListener('click', function () {
        changeFilterDebounce(element);
      });
    });
  }

  function loadPhotos() {
    window.backend.load(function (photos) {
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      window.constant.loadedPhotos = photos;
      renderContent(photos);
    }, onPhotosLoadError);
  }

  function init() {
    var pictureCancelElement = document.querySelector('#picture-cancel');
    pictureCancelElement.addEventListener('click', closeBigPicture);
    loadPhotos();
    initPictureFilters();
  }

  window.pictures = {
    init: init,
    changeFilter: changeFilter,
  };
})();
