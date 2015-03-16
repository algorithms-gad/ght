var gulp = require('gulp'),
  rename = require("gulp-rename"),
  uglify = require('gulp-uglify');

gulp.task('build', function() {
  gulp.src('src/ght.js')
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('ght.min.js'))
    .pipe(gulp.dest('dist'));
});
