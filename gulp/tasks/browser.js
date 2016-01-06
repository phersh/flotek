(function() {
  'use strict';
  var shell = require('gulp-shell');
  var gulp = require('gulp');
  var gulpEnv = require('gulp-util').env;


  gulp.task('browser', ['browser:chrome', 'browser:safari', 'browser:firefox'], function(done) {
    done();
    process.nextTick(function() {
        process.exit(0);
    });
  });
  gulp.task('browser:chrome', shell.task(`open 'http://localhost:4200/${gulpEnv.url}' -a 'google chrome'`));
  gulp.task('browser:firefox', shell.task(`open 'http://localhost:4200/${gulpEnv.url}' -a firefox`));
  gulp.task('browser:safari', shell.task(`open 'http://localhost:4200/${gulpEnv.url}' -a safari`));

})();
