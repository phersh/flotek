'use strict';
const saneWatch = require('../../util/saneWatch');
const rebuildScripts = require('./scripts');
const rebuildTemplates = require('./templates');
const rebuildStyles = require('./styles');
const rebuildIndex = require('./inject');
const config = require('../../config');
const gulp = require('gulp');


gulp.task('watch:frontend:scripts', ['build:frontend:scripts'], saneWatch({
  label: 'Frontend Scripts',
  path: config.frontend.src,
  glob: config.frontend.scripts,
  rebuild: rebuildScripts})
);

gulp.task('watch:frontend:styles', ['build:frontend:styles'], saneWatch({
  label: 'Frontend Styles',
  path: config.frontend.src,
  glob: config.frontend.styles,
  rebuild: rebuildStyles})
);

gulp.task('watch:frontend:templates', ['build:frontend:templates'], saneWatch({
  label: 'Frontend Templates',
  path: config.frontend.src,
  glob: config.frontend.templates,
  rebuild: rebuildTemplates})
);

gulp.task('watch:frontend:inject', ['build:frontend:inject'], saneWatch({
  label: 'Frontend Templates',
  path: config.frontend.src,
  glob: 'index.html',
  rebuild: rebuildIndex})
);
