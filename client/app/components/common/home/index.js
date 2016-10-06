module.exports = angular.module('components.common.home', [])
  // forms
  .directive('authorMessageForm', require('./author-message/author-message-form-directive.js'))
  // content blocks
  .directive('textImage', require('./content/text-image/text-image-directive.js'))
  .directive('linklist', require('./content/linklist/linklist-directive.js'))
  .directive('quote', require('./content/quote/quote-directive.js'))

  .directive('articleContent', require('./content/content-directive.js'))
  .service('sHome', require('./home-service.js'));
