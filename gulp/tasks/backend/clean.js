'use strict';
const config = require('../../config');
const gulp = require('gulp');
const del = require('del');

gulp.task('clean:backend', function(cb) {
  del([config.backend.dest]).then(() => cb());
});
