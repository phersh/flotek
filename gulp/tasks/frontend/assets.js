'use strict';
const config = require('../../config');
const gulp   = require('gulp');
const path = require('path');


gulp.task('build:frontend:assets:misc', function() {
  return gulp.src([
    'src/angular/maintenance.html',
    'src/angular/facicon.ico'
  ]).pipe(gulp.dest(config.frontend.dest));
});

gulp.task('build:frontend:assets:static', function() {
  return gulp.src(config.frontend.assets, {cwd: config.frontend.src})
    .pipe(gulp.dest(path.join(config.frontend.dest,'/assets')));
});

gulp.task('build:frontend:assets:bower', function() {
  return gulp.src(['bower_components/**'])
  .pipe(gulp.dest(path.join(config.frontend.dest,'bower_components')));
});

gulp.task('build:frontend:assets', [
  'build:frontend:assets:misc',
  'build:frontend:assets:static',
  'build:frontend:assets:bower'
]);
