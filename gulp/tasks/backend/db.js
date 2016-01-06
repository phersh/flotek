'use strict';
const gulp = require('gulp');
const Knex = require('knex');
const through = require('through2');
const config = require('../../config');
const Bluebird = require('bluebird');

gulp.task('db:migrate', ['backend:make', 'db:copysql'], function() {
  if (!config.backend.databaseName) {
    return Bluebird.reject('ERROR: config.backend.databaseName must be set');
  }
  process.env.DBDEBUG = true;
  require('../../../dist/backend/services').initialize();
  return Knex.trellis('migrations')
    .where({
      status: 'up'
    })
    .pluck('filename')
    .then(function(files) {
      return gulp.src('dist/backend/db/sql_migrations/*')
        .pipe(through.obj(function(file, enc, callback) {
          var filename = file.path.split('/').pop();
          if (files.indexOf(filename) >= 0) {
            console.log('skipping ' + filename);
            callback();
          } else if (filename.match(/\.sql$/) !== null) {
            console.log('sourcing ' + filename);
            Knex.trellis.raw(file.contents.toString())
              .then(function() {
                callback();
              })
              .catch(function(err) {
                callback(err);
              });
          } else if (filename.match(/\.js$/) !== null) {
            console.log('sourcing ' + filename);
            require(file.path)()
              .then(function() {
                callback();
              })
              .catch(function(err) {
                callback(err);
              });
          }
        }, function() {
          return Knex.trellis.destroy().then(function() {
            console.log('migration complete');
            process.exit();
          });
        }));
    });
});
