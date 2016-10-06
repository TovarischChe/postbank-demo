(function () {
    'use strict';

    module.exports = ['$scope', 'sHome', '$sce', '$rootScope', '$filter', 'lodash', '$window', '$document', '$route', '$routeParams', function ($scope, sHome, $sce, $rootScope, $filter, lodash, $window, $document, $route, $routeParams) {

        $scope.sliderSettings = {
            'direction': "horizontal"
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

        $rootScope.showFullArticle = false;

        var currentPos = 0;
        angular.element($window).bind('scroll', function() {
            $scope.windowScroll();
        });

        $scope.windowScroll = function() {
            
            var el = document.getElementById('page-holder');
            var windowScrollY = $window.scrollY || $window.pageYOffset;
            var body = document.getElementsByTagName('body')[0];
            var bodyClass = body.getAttribute('class') || "";
            var isOverflowHidden = bodyClass.indexOf('state-overflow-hidden') > -1;

            if (!isOverflowHidden && el.offsetParent.offsetTop + parseInt(el.clientHeight, 10) < windowScrollY + $window.innerHeight) {
                $scope.$apply(toggleArticleList(null, null, scrolling));
                $scope.stateVisible = true;
                articleVisible = true;
                currentPos = windowScrollY;
            }
        };

        //show the first article
        if($routeParams.article_id === undefined) {
            $scope.article = $rootScope.articles[0];
            $scope.article.trustedText = $sce.trustAsHtml($scope.article.textEditor);
        }


        $scope.toggleDetails = function () {
            $rootScope.showFullArticle = !$rootScope.showFullArticle;
        };

        var scrolling = false;
        var articleVisible = false;
        $scope.stateVisible = false;
        $rootScope.$on("showFullArticle", function (event, id) {
            $scope.showFullArticleFunc(id);
        });

        $rootScope.$on("showCatFilter",
            function handleCatEvent(event, article) {
                $scope.showFilteredArticles(article.category, article.id);
            }
        );

        //show filtered articles by categoryId
        $scope.showFilteredArticles = function (cat, activeId) {
            var articleIndex = false;
            $scope.selectedCategory = cat[0].category.name;

            $scope.articles = cat;
            //set active class and find active index
            angular.forEach($scope.articles, function (item, key) {
                if (item.id === activeId) {
                    $scope.articles[key].active = true;
                    articleIndex = key;
                }
            });

            //remove article from articles list and add to first position if it's not first
            if (articleIndex && articleIndex !== 0) {
                var activeArticle = $scope.articles[articleIndex];
                $scope.articles.unshift(activeArticle);
                $scope.articles.splice(articleIndex + 1, 1);
            }

            $scope.isCollapsed = false;
            $scope.articleShow = true;

        };

        var toggleArticleList = function (e, activeId) {
            var articleIndex = false;
            var body = document.getElementsByTagName('body')[0];
            var bodyClass = body.getAttribute('class') || "";
            var isOverflowHidden = bodyClass.indexOf('state-overflow-hidden') > -1;
            var navFilter = document.getElementById("navFilter");

            // set overflow hidden class to body
            body.setAttribute('class', bodyClass + " state-overflow-hidden");

            //unbind scroll event on window
            angular.element($window).unbind('scroll');

            //bind scroll event on navFilter container
            angular.element(navFilter).bind('scroll', function() {

                if(this.scrollTop <= 4) {
                    $scope.clearAll();
                    $scope.$apply();
                    angular.element(navFilter).unbind('scroll');
                }
            });    

            $scope.articles = $rootScope.articles;
            //set active class and find active index
            angular.forEach($scope.articles, function(item, key) {
                $scope.articles[key].active = false;
                if (item.id === activeId) {
                    $scope.articles[key].active = true;
                    articleIndex = key;
                }
            });

            //remove article from articles list and add to first position if it's not first
            if (articleIndex && articleIndex !== 0) {
                var activeArticle = $scope.articles[articleIndex];
                $scope.articles.unshift(activeArticle);
                $scope.articles.splice(articleIndex + 1, 1);
            }

            $scope.isCollapsed = false;
            $scope.articleShow = true;
            $scope.stateVisible = true;   
            $scope.showFilter = false;

            window.setTimeout(function() {
                //scroll initially 5px
                document.getElementById("navFilter").scrollTop = 5;
            }, 1000);
                            
        };

        $scope.showFullArticleFunc = function (id) {
            $scope.article = $filter('filter')($rootScope.articles, {id: id}, true)[0];
            $scope.article.trustedText = $sce.trustAsHtml($scope.article.textEditor);
            $rootScope.showFullArticle = true;
            //set data for related articles
            var tmpArray = [];
            angular.forEach($scope.article.relatedArticlesIds, function (item, key) {
                var related = $filter('filter')($rootScope.articles, {id: item}, true)[0];
                tmpArray.push({
                    "id": related.id,
                    "articleImage": {
                        "imageUrl": related.articleImage.imageUrl,
                        "altText": related.articleImage.altText,
                    },
                    "category": {
                        "id": related.category.id,
                        "name": related.category.name
                    },
                    "subheadline": related.subheadline,
                    "created": related.created
                });
            });
            $scope.article.fullContent = $scope.article.content;
            $scope.article.relatedArticles = tmpArray;

            // dirty
            setInterval(function() {
                window.dispatchEvent(new Event('resize'));
            }, 500)
        };


        if($routeParams.article_id) {
            var initialId = parseInt($routeParams.article_id);
            $rootScope.showFullArticle = true;
            $scope.showFullArticleFunc(initialId);
        }



        $scope.categories = lodash.groupBy($rootScope.articles, function (item) {
            return item.category.id;
        });

        $scope.showCatFilter = function (category, article) {
            $rootScope.$broadcast("showCatFilter", category, article);
        };

        $rootScope.$on('toggleArticleList', toggleArticleList);

        $scope.openSendMesageToAuthorPopup = sHome.openSendMesageToAuthorPopup;

        //show single article
        $scope.showArticle = function (id) {
            $scope.article = $filter('filter')($rootScope.articles, {id: id}, true)[0];
            angular.forEach($scope.articles, function (item, key) {
                item.active = item.id === $scope.article.id;
            });
            $rootScope.showFullArticle = false;

            var top = 0;
            var duration = 500; //milliseconds

            //Scroll to the exact position
            $document.scrollTop(top, duration).then(function() {
                $scope.clearAll();
                $rootScope.showFullArticle = true;
                $scope.showFullArticleFunc(id);
            });
        };

        $scope.open = function () {
            if ($scope.searchOpen) {
                $scope.searchOpen = false;
            } else {
                $scope.searchOpen = true;
                $scope.articles = $rootScope.articles;
                $scope.articleShow = true;
                $scope.selectedCategory = false;
            }
        };

        $scope.clear = function () {
            $scope.text = '';
        };

        $scope.removeSelectedCat = function () {
            $scope.selectedCategory = false;
            $scope.toggleArticleList();
            $scope.showFilter = false;
        };

        $scope.filterFunc = function () {
            if($scope.selectedCategory) {
                $scope.articles = $rootScope.articles;
                $scope.articleShow = true;
                $scope.showFilter = false;
            } else {
                $scope.articleShow = false;
                $scope.showFilter = true;
            }

            $scope.searchOpen = false;
            $scope.selectedCategory = false;
        };


        $scope.clearAll = function() {
            $scope.stateVisible = false;
            $scope.selectedCategory = false;
            $scope.searchOpen = false;
            $scope.text = '';
            scrolling = false;
            var body = document.getElementsByTagName('body')[0];
            var navFilter = document.getElementById("navFilter");
            body.setAttribute('class', body.getAttribute('class').replace('state-overflow-hidden', ''));
            navFilter.setAttribute('class', navFilter.getAttribute('class').replace('scroll-bind', ''));

            window.setTimeout(function() {
                angular.element($window).bind('scroll', function() {
                    $scope.windowScroll();
                });    
            }, 1000);
            
        };
    }];

}());
