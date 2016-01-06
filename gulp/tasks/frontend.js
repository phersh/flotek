(function() {
  'use strict';

  var gulp = require('gulp');
  var httpProxy = require('http-proxy');
  var config = require('../config');
  var path = require('path');
  var livereload = require('gulp-livereload');
  var saneWatch = require('../util/saneWatch');

  var startExpress = function() {
    var app, express, proxy, server;
    console.log('STARTING EXPRESS');
    express = require('express');
    proxy = httpProxy.createProxyServer({
      ws: true,
      target: 'http://localhost:3000'
    });
    proxy.on('error', function(err) {
      return console.log(err);
    });
    app = express();
    app.all('/api*', function(req, res) {
      return proxy.web(req, res);
    });
    app.all('/auth*', function(req, res) {
      return proxy.web(req, res);
    });
    app.all('/link*', function(req, res) {
      return proxy.web(req, res);
    });
    app.all('/socket.io/*', function(req, res) {
      return proxy.web(req, res);
    });

    app.use(express['static'](config.frontend.dest));
    app.all('*.html', function(req, res) {
      return res.status(404).send('not found');
    });
    app.all('/*', function(req, res) {
      return res.sendFile(path.join(__dirname, '../../', config.frontend.dest, 'index.html'));
    });

    server = require('http').createServer(app);
    server.on('upgrade', function(req, socket, head) {
      return proxy.ws(req, socket, head);
    });
    return server.listen(config.servicePort);
  };

  gulp.task('frontend:make', ['inject:index', 'misc:frontend']);

  gulp.task('frontend:watch', ['scripts:frontend:watch', 'styles:frontend:watch', 'templates:frontend:watch', 'inject:index:watch']);

  function lrChanged() {
    return livereload.changed('index.html');
  }

  gulp.task('frontend', ['frontend:make', 'frontend:watch'], function() {
    startExpress();

    saneWatch({
      label: 'Livereload',
      path: config.frontend.dest,
      glob: '**',
      rebuild: lrChanged})();
      // rebuild: livereload.changed})();
    livereload.listen({
      host: 'localhost',
      start: true,
      reloadPage: 'index.html'
    });
  });

})();
