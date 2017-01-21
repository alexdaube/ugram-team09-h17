var config = require('./webpack.config.js');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var cssnano = require('gulp-cssnano');
var livereload = require('gulp-livereload');

gulp.task('ts', function() {
    return gulp.src('src/Index.ts')
        .pipe(webpack(config))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});

gulp.task('sass', function() {
    return gulp.src('./scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename('app.min.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js'], {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['./**/*.ts', './**/*.tsx'], ['ts']);
    gulp.watch(['./**/*.scss'], ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: '',
    port: '8000',
    livereload: true,
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src('./index.html')
  .pipe(open({uri: 'http://localhost:8000', app: 'Google Chrome'}));
});

gulp.task('serve', ['clean','ts', 'sass', 'open', 'watch'], function() {});

gulp.task('default', ['clean', 'ts', 'sass', 'watch'], function() {});
