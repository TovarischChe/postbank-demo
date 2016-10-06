(function () {
    'use strict';

    module.exports = ['Config', 'sHome', '$rootScope','lodash', function (Config, sHome, $rootScope, lodash) {

        function link(scope) {

            scope.isCollapsed = true;

            scope.open = function () {
                if (scope.isCollapsed) {
                    scope.isCollapsed = false;
                } else {
                    scope.isCollapsed = true;
                }
            };

            scope.clearFilter = function () {
                scope.articles = $rootScope.articles;
                scope.selected = false;
            };

            scope.categories = lodash.groupBy($rootScope.articles, function (item) {
                return item.category.id;
            });

            scope.filterArticles = function (cat) {
                scope.category = cat[0].category.name;

                    scope.articles = cat;
                scope.isCollapsed = true;
                scope.selected = true;
            };

        }

        return {
            restrict: 'E',
            templateUrl: Config.rootPath + 'shared/header-mobile/header-filter/header-filter-view.html',
            scope: {
                articles: '=articles',
                category: '=category'
            },
            link: link,
            replace: true
        };
    }];

}());