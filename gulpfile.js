var gulp = require('gulp');
var webpack = require('webpack-stream');

// Uses webpack for module bundling.
const config = require('./webpack.config.js');
gulp.task('bundle', () => {
  return gulp.src('./ui/index.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./dist/'))
});

// Express.js server.
const nodemon = require('gulp-nodemon');
gulp.task('server', function() {
  nodemon({
    script: './server.js'
  });
});

// Default task.
gulp.task('default', ['bundle', 'server']);
