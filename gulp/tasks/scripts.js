(function() {
  'use strict';

  var gulp = require('gulp');
  var config = require('../config');
  var pipeIf = require('gulp-if');
  var sourcemaps = require('gulp-sourcemaps');
  var ngAnnotate = require('gulp-ng-annotate');
  var concat = require('gulp-concat');
  var rev = require('gulp-rev');
  var uglify = require('gulp-uglify');
  var path = require('path');
  var babel = require('gulp-babel');
  var iife = require('gulp-iife');
  var saneWatch = require('../util/saneWatch');
  var order = require('gulp-order');
  var plumber = require('gulp-plumber');

   function buildFrontendScripts() {
    return gulp.src(config.frontend.babel, {cwd: config.frontend.src})
    .pipe(plumber())
    .pipe(pipeIf(!config.isProd, sourcemaps.init()))
    .pipe(babel())
    .pipe(iife())
    .pipe(pipeIf(!config.isProd, sourcemaps.write()))
    .pipe(pipeIf(config.isProd, ngAnnotate({add: true, single_quotes: true})))
    .pipe(pipeIf(config.isProd, uglify()))
    .pipe(order(config.frontend.sort))
    .pipe(pipeIf(config.isProd, concat('main.js')))
    .pipe(pipeIf(config.isProd, rev()))
    .pipe(gulp.dest(path.join(config.frontend.dest, 'scripts')));
  }

  function buildBackendScripts() {
    return gulp.src(config.backend.babel, {cwd: config.backend.src})
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.backend.dest));
  }


  gulp.task('scripts:frontend', buildFrontendScripts);
  gulp.task('scripts:backend', buildBackendScripts);

  gulp.task('scripts:backend:watch', saneWatch({
      label: 'Backend Scripts',
      path: config.backend.src,
      glob: config.backend.babel,
      rebuild: buildBackendScripts}));

  gulp.task('scripts:frontend:watch', saneWatch({
      label: 'Frontend Scripts',
      path: config.frontend.src,
      glob: config.frontend.babel,
      rebuild: buildFrontendScripts}));

})();
