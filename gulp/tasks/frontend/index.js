'use strict';
const gulp = require('gulp');

require('./assets');
require('./clean');
require('./scripts');
require('./styles');
require('./templates');
require('./inject');
require('./watch');

gulp.task('build:frontend', [
  'build:frontend:templates',
  'build:frontend:scripts',
  'build:frontend:styles',
  'build:frontend:inject',
  'build:frontend:assets'
]);

gulp.task('watch:frontend', [
  'watch:frontend:inject',
  'watch:frontend:templates',
  'watch:frontend:styles',
  'watch:frontend:scripts'
]);

require('./serve');
