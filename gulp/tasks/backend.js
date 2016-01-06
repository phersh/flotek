(function() {
  'use strict';

  var gulp = require('gulp');
  var config = require('../config');
  var path = require('path');
  var server = require('gulp-develop-server');
  var fork = require( 'child_process' ).fork;
  var child;


  function startNotify() {
    console.log('starting notify');
    child = fork( path.join(config.backend.dest, 'notifyProcess.js'), {
      env:      process.env,
      execArgv: [],
      silent:   true
    });
    child.stdout.pipe( process.stdout );
    child.stderr.pipe( process.stderr );
  }

  function restartNotify() {
    if(child) {
      child.once('close', startNotify);
      child.kill('SIGTERM');
    }
  }


  var livereload = require('gulp-livereload');
  var saneWatch = require('../util/saneWatch');

  function kickServer() {
    server.restart();
    restartNotify();
    setTimeout(function() {livereload.changed();}, 1000);
  }

  gulp.task('backend', ['backend:make', 'backend:watch'], function() {
    server.listen({
      path: path.join(config.backend.dest, 'server.js')
    });
    startNotify();
    saneWatch({
      label: 'Livereload',
      path: config.backend.dest,
      glob: '**',
      rebuild: kickServer})();
  });

  gulp.task('backend:make', [
    'scripts:backend',
    'templates:backend',
    'assets:backend'
    ]);

  gulp.task('backend:watch', ['scripts:backend:watch', 'templates:backend:watch', 'templates:hapi:watch']);

})();
