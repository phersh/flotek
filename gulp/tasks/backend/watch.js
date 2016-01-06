'use strict';
const saneWatch = require('../../util/saneWatch');
const rebuildScripts = require('./scripts');
const rebuildTemplates = require('./templates');
const gulp = require('gulp');
const config = require('../../config');

gulp.task('watch:backend:scripts', ['build:backend:scripts'], saneWatch({
  label: 'Backend Scripts',
  path: config.backend.src,
  glob: config.backend.scripts,
  rebuild: rebuildScripts
}));


gulp.task('watch:backend:templates', ['build:backend:templates'], saneWatch({
  label: 'Hapi Views',
  path: config.backend.src,
  glob: config.backend.templates,
  rebuild: rebuildTemplates
}));
