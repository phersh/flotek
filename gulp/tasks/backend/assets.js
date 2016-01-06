'use strict';

const config = require('../../config');
const gulp   = require('gulp');
const path = require('path');


gulp.task('build:backend:assets', function() {
  return gulp.src(config.backend.assets, {cwd: config.backend.src})
    .pipe(gulp.dest(path.join(config.backend.dest,'/static')));
});

gulp.task('build:backend:sql', function() {
  return gulp.src(config.backend.sql, {cwd: config.backend.src})
   .pipe(gulp.dest(config.backend.dest));
});
