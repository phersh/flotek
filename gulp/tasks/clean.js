(function() {
  'use strict';
  var config = require('../config');
  var gulp   = require('gulp');
  var del    = require('del');

  gulp.task('clean:backend', function(cb) {
    del([config.backend.dest]).then(() => cb());
  });
  gulp.task('clean:frontend', function(cb) {
    del([config.frontend.dest]).then(() => cb());
  });
  gulp.task('clean', ['clean:frontend', 'clean:backend']);
})();
