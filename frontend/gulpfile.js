var config = require('./webpack.config.js');
var gulp = require('gulp');
var gzip = require('gulp-gzip');
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
var argv = require('yargs').argv;

var SERVER_PORT = '8000';

function swallowError(error) {
    console.log(error.toString());
    this.emit('end')
}

var env = "dev";

gulp.task('set-prod-env', function() {
    env = "prod";
});

gulp.task('set-constants', function() {
    var file = "constants/dev.ts";
    if(env === "prod") {
        file = "constants/prod.ts";
    }
    return gulp.src(file)
        .pipe(rename("constants.ts"))
        .pipe(gulp.dest("./src"));
});

gulp.task('ts', function() {
    return gulp.src('src/Index.ts')
        .pipe(webpack(config)).on('error', swallowError)
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
		.pipe(gulp.dest('.'))
		.pipe(gzip())
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
		.pipe(gzip())
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js'], {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['./**/*.ts', './**/*.tsx', './**/*.ejs'], ['ts']);
    gulp.watch(['./**/*.scss'], ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: '',
    port: (argv.port ? argv.port : SERVER_PORT),
    livereload: true
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src('./index.html')
  .pipe(open({uri: 'http://localhost:' + (argv.port ? argv.port : SERVER_PORT)}));
});

gulp.task('serve', ['clean', 'set-constants', 'ts', 'sass', 'open', 'watch']);

gulp.task('build', ['clean', 'set-constants', 'ts', 'sass']);

gulp.task('build-prod', ['clean', 'set-prod-env', 'set-constants', 'ts', 'sass']);

gulp.task('default', ['serve']);

