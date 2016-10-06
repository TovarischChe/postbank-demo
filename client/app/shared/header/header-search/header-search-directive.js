(function () {
  'use strict';

  module.exports = ['Config', 'sHome', function (Config, sHome) {

    function link(scope) {

        scope.searchOpen = false;

        scope.open = function(){
            if(scope.searchOpen){
                scope.searchOpen = false;
            }else{
                scope.searchOpen = true;
            }
        };

        sHome.getArticles().then(function (res) {
            scope.articles = res.data;
        });

    }

    return {
      templateUrl: Config.rootPath + 'shared/header/header-search/header-search-view.html',
      scope: {},
      link: link,
      replace: true
    };
  }];

}());