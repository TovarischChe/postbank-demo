(function () {
    'use strict';

    module.exports = ['Config', 'sHome', '$window', '$rootScope', function (Config, sHome, window, rootScope) {

        function link(scope) {

            scope.navLinks = [
                {title: 'Home', href: 'home'},
                {title: 'Help', href: 'seed-help'}
            ];

            scope.showCloseBtn = false;

            scope.closePost = function () {
                if (scope.articleOpen != null && scope.articles[scope.articleOpen]) {
                    scope.articles[scope.articleOpen].fullContent = '';
                    scope.articles[scope.articleOpen].opened = false;
                    scope.articleOpen = null;
                    scope.showCloseBtn = false;
                    window.scrollTo(0, rootScope.pageYOffset);
                }
            };

            scope.$watch("articleInViewport", function (data) {

                if (data != null) {
                    scope.showCloseBtn = true;
                } else {
                    scope.showCloseBtn = false;
                }
            });

            scope.openSubscribePopup = sHome.openSubscribePopup;
        }

        return {
            restrict: 'E',
            templateUrl: Config.rootPath + 'shared/header-mobile/header-mobile-view.html',
            scope: {
                articleOpen: '=articleOpen',
                articleInViewport: '=articleInViewport',
                articles: '=articles',
                category: '=category'
            },
            link: link,
            replace: true
        };
    }];

}());