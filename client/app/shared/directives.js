(function() {
  'use strict';

  module.exports = angular.module('shared.directives', [])

      .directive('fixedClasses', function() {
        return {
          restrict: 'A',
          link: function(scope, $elm, attrs) {
            window.onscroll = function() {
              var scrollPosition = document.documentElement.scrollTop||document.body.scrollTop;
              if (scrollPosition > 83) {
                $elm.addClass('fixed-table');
              } else {
                $elm.removeClass('fixed-table');
              }
            };
          }
        };
      })

      .directive('scrollOnClick', function() {
        return {
          restrict: 'A',
          link: function(scope, $elm, attrs) {
            window.onscroll = function() {
              var scrollPosition = document.body.scrollTop;
              var node = document.getElementById("footer");
              var curtop = 0;
              var curtopscroll = 0;
              var windowHeight = window.innerHeight;
              if (node.offsetParent) {
                do {
                  curtop += node.offsetTop;
                  curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
                } while (node = node.offsetParent);

                var footerPositopn = curtop - curtopscroll;
              }

              if (scrollPosition > 50) {
                $elm.addClass('show');
              } else {
                $elm.removeClass('show');
              }

              if (footerPositopn < windowHeight) {
                $elm.addClass('fixed');
              } else {
                $elm.removeClass('fixed');
              }

            };

            $elm.on('click', function() {

              function scrollToTop(scrollDuration) {
                var scrollStep = -window.scrollY / (scrollDuration / 15),
                    scrollInterval = setInterval(function() {
                      if (window.scrollY !== 0) {
                        window.scrollBy(0, scrollStep);
                      } else {
                        clearInterval(scrollInterval);
                      };
                    }, 15);
              }

              scrollToTop(300);

            });
          }
        }
      })
      .run(
      ["$templateCache", function($templateCache) {
        $templateCache.put("vg-templates/vg-hvolume-bar",
            '<div class="horizontalVolumeBar">\
                  <div class="volumeBackground" ng-click="onClickVolume($event)" ng-mousedown="onMouseDownVolume()" ng-mouseup="onMouseUpVolume()" ng-mousemove="onMouseMoveVolume($event)" ng-mouseleave="onMouseLeaveVolume()">\
                    <div class="volumeValue"></div>\
                    <div class="volumeClickArea"></div>\
                  </div>\
                </div>');
      }]
  )
      .directive("vgHVolumeBar", ["VG_UTILS", function(VG_UTILS) {
        return {
          restrict: "E",
          require: "^videogular",
          templateUrl: function(elem, attrs) {
            return attrs.vgTemplate || 'vg-templates/vg-hvolume-bar';
          },
          link: function(scope, elem, attr, API) {
            var isChangingVolume = false;
            var volumeBackElem = angular.element(elem[0].getElementsByClassName("volumeBackground"));
            var volumeValueElem = angular.element(elem[0].getElementsByClassName("volumeValue"));

            scope.onClickVolume = function onClickVolume(event) {
              event = VG_UTILS.fixEventOffset(event);
              var volumeWidth = parseInt(volumeBackElem.prop("offsetWidth"));
              var value = event.offsetX * 100 / volumeWidth;
              var volValue = value / 100;
              API.setVolume(volValue);
            };

            scope.onMouseDownVolume = function onMouseDownVolume() {
              isChangingVolume = true;
            };

            scope.onMouseUpVolume = function onMouseUpVolume() {
              isChangingVolume = false;
            };

            scope.onMouseLeaveVolume = function onMouseLeaveVolume() {
              isChangingVolume = false;
            };

            scope.onMouseMoveVolume = function onMouseMoveVolume(event) {
              if (isChangingVolume) {
                event = VG_UTILS.fixEventOffset(event);
                var volumeWidth = parseInt(volumeBackElem.prop("offsetWidth"));
                var value = event.offsetX * 100 / volumeWidth;
                var volValue = value / 100;

                API.setVolume(volValue);
              }
            };

            scope.updateVolumeView = function updateVolumeView(value) {
              value = value * 100;
              volumeValueElem.css("width", value + "%");
              volumeValueElem.css("right", (100 - value) + "%");
            };

            scope.onChangeVisibility = function onChangeVisibility(value) {
              elem.css("visibility", value);
            };

            elem.css("visibility", scope.volumeVisibility);

            scope.$watch("volumeVisibility", scope.onChangeVisibility);

            //Update the volume bar on initialization, then watch for changes
            scope.updateVolumeView(API.volume);
            scope.$watch(
                function() {
                  return API.volume;
                },
                function(newVal, oldVal) {
                  if (newVal != oldVal) {
                    scope.updateVolumeView(newVal);
                  }
                }
            );
          }
        };
      }]).directive('scrollIf', ["$document", function($document) {
        return function (scope, element, attributes) {
          element.on('click', function () {

              function easeInOutQuad(t) {
                  return t<.5 ? 2*t*t : -1+(4-2*t)*t;
              }

              function easeInOutCubic(t) {
                  return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
              }

              function easeInOutQuint(t) {
                  return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t;
              }

              // acceleration until halfway, then deceleration
              function easeInOutQuart(t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }

              var el = document.getElementById('footer');
              var body = document.getElementsByTagName('body')[0];
              var way = el.offsetTop - body.scrollTop;

              $document.scrollToElementAnimated(el, 0, 500, easeInOutQuart );

          });
        }
      }]);

})();