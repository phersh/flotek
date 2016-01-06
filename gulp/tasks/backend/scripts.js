'use strict';
const gulp = require('gulp');
const config = require('../../config');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

function buildBackendScripts() {
  return gulp.src(config.backend.scripts, {cwd: config.backend.src})
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.backend.dest));
}

module.exports = buildBackendScripts;

gulp.task('build:backend:scripts', buildBackendScripts);
