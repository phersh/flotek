(function() {
  'use strict';

  var config = require('../config');
  var gulp   = require('gulp');
  var path = require('path');

  gulp.task('assets:frontend', function() {
    return gulp.src(config.frontend.assets, {cwd: config.frontend.src})
      .pipe(gulp.dest(path.join(config.frontend.dest,'/assets')));
  });
  gulp.task('assets:backend', function() {
    return gulp.src(config.backend.assets, {cwd: config.backend.src})
      .pipe(gulp.dest(path.join(config.backend.dest,'/static')));
  });
})();
