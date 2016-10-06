(function () {
  'use strict';

  module.exports = ['$resource', 'Config', function ($resource, Config) {
    return {

      categories: $resource(Config.apiPath + 'categories', {}, {
        get: {method: 'GET'}
      }),
      articles: $resource('server/data/articles.json', {}, {
        get: {method:'GET'}
      }),
      article: $resource(Config.apiPath + 'article/:id', {id: '@id'}, {
        get: {method: 'GET'}
      }),
      sendMessage: $resource(Config.apiPath + 'author-message', {}, {
        post: {method: 'POST'}
      }),
      subscribe: $resource(Config.apiPath + 'subscribe', {}, {
        post: {method: 'POST'}
      })

    };
  }];

}());
