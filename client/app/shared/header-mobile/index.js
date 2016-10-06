module.exports = angular.module('shared.headerMobile', [
])
  .directive('appHeaderMobile', require('./header-mobile-directive.js'))
  .directive('appHeaderSearch', require('./header-search/header-search-directive.js'))
  .directive('appHeaderFilter', require('./header-filter/header-filter-directive.js'));