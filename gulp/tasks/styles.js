(function() {
  'use strict';

  var config = require('../config');
  var gulp = require('gulp');
  var sass = require('gulp-sass');
  var gulpIf = require('gulp-if');
  var rev = require('gulp-rev');
  var path = require('path');
  var sourcemaps = require('gulp-sourcemaps');
  var saneWatch = require('../util/saneWatch');
  var plumber = require('gulp-plumber');
  var autoprefixer = require('gulp-autoprefixer');


  function buildStyles() {
    return gulp.src(config.frontend.styles, {cwd: config.frontend.src})
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: config.isProd ? 'compressed' : 'nested'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulpIf(config.isProd, rev()))
    .pipe(gulp.dest(path.join(config.frontend.dest, 'styles')));
  }

  gulp.task('styles:frontend', buildStyles);

  gulp.task('styles:frontend:watch', saneWatch({
      label: 'Frontend Styles',
      path: config.frontend.src,
      glob: config.frontend.styles,
      rebuild: buildStyles}));

})();
