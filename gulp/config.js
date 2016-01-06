'use strict';

var gulpEnv = require('gulp-util').env;

module.exports = {

  isProd: (gulpEnv.production ? true : false),
  servicePort: (gulpEnv.port || 4200),

  frontend: {
    dest: 'dist/frontend',
    src: 'src/angular',
    styles: ['**/*.scss'],
    babel: ['**/*.js', '!**/*_test.js'],
    templates: ['**/*.html', '!**/index*.html'],
    sort: ['**/app.js', '**/module.js', '**/*.js'],
    index: ['src/angular/index.html'],
    assets: ['assets/**']
  },

  backend: {
    dest: 'dist/backend',
    src: 'src/node',
    babel: ['**/*.js'],
    templates: ['**/*.hbs'],
    nunjucks: ['**/*.njn'],
    viewTemplates: ['templates/**/*.html'],
    assets: ['assets/**']
  }

};
