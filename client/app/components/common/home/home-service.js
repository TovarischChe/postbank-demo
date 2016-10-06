(function () {
  'use strict';

  module.exports = ['Config', 'Query', 'simpleModal', '$modal', '$compile', function (Config, Query, simpleModal, $modal, $compile) {

    var Fn = {
      getCategories: function () {
        return Query.categories.get({}).$promise;
      },
      getArticles: function (q, categoryId, offset) {
        categoryId = categoryId || null;
        offset = offset || null;
        return Query.articles.get({q: q, categoryId: categoryId, offset: offset}).$promise;
      },
      getArticle: function (id) {
        return Query.article.get({id: id}).$promise;
      },
      sendMessage: function (data) {
        return Query.sendMessage.post({data: data}).$promise;
      },

      /**
       * Open popup for send message to author
       */
      openSendMesageToAuthorPopup: function (author, windowClass) {
        var modal = simpleModal('<span class="article-author"><img width="40" ng-src="'+author.authorImageUrl +'" alt="' + author.authorImageAltText + '" > '+author.authorName+'</span>', '<author-message-form author="author"></author-message-form>');
        $modal.open({
          template: modal.template,
          windowClass: windowClass ? windowClass : '',
          controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
            $scope.close = function () {$modalInstance.dismiss(); };
            $scope.author = author;
          }]
        });
      },

      /**
       * Open popup for subscribe
       */
      openSubscribePopup: function (windowClass) {
        $modal.open({
          templateUrl: Config.rootPath + 'components/common/home/subscribe/subscribe-form-view.html',
          windowClass: windowClass ? windowClass : '',
          controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
            $scope.step = 1;
            $scope.email = '';
            $scope.error = false;
            $scope.submitSubscribeForm = function() {
              $scope.error = $scope.email.length == 0;
              if (!$scope.error) {
                Query.subscribe.post({data: {email: $scope.email}}).$promise.then(function (res) {
                  $scope.step = 2;
                });
              }
            };
            $scope.close = function () {
              $modalInstance.dismiss();
            };
          }]
        });
      }
    };

    return Fn;
  }];

}());
