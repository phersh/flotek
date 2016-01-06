'use strict';
const config = require('../../config');
const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpIf = require('gulp-if');
const rev = require('gulp-rev');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');


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

gulp.task('build:frontend:styles', buildStyles);
module.exports = buildStyles;
