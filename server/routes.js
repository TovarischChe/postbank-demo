/*jslint unparam:true*/

'use strict';

var apiUrl = "/api/";

var dataLoader = require('./libs/loader.js');

var basicHandler = function (promise, req, res, func) {
  promise
    .fail(function (err) {
      res.status(500).send(err);
    })
    .then(function (data) {
      res.status(200).send(data);
    });
};

var filterArticlesHandler = function (promise, req, res, func) {
  promise
    .fail(function (err) {
      res.status(500).send(err);
    })
    .then(function (data) {
      if(req.query.q && req.query.q.length > 1) {
        var info = [];
        data.data.forEach(function (item, index) {
          if( item.subheadline.toLowerCase().indexOf( req.query.q ) > -1 ) {
            info.push(item);
          }
        });
        data.data = info;
      }
      if(req.query.categoryId) {
        var info = [];
        data.data.forEach(function(item, index){
          if(item.category.id == parseInt(req.query.categoryId)){
            info.push(item);
          }
        });
        data.data = info;
      }
      res.status(200).send(data);
    });
};

module.exports = function (app) {

  app
    .get(apiUrl + 'categories', function (req, res) {
      basicHandler(dataLoader('categories.json'), req, res);
    })
    .get(apiUrl + 'articles', function (req, res) {
      filterArticlesHandler(dataLoader('articles.json'), req, res);
    })
    .get(apiUrl + 'article/:id', function (req, res) {
      basicHandler(dataLoader('article_details.json'), req, res);
    })
    .post(apiUrl + 'author-message', function (req, res) {
      basicHandler(dataLoader('message.json'), req, res);
    })
    .post(apiUrl + 'subscribe', function (req, res) {
      basicHandler(dataLoader('subscribe.json'), req, res);
    })
  ;

};
