(function(){
  'use strict';

  var config = require('../config');
  var gulp = require('gulp');
  var path = require('path');

  gulp.task('bower:frontend', function() {
    return gulp.src(['bower_components/**'])
    .pipe(gulp.dest(path.join(config.frontend.dest,'bower_components')));
  });
})();
