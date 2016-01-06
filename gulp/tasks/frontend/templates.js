'use strict';
const config = require('../../config');
const gulp = require('gulp');
const templateCache = require('gulp-angular-templatecache');
const gulpIf = require('gulp-if');
const rev = require('gulp-rev');
const path = require('path');


function buildAngularTemplates() {
  return gulp.src(config.frontend.templates, {cwd: config.frontend.src})
  .pipe(templateCache('templates.js', {
      standalone: true,
      module: 'trellis.templates'
  }))
  .pipe(gulpIf(config.isProd, rev()))
  .pipe(gulp.dest(path.join(config.frontend.dest, 'scripts')));
}

gulp.task('build:frontend:templates', buildAngularTemplates);
module.exports = buildAngularTemplates;
