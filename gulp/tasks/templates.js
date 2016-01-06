(function() {
  'use strict';

  var config = require('../config');
  var gulp = require('gulp');
  var templateCache = require('gulp-angular-templatecache');
  var gulpIf = require('gulp-if');
  var rev = require('gulp-rev');
  var path = require('path');
  var handlebars = require('gulp-handlebars');
  var defineModule = require('gulp-define-module');
  var saneWatch = require('../util/saneWatch');


  function buildNunjucks() {
    return gulp.src(config.backend.nunjucks, {cwd: config.backend.src})
      .pipe(gulp.dest(path.join(config.backend.dest)));
  }

  gulp.task('templates:nunjucks', buildNunjucks);


  function buildHandlebars() {
    return gulp.src(config.backend.templates, {cwd: config.backend.src})
    .pipe(handlebars())
    .pipe(defineModule('node'))
    .pipe(gulp.dest(config.backend.dest));
  }

  function copyHtml() {
    return gulp.src(config.backend.viewTemplates, {cwd: config.backend.src})
      .pipe(gulp.dest(path.join(config.backend.dest, 'templates')));
  }

  function buildAngularTemplates() {
    return gulp.src(config.frontend.templates, {cwd: config.frontend.src})
    .pipe(templateCache('templates.js', {
        standalone: true,
        module: 'trellis.templates'
    }))
    .pipe(gulpIf(config.isProd, rev()))
    .pipe(gulp.dest(path.join(config.frontend.dest, 'scripts')));
  }

  // Views task
  gulp.task('templates:frontend', buildAngularTemplates);
  gulp.task('templates:hapi', copyHtml);
  gulp.task('templates:backend', ['templates:hapi', 'templates:nunjucks'], buildHandlebars);


  gulp.task('templates:hapi:watch', saneWatch({
    label: 'Hapi Views',
    path: config.backend.src,
    glob: config.backend.viewTemplates,
    rebuild: copyHtml
  }));

  gulp.task('templates:backend:watch', saneWatch({
      label: 'Backend Templates',
      path: config.backend.src,
      glob: config.backend.templates,
      rebuild: buildHandlebars}));

  gulp.task('templates:frontend:watch', saneWatch({
      label: 'Frontend Templates',
      path: config.frontend.src,
      glob: config.frontend.templates,
      rebuild: buildAngularTemplates}));

})();
