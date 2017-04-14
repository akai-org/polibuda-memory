var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var babel       = require('gulp-babel');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'images', 'sass', 'babel', 'json'], function() {

  browserSync.init({
    server: "./public",
    browser: "chrome"
  });

    gulp.watch("app/stylesheets/*.scss", ['sass']);
    gulp.watch("app/javascripts/**/*.js", ['babel']);
    gulp.watch("app/json/*.json", ['json']);
    gulp.watch("app/*.html", ['html']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("app/stylesheets/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('babel', function() {
  return gulp.src("app/javascripts/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("public/js"));
});

gulp.task('html', function() {
    return gulp.src("app/*.html")
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest("public/"));
});

gulp.task('json', function() {
    return gulp.src("app/json/*.json")
        .pipe(gulp.dest("public/json/"));
});

gulp.task('images', function() {
    return gulp.src("app/images/**/*")
        .pipe(gulp.dest("public/images/"));
});

gulp.task('default', ['serve']);