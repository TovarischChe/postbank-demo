(function () {
  'use strict';

  module.exports = ['Config', function (Config) {

    function link(scope) {
      scope.navLinks = [
        {title: 'Impressum', href: 'home'},
        {title: 'AGB', href: 'home'},
        {title: 'Datenschutzhinweise', href: 'home'}
      ];
    }

    return {
      templateUrl: Config.rootPath + 'shared/footer/footer-view.html',
      link: link,
      replace: true
    };
  }];

}());