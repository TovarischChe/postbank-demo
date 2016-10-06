(function () {
  'use strict';

  var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    //debug = require('gulp-debug'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    debowerify = require("debowerify"),
    nodemon = require('gulp-nodemon'),
    gutil = require('gulp-util'),
    spritesmith   = require('gulp.spritesmith'),
    autoprefixer = require('gulp-autoprefixer'),
    ngAnnotate = require('gulp-ng-annotate'),
    notifier = require("node-notifier"),
    replace = require('gulp-replace');

  /**
   * Build application (browserify and uglify)
   */
  gulp.task('buildApp', function () {
    var app = browserify('./client/main.js', {
      debug: true
    });
    app.bundle()
      .on('error', function (err) {
        gutil.log(gutil.colors.bgRed("Browserify error (App)"), gutil.colors.bgBlue(err.message));
        notifier.notify({title: "Browserify error (App)", message: err.message });
        this.emit("end");
      })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./client/build/'));
  });

  /**
   * Build application vendor (browserify and uglify)
   */
  gulp.task('buildAppVendor', function () {
    var vendor = browserify('./client/vendor.js', {
      debug: false
    });
    vendor.transform(debowerify);
    vendor.bundle()
      .on('error', function (err) {
        gutil.log(gutil.colors.bgRed("Browserify error (Vendor)"), gutil.colors.bgBlue(err.message));
        notifier.notify({title: "Browserify error (Vendor)", message: err.message });
        this.emit("end");
      })
      .pipe(source('vendor.js'))
      .pipe(buffer())
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest('./client/build/'));
  });

  /**
   * Build styles for application from SASS for
   */
  gulp.task('buildSass', function () {
    gulp.src('./client/main.scss')
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sass().on('error', function (err) {
        gutil.log(gutil.colors.bgRed("Sass compile error"), gutil.colors.bgBlue(err.message));
        notifier.notify({title: "Sass compile error", message: err.message });
        this.emit("end");
      }))
      .pipe(autoprefixer({
          browsers: ['last 5 versions'],
          cascade: false
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./client/build/'));
  });

  /**
   * Build styles for vendors from SASS
   */
  gulp.task('buildSassVendor', function () {
    gulp.src('./client/vendor.scss')
      .pipe(sass().on('error', function (err) {
        gutil.log(gutil.colors.bgRed("Sass compile error (vendor)"), gutil.colors.bgBlue(err.message));
        notifier.notify({title: "Sass compile error (vendor)", message: err.message });
        this.emit("end");
      }))
      .pipe(gulp.dest('./client/build/'));
  });

  /**
   * Sprite
  */

  // generate sprite.png and _sprite.scss
  gulp.task('sprites', function () {
    var spriteData = gulp.src('./client/styles/images/icons/*.png').pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '../_sprite.scss',
      retinaSrcFilter: './client/styles/images/icons/*-2x.png',
      retinaImgName: 'sprite-2x.png',
      imgPath: '/client/styles/images/sprite.png',
      padding: 5
    }));
    return spriteData.pipe(gulp.dest('./client/styles/images/'));

  });

  /**
   * Watch for file changes
   */
  gulp.task('watch', function () {
    gulp.watch(['./client/main.js', './client/app/**/*.js'], ['buildApp']);
    gulp.watch('./client/vendor.js', ['buildAppVendor']);
    gulp.watch(['./client/main.scss', './client/styles/*.scss', './client/app/**/*.scss'], ['buildSass']);
    gulp.watch('./client/vendor.scss', ['buildSassVendor']);
    gulp.watch('client/styles/images/icons/*.*', ['sprites']);
  });

  /**
   * Start the server and watch for changes in server folder
   */
  gulp.task('startServer', function () {
    nodemon({
      script: 'server/server.js',
      ext: 'js',
      ignore: ['node_modules/**', 'client/**', 'gulpfile.js']
    });
  });

  gulp.task('staging', function(){
    gulp.src('client/app/shared/config/**/*.js')
      .pipe(replace(/apiPath.+\'/g, 'apiPath: "http://pbinnovationsblog.rockstardevelopers.de:9001/api/"'))
      .pipe(gulp.dest('client/app/shared/config'));
  });

  gulp.task('prod', function() {
    gulp.src('client/app/shared/config/**/*.js')
      .pipe(replace(/apiPath.+\'/g, 'apiPath: "http://pbinnovationsblog.rockstardevelopers.de:9002/api/"'))
      .pipe(gulp.dest('client/app/shared/config'));
    gulp.src('server/*.js')
      .pipe(replace(/app.listen\(9001\)/g, 'app.listen(9002)'))
      .pipe(gulp.dest('server'));
  })

  //Build Files
  gulp.task('build', ['staging', 'buildApp', 'buildAppVendor', 'buildSass', 'buildSassVendor', 'sprites']);
  gulp.task('build_prod', ['prod', 'buildApp', 'buildAppVendor', 'buildSass', 'buildSassVendor', 'sprites']);

  // Default Gulp Task
  gulp.task('default', ['buildApp', 'buildAppVendor', 'buildSass', 'buildSassVendor', 'startServer', 'sprites', 'watch']);

}());