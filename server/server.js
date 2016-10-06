/*jslint nomen:true*/

'use strict';

var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('views', __dirname + '/../');

app.use(express["static"](path.join(__dirname, '../')));

app.use(bodyParser.json());

require('./routes')(app);

app.listen(9001);