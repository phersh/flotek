'use strict';
const config = require('../../config');
const gulp = require('gulp');
const path = require('path');


function buildTemplates() {
  return gulp.src(config.backend.templates, {cwd: config.backend.src})
    .pipe(gulp.dest(path.join(config.backend.dest)));
}

gulp.task('build:backend:templates', buildTemplates);

module.exports = buildTemplates;
