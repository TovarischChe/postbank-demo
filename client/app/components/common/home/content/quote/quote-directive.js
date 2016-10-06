(function () {
  'use strict';
  module.exports = ['Config', 'sHome', function (Config, sHome) {
    function link(scope, element, attrs) {


    }
    // Return directives options
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: Config.rootPath + 'components/common/home/content/text-image/text-image-view.html',
      replace: true,
      link: link
    };
  }];
}());