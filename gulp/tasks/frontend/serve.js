'use strict';
const gulp = require('gulp');
const httpProxy = require('http-proxy');
const config = require('../../config');
const path = require('path');
const livereload = require('gulp-livereload');
const saneWatch = require('../../util/saneWatch');

function startExpress() {
  const express = require('express');
  const proxy = httpProxy.createProxyServer({
    ws: true,
    target: 'http://localhost:3000'
  });
  proxy.on('error', function(err) {
    return console.log(err);
  });
  const app = express();
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

  app.use(express.static(config.frontend.dest));
  app.all('*.html', function(req, res) {
    return res.status(404).send('not found');
  });

  app.all('/*', function(req, res) {
    return res.sendFile(path.join(__dirname, '../../../', config.frontend.dest, 'index.html'));
  });

  const server = require('http').createServer(app);
  server.on('upgrade', function(req, socket, head) {
    return proxy.ws(req, socket, head);
  });
  console.log('STARTING EXPRESS');
  return server.listen(config.servicePort);
}


gulp.task('serve:frontend', ['build:frontend', 'watch:frontend'], function() {
  startExpress();

  saneWatch({
    label: 'Livereload',
    path: config.frontend.dest,
    glob: '**',
    rebuild: function() {
      return livereload.changed('index.html');
    }
  });

  livereload.listen({
    host: 'localhost',
    start: true,
    reloadPage: 'index.html'
  });
});
