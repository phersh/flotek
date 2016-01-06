'use strict';
const config = require('../../config');
const gulp = require('gulp');


const gInject = require('gulp-inject');
const order = require('gulp-order');


function buildIndex() {
  var appJs = gulp.src(['**/*.js', '!bower_components/**', '!assets/**', '!components/**'], {
    cwd: config.frontend.dest
  });
  var appCss = gulp.src(['**/*.css', '!bower_components/**', '!components/**'], {
    cwd: config.frontend.dest
  });
  return gulp.src(config.frontend.index)
    .pipe(gInject(appJs.pipe(order(config.frontend.sort))))
    .pipe(gInject(appCss))
    .pipe(gulp.dest(config.frontend.dest));
}

gulp.task('build:frontend:inject', [
  'build:frontend:templates',
  'build:frontend:scripts',
  'build:frontend:styles'
], buildIndex);

module.exports = buildIndex;
