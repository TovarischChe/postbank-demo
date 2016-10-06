(function () {
    'use strict';

    module.exports = ['$scope', 'sHome', '$sce', '$rootScope', '$filter', '$window', 'scrollToY', '$document', function ($scope, sHome, $sce, $rootScope, $filter, $window, scrollToY, $document) {

        $scope.sliderSettings = {
            'direction': 'vertical'
        };

        $scope.config = {
            sources: [
                {src: $sce.trustAsResourceUrl("/client/images/videogular.mp4"), type: "video/mp4"},
                //{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                //{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
            ],
            tracks: [
                {
                    src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                    kind: "subtitles",
                    srclang: "en",
                    label: "English",
                    default: ""
                }
            ]
            //theme: "client/vendor/videogular-themes-default/videogular.css",
            //plugins: {
            //  poster: "http://www.videogular.com/assets/images/videogular.png"
            //}
        };

        $scope.articleOpen = null;
        $scope.articleInViewport = null;
        $scope.categoryId = null;
        $scope.articles = [];

        // first load
        $scope.articles = $rootScope.articles;
        angular.forEach($scope.articles, function (article, key) {
            $scope.articles[key].trustedText = $sce.trustAsHtml(article.textEditor);
            $scope.articles[key].opened = false;
        });

        $scope.articleInView = function(index, inview) {

            if($scope.articleOpen == index && inview == false) {
                $scope.articleInViewport = null;
            }
            if($scope.articleOpen == index && inview == true) {
                $scope.articleInViewport = index;
            }
        };

        $scope.swiper = {};

        // get one article
        $scope.getArticle = function (index) {

            $scope.articleOpen = index;
            $scope.articleInViewport = index;

            $scope.articles.forEach(function (article, index) {
                $scope.articles[index].fullContent = '';
                article.opened = false;
            });

            $rootScope.pageYOffset = $window.pageYOffset;

            var el = document.getElementById('article-content-' + index);
            setTimeout(function() {
                scrollToY(el.offsetTop + 140);
            }, 200);

            $scope.articles[index].fullContent = $scope.articles[index].content;
            $scope.articles[index].opened = true;

            $scope.articles[index].relatedArticles = false;

            //angular.element($window).bind('scroll', function() {
            //    var el = document.getElementById('article-content-' + index);
            //    if ($window.pageYOffset > el.offsetTop + el.offsetHeight - $window.screen.availHeight * 0.5) {
            //        angular.element($window).unbind('scroll');
            //
            //        setTimeout(function () {
            //            scrollToY(el.offsetTop + 160);
            //        }, 500);
            //    }
            //});

        };

        $scope.openSendMesageToAuthorPopup = sHome.openSendMesageToAuthorPopup;

    }];

}());
