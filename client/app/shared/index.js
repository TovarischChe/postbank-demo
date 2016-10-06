module.exports = angular.module('shared', [
  require('./filters.js').name,
  require('./directives.js').name,
  require('./services.js').name,
  require('./header-mobile').name,
  require('./header-desktop').name,
  require('./navigation').name
])
  .constant('Config', require('./config'));
