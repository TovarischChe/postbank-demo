(function () {
  'use strict';
  module.exports = ['Config', 'sHome', '$sce', function (Config, sHome, $sce) {
    function link(scope, element, attrs) {
      scope.config = {
                preload: "none",
                sources: [
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
                ],
                tracks: [
                    {
                        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                        label: "English",
                        default: ""
                    }
                ],
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                }
            };

      scope.myInterval = 5000;

      scope.data[scope.index].headline = $sce.trustAsHtml(scope.data[scope.index].headline.toString());
      scope.data[scope.index].text = $sce.trustAsHtml(scope.data[scope.index].text.toString());


      if (scope.data[scope.index].images.length > 0 && scope.data[scope.index].images[0].imageLinkType === 'video') {
            scope.data[scope.index].video =
            {
              sources: [
                {src: $sce.trustAsResourceUrl(scope.data[scope.index].images[0].imageLink), type: "video/mp4"},
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
            };
      }

      //(function() {
      //  var overlay = document.getElementById( 'overlay' ),
      //    overlayClose = overlay.querySelector( 'button' ),
      //    header = document.getElementById( 'header'),
      //  switchBtnn = header.querySelector( 'button.slider-switch' ),
      //    toggleBtnn = function() {
      //      if( slideshow.isFullscreen ) {
      //        classie.add( switchBtnn, 'view-maxi' );
      //      }
      //      else {
      //        classie.remove( switchBtnn, 'view-maxi' );
      //      }
      //    },
      //    toggleCtrls = function() {
      //      if( !slideshow.isContent ) {
      //        classie.add( header, 'hide' );
      //      }
      //    },
      //    toggleCompleteCtrls = function() {
      //      if( !slideshow.isContent ) {
      //        classie.remove( header, 'hide' );
      //      }
      //    },
      //    slideshow = new DragSlideshow( document.getElementById( 'slideshow' ), {
      //      // toggle between fullscreen and minimized slideshow
      //      onToggle : toggleBtnn,
      //      // toggle the main image and the content view
      //      onToggleContent : toggleCtrls,
      //      // toggle the main image and the content view (triggered after the animation ends)
      //      onToggleContentComplete : toggleCompleteCtrls
      //    }),
      //    toggleSlideshow = function() {
      //      slideshow.toggle();
      //      toggleBtnn();
      //    },
      //    closeOverlay = function() {
      //      classie.add( overlay, 'hide' );
      //    };
      //
      //  // toggle between fullscreen and small slideshow
      //  switchBtnn.addEventListener( 'click', toggleSlideshow );
      //  // close overlay
      //  overlayClose.addEventListener( 'click', closeOverlay );
      //
      //}());

    }
    // Return directives options
    return {
      restrict: 'E',
      scope: {
        data: '=data',
        index: '@index',
        sliderSettings: '=sliderSettings'
      },
      templateUrl: Config.rootPath + 'components/common/home/content/text-image/text-image-view.html',
      replace: true,
      link: link
    };
  }];
}());
