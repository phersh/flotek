'use strict';
const shell = require('gulp-shell');
const gulp = require('gulp');
const gulpEnv = require('gulp-util').env;
const config = require('../../config');


gulp.task('browser', ['browser:chrome', 'browser:safari', 'browser:firefox'], function(done) {
  done();
  process.nextTick(function() {
    process.exit(0);
  });
});

gulp.task('browser:chrome', shell.task(`open 'http://localhost:${config.servicePort}/${gulpEnv.url}' -a 'google chrome'`));
gulp.task('browser:firefox', shell.task(`open 'http://localhost:${config.servicePort}/${gulpEnv.url}' -a firefox`));
gulp.task('browser:safari', shell.task(`open 'http://localhost:${config.servicePort}/${gulpEnv.url}' -a safari`));
