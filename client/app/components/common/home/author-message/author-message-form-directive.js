(function () {
  'use strict';
  module.exports = ['Config', 'sHome', function (Config, sHome) {
    function link(scope, element, attrs) {

      scope.form = {
        authorId: scope.authorData
      };

      scope.save = function () {
        sHome.sendMessage(scope.form).then(function (res) {
          // TODO: do something with responsive
          scope.$parent.close && scope.$parent.close();
        });
      }
    }

    // Return directives options
    return {
      restrict: 'E',
      scope: {
        authorData: '=author'
      },
      templateUrl: Config.rootPath + 'components/common/home/author-message/author-message-form-view.html',
      replace: true,
      link: link
    };
  }];

}());