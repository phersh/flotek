'use strict';
const gulp = require('gulp');

require('./backend');
require('./frontend');
require('./utility');

gulp.task('clean', ['clean:frontend', 'clean:backend']);
gulp.task('build', ['build:frontend', 'build:backend']);
gulp.task('watch', ['watch:frontend', 'watch:backend']);
gulp.task('serve', ['serve:frontend', 'serve:backend']);
