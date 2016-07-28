"use strict";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('start', function () {
  nodemon({
      script: './server/app.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
    })
})

gulp.task('sass', function () {
  return gulp.src('./client/stylesheets/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/stylesheets/css'));
});

gulp.task('watch', function () {
  gulp.watch('./client/stylesheets/scss/styles.scss', ['sass']);
});
