(function () {
    'use strict';
    module.exports = ['Config', 'sHome', '$compile', '$rootScope', function (Config, sHome, $compile, $rootScope) {
        function link(scope, element, attrs) {
            var Fn = {
                content: function (data) {
                    var children = element[0].children;

                    var i = 0;
                    while (true) {
                        if(children[i].getAttribute('data') == 'articleContent') {
                            children[i].remove();
                        } else {
                            i += 1;
                        }
                        if (i >= children.length) {
                            break;
                        }
                    }
                    data.forEach(function (item, index) {
                        var html = '';
                        switch (item.type) {
                            case 'text-image':
                                html = $compile('<text-image data="articleContent" slider-settings="sliderSettings" index="' + index + '"></text-image>')(scope);
                                break;
                            case 'linklist':
                                scope.item = item;
                                html = $compile('<listlink data="articleContent" index="' + index + '></listlink>')(scope);
                                break;
                            case 'quote':
                                scope.item = item;
                                html = $compile('<quote data="articleContent" index="' + index + '></quote>')(scope);
                                break;
                        }
                        element.prepend(html);

                    });
                }
            };

            scope.active = false;
            scope.$watch('articleContent', function (newData, oldData) {

                if (newData) {
                    scope.active = true;
                    Fn.content(newData);
                } else {
                    scope.active = false;
                }

            });

            scope.showCatFilter = function (article) {
                $rootScope.$broadcast("showCatFilter", article);
            };

            scope.showFullArticleFunc = function (id) {
                $rootScope.$broadcast("showFullArticle", id);
            };

        }

        // Return directives options
        return {
            scope: {
                article: '=',
                articleContent: '=',
                sliderSettings: '='
            },
            templateUrl: Config.rootPath + 'components/common/home/content/content-view.html',
            replace: true,
            link: link
        };
    }];
}());
