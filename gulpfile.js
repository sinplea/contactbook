var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('start', function () {
  nodemon({
      script: './server/app.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
    })
})
