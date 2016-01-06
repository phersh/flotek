(function() {
  'use strict';

  var config = require('../config');
  var gulp = require('gulp');
  var gInject = require('gulp-inject');
  var rename = require('gulp-rename');
  var order = require('gulp-order');
  var saneWatch = require('../util/saneWatch');

  function buildIndex() {
    var appJs = gulp.src(['**/*.js', '!bower_components/**', '!assets/**', '!components/**'], {cwd: config.frontend.dest});
    var appCss = gulp.src(['**/*.css', '!bower_components/**', '!components/**'], {cwd: config.frontend.dest});
    return gulp.src(config.frontend.index)
    .pipe(gInject(appJs.pipe(order(config.frontend.sort))))
    .pipe(gInject(appCss))
    .pipe(gulp.dest(config.frontend.dest));
  }

  function copyMisc() {
    return gulp.src([
      'src/angular/maintenance.html',
      'src/angular/facicon.ico'
    ]).pipe(gulp.dest(config.frontend.dest));
  }

  gulp.task('inject:index', [
    'scripts:frontend',
    'templates:frontend',
    'bower:frontend',
    'styles:frontend',
    'assets:frontend'
    ],
    buildIndex);

  gulp.task('misc:frontend', copyMisc);

  gulp.task('inject:karma', ['inject:index'], function() {
    var appJs = gulp.src(['build/scripts/**/*.js']);
    return gulp.src('karma.loadorder.js_tmpl')
    .pipe(gInject(appJs.pipe(order(config.frontend.sort)), {
      starttag: 'angularAppFiles: [',
      endtag: '],',
      addRootSlash: false,
      transform: function (filepath, file, i, length) {
        return '  \'' + filepath + '\'' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(rename('karma.loadorder.js'))
    .pipe(gulp.dest(config.backend.dest));
  });

  gulp.task('inject:index:watch', saneWatch({
      label: 'Index',
      path: config.frontend.src,
      glob: 'index.html',
      rebuild: buildIndex}));


})();
