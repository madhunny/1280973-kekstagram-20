'use strict';
(function () {

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

  window.utils = {
    getRandomNumberFromRange: getRandomNumberFromRange,
    getRandomElementFromArray: getRandomElementFromArray,
  };

})();
