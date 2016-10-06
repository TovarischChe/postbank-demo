(function() {
    'use strict';

    module.exports = angular.module('shared.filters', [])

    .filter('desctopArticleOrder', function() {
      return function(id) {

        return 1;
    };
    })

    .filter('supertrusthtml', function() {
      return function(value) {
        var textArea = document.createElement('textarea');
            textArea.innerHTML = value;
            return textArea.value;
      };
    });

})();
