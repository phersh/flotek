'use strict';
const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('killall', shell.task(['killall node'], {ignoreErrors: true}));
