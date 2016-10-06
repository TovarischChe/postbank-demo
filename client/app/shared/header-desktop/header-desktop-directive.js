(function() {
  'use strict';

  module.exports = ['Config', 'sHome', '$rootScope', '$filter', function(Config, sHome, $rootScope, $filter) {

    function link(scope) {
      scope.navLinks = [{
        title: 'Home',
        href: 'home'
      }, {
        title: 'Help',
        href: 'seed-help'
      }];
      scope.toggleArticleList = function(activeId) {
        $rootScope.$broadcast('toggleArticleList', activeId);
      };
      scope.openSubscribePopup = sHome.openSubscribePopup;
    }

    return {
      restrict: 'E',
      templateUrl: Config.rootPath + 'shared/header-desktop/header-desktop-view.html',
      link: link,
      replace: true
    };
  }];

}());
