'use strict';
const gulp = require('gulp');
const config = require('../../config');
const path = require('path');
const server = require('gulp-develop-server');
const fork = require('child_process').fork;
const livereload = require('gulp-livereload');
const saneWatch = require('../../util/saneWatch');
var child;


function startNotify() {
  console.log('starting notify');
  child = fork(path.join(config.backend.dest, 'notifyProcess.js'), {
    env: process.env,
    execArgv: [],
    silent: true
  });
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

function restartNotify() {
  if (child) {
    child.once('close', startNotify);
    child.kill('SIGTERM');
  }
}

function kickServer() {
  server.restart();
  restartNotify();
  setTimeout(function() {
    livereload.changed();
  }, 1000);
}

gulp.task('serve:backend', ['build:backend', 'watch:backend'], function() {
  server.listen({
    path: path.join(config.backend.dest, 'server.js')
  });
  startNotify();
  saneWatch({
    label: 'Livereload',
    path: config.backend.dest,
    glob: '**',
    rebuild: kickServer
  })();
});
