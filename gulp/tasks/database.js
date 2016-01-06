(function() {
  'use strict';

  var gulp = require('gulp');
  var Knex = require('knex');
  var through = require('through2');
  var shell = require('gulp-shell');
  var config = require('../config');
  var Promise = require('bluebird');
  let gulpEnv = require('gulp-util').env;

gulp.task('db:hardreset', shell.task([
  'psql -U flo -d postgres -c \'DROP DATABASE florence_development\'',
  'psql -U flo -d postgres -c \'CREATE DATABASE florence_development\'',
  'psql -U flo -d florence_development < src/node/db/sql_migrations/000-init.sql',
  'ssh -C flo@trellis.kstf.org "pg_dump -Fc florence_development" | pg_restore -U flo -n public -c -d florence_development'
]));

gulp.task('db:clone', shell.task([
  // 'ssh -C flo@trellis.kstf.org "pg_dump --clean --create florence_development" | pg_restore -U flo -n public -c -1 -d florence_development'
  'ssh -C flo@trellis.kstf.org "pg_dump --clean --create florence_development" | psql -U flo -d postgres'
]));

gulp.task('db:preclone', shell.task([
  'ssh -C flo@trellis.kstf.org "pg_dump -Fc florence_development" | pg_restore -U flo -n public -c -d florence_development'
]));

gulp.task('redis:clearcache', function() {
  Promise.promisifyAll(require('redis'));
  var redis = require('redis').createClient();
  return redis.keysAsync('cache:*')
  .then(function(keys){
    return Promise.all(keys.map(function(key){
      return redis.delAsync(key);
    }));
  }).then(function() {
    process.exit();
  });
});

gulp.task('db:adduser', function() {
  require('../../dist/backend/services').initialize();
  let User = require('../../dist/backend/models/user');
  console.log(gulpEnv);
  return User.newUser({
    name: gulpEnv.name,
    email: gulpEnv.email,
    image_url: '/assets/nophoto.jpg',
    type: gulpEnv.type,
    homegroup: gulpEnv.homegroup
  }).then((newUser) => {
    console.log(newUser.toJSON());
    return Knex.trellis('authentication_contexts').insert({
      user_id: newUser.get('id'),
      uid: gulpEnv.uid,
      provider: 'google'
    });
  }).then(() => {
    return require('../../dist/backend/services').teardown();
  });
});

gulp.task('db:reset', shell.task([
  'psql -U flo -d postgres -c \'DROP DATABASE florence_development\'',
  'psql -U flo -d postgres -c \'CREATE DATABASE florence_development\''
]));

gulp.task('db:copysql', function(){
    return gulp.src('**/*.sql', {cwd: config.backend.src})
     .pipe(gulp.dest(config.backend.dest));
});

gulp.task('db:migrate', ['backend:make', 'db:copysql'], function() {
  process.env.DBDEBUG=true;
  require('../../dist/backend/services').initialize();
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
        console.log('skipping ' +filename);
        callback();
      } else if (filename.match(/\.sql$/) !== null) {
        console.log('sourcing '+filename);
        Knex.trellis.raw(file.contents.toString())
        .then(function(){callback();})
        .catch(function(err) {
          callback(err);
        });
      } else if(filename.match(/\.js$/) !== null) {
        console.log('sourcing '+filename);
        require(file.path)()
        .then(function(){callback();})
        .catch(function(err) {
          callback(err);
        });
      }
    }, function() {
      return Knex.trellis.destroy().then(function(){
        console.log('migration complete');
        process.exit();
      });
    }));
  });
});

})();
