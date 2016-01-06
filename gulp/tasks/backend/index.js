'use strict';
const gulp = require('gulp');

require('./assets');
require('./clean');
require('./scripts');
require('./styles');
require('./templates');
require('./db');
require('./watch');

gulp.task('build:backend', [
  'build:backend:templates',
  'build:backend:scripts',
  // 'build:backend:styles',
  'build:backend:assets'
]);

gulp.task('watch:backend', [
  'watch:backend:scripts',
  'watch:backend:templates'
]);

require('./serve');
