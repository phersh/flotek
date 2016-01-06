'use strict';
const gulp = require('gulp');
require('./tasks');

gulp.task('default', ['clean', 'killall'], function(done) {
  gulp.start('serve');
});
