var gulp = require('gulp');

// Express.js server.
const nodemon = require('gulp-nodemon');
gulp.task('server', function() {
  nodemon({
    script: './server.js',
    env: {
      PORT: 3000
    }
  });
});

// Default task.
gulp.task('default', ['server']);
