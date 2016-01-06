var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);
var gulp = require('gulp');
// var run = require('gulp-run');
  var shell = require('gulp-shell');

tasks.forEach(function(task) {
  require('./tasks/' + task);
});

var config = require('./config');

gulp.task('killall', shell.task(['killall node'], {ignoreErrors: true}));

gulp.task('default', ['clean', 'killall'], function(done) {
  gulp.start('frontend');
  gulp.start('backend');
  // new run.Command('gulp backend', {silent: false}).exec().pipe(process.stdout);
  // new run.Command('gulp frontend:serve', {silent: false}).exec().pipe(process.stdout);
});

gulp.task('prod', ['clean'], function() {
  config.isProd = true;
  gulp.start('inject:index');
  gulp.start('backend:make');
});
