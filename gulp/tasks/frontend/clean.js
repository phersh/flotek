'use strict';
const config = require('../../config');
const gulp = require('gulp');
const del = require('del');

gulp.task('clean:frontend', function(cb) {
  del([config.frontend.dest]).then(() => cb());
});
