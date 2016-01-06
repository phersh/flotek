'use strict';
var gulpEnv = require('gulp-util').env;

module.exports = {

  isProd: (gulpEnv.production ? true : false),
  servicePort: (gulpEnv.port || 4000),

  frontend: {
    dest: 'dist/frontend',
    src: 'src/angular',
    styles: ['**/*.scss'],
    scripts: ['**/*.js', '!**/*_test.js'],
    templates: ['**/*.html', '!**/index*.html'],
    sort: ['**/app.js', '**/module.js', '**/*.js'],
    index: ['src/angular/index.html'],
    assets: ['assets/**']
  },

  backend: {
    dest: 'dist/backend',
    src: 'src/node',
    scripts: ['**/*.js'],
    sql: ['**/*.sql'],
    templates: ['**/*.njn', '**/*.html'],
    assets: ['assets/**']
  }

};
