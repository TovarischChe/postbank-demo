(function () {
    'use strict';

    angular.module('app', [
        'ngRoute',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ui.bootstrap',
        'ui.bootstrap.collapse',
        'ui.bootstrap.modal',
        'ksSwiper',
        'sticky',
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "com.2fdevs.videogular.plugins.overlayplay",
        'ngLodash',
        'duScroll',
        'angular-inview',
        require('./components').name,
        require('./shared').name
    ])
        .config(require('./app.routes'))
        .service('Query', require('./app.queries'))
        .run(['$rootScope', '$q', 'Query', '$sce', '$routeParams',
            function ($rootScope, $q, Query, $sce, $routeParams) {
                $rootScope.presse = false;
                $rootScope.$on('$routeChangeSuccess', function() {
                    if($routeParams.presse == 1) {
                        $rootScope.presse = true;
                    }
                });

                $rootScope.appReady = false;

                Query.articles.query(function (response) {
                    $rootScope.articles = response;

                    angular.forEach($rootScope.articles, function (article, key) {

                        $rootScope.articles[key].trustedText = $sce.trustAsHtml(article.textEditor);

                    });
                    $rootScope.appReady = true;
                });
            }])

}());

