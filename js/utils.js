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

  function debounce(cb) {
    var DEBOUNCE_INTERVAL = 500;
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.utils = {
    getRandomNumberFromRange: getRandomNumberFromRange,
    getRandomElementFromArray: getRandomElementFromArray,
    debounce: debounce
  };

})();
