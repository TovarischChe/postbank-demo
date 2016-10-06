(function(){
  'use strict';

  module.exports = angular.module('shared.services', [])
  .service('simpleModal', function () {
    return function(header, body) {

      var tpl = '<div class="modal-header"><button type="button" class="close" ng-click="close()"><span aria-hidden="true">×</span></button>';

      if(header === null) {
        tpl += '<strong>{{header}}</strong></div>';
      }else{
        tpl += '<strong>'+ header +'</strong></div>';
      }
      tpl += '<div class="modal-body">' + body + '</div>';

      var cntrl = function ($scope, $modalInstance) {
        $scope.header = header;
        $scope.close = function () {
          $modalInstance.dismiss();
        };
      };
      return {template: tpl, controller: cntrl};
    };
  })
  //need update this service for scroll to top when load new article from rilated posts
  .service('scrollToTop', function () {
    return function() {

        var scrollStep = -window.scrollY / (scrollDuration / 15),
          scrollInterval = setInterval(function() {
            if (window.scrollY !== 0) {
              window.scrollBy(0, scrollStep);
            } else {
              clearInterval(scrollInterval);
            }
          }, 15);
    };
  })
  .service('scrollToY', function () {
    return function(y) {
      var way = y - window.scrollY;
      var step = 1;
      if (way < 0) {
        way = way * -1;
        step = -1;
      }
      for (var i = 0; i <= way; i++) {
        setTimeout(function () {
          window.scrollBy(0, step);
        }, i * 0.5)
      }
    };
  });


})();
