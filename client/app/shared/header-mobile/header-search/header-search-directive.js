(function () {
    'use strict';

    module.exports = ['Config', 'sHome', '$rootScope', '$filter', function (Config, sHome, $rootScope, $filter) {

        function link(scope) {

            scope.searchOpen = false;
            scope.hideOverlay = true;
            scope.open = function () {
                if (scope.searchOpen) {
                    scope.searchOpen = false;
                } else {
                    scope.searchOpen = true;
                }
            };

            scope.clear = function () {
                scope.open();
                scope.text = '';
                scope.articles = $rootScope.articles;
            };

            scope.text = '';
            scope.$watch('text', function (text) {
                scope.hideOverlay = false;
                if(text != '') {
                    scope.articles = $filter('filter')($rootScope.articles, {$: text}, false);
                }
            });
        }

        return {
            templateUrl: Config.rootPath + 'shared/header-mobile/header-search/header-search-view.html',
            scope: {
                articles: '=articles',
                category: '=category'
            },
            link: link,
            replace: true
        };
    }];

}());
