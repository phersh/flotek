(function() {
  'use strict';

  var gulp = require('gulp');
  var util = require('gulp-util');

  gulp.task('testmail', ['backend:make'], function() {
    util.env.digest = util.env.digest || 1;
    require('../../backend/init').initialize();
    require('../../backend/mail/digest').digest(util.env.digest);
  });
})();