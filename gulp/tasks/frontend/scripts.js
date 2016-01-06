'use strict';
const gulp = require('gulp');
const config = require('../../config');
const pipeIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const ngAnnotate = require('gulp-ng-annotate');
const concat = require('gulp-concat');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify');
const path = require('path');
const babel = require('gulp-babel');
const iife = require('gulp-iife');
const order = require('gulp-order');
const plumber = require('gulp-plumber');

function buildFrontendScripts() {
  return gulp.src(config.frontend.scripts, {cwd: config.frontend.src})
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

gulp.task('build:frontend:scripts', buildFrontendScripts);
module.exports = buildFrontendScripts;
