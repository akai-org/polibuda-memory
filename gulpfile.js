var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var babel       = require('gulp-babel');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'babel'], function() {

  browserSync.init({
    server: "./public"
  });

  gulp.watch("assets/stylesheets/*.scss", ['sass']);
  gulp.watch("assets/javascripts/*.js", ['babel']);
  gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("assets/stylesheets/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('babel', function() {
  return gulp.src("assets/javascripts/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("public/js"));
});

gulp.task('default', ['serve']);