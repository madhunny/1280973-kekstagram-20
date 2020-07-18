'use strict';
(function () {

  function generateComments(commentsCount) {
    var comments = [];
    for (var i = 1; i <= commentsCount; i++) {
      var comment = {
        avatar:
          'img/avatar-' +
          window.utils.getRandomNumberFromRange(window.constant.AVATAR_MIN, window.constant.AVATAR_MAX) +
          '.svg',
        message: window.utils.getRandomElementFromArray(window.constant.MESSAGES),
        name: window.utils.getRandomElementFromArray(window.constant.NAMES),
      };
      comments.push(comment);
    }
    return comments;
  }

  function generatePhotos(photosCount, commentsCount) {
    var photos = [];
    for (var i = 1; i <= photosCount; i++) {
      var photo = {
        url: 'photos/' + i + '.jpg',
        description: ' ',
        likes: window.utils.getRandomNumberFromRange(window.constant.LIKES_MIN, window.constant.LIKES_MAX),
        comments: generateComments(commentsCount),
      };
      photos.push(photo);
    }
    return photos;
  }

  window.data = {
    photos: generatePhotos
  };

})();
