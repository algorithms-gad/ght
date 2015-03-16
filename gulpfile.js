var gulp = require('gulp'),
  rename = require("gulp-rename"),
  uglify = require('gulp-uglify');

gulp.task('build', function() {
  //copy gt to dest
  //gulp.src('src/gt.js')
  //  .pipe(gulp.dest('dist'));

  gulp.src('dist/gt.js')
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('gt.min.js'))
    .pipe(gulp.dest('dist'));
});
