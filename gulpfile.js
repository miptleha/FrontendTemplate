const gulp = require('gulp');
//const log = require('fancy-log');
const concat = require('gulp-concat');
//const uglify = require('gulp-uglify');
//const sass = require('gulp-sass');
//const connect = require('gulp-connect');
const del = require('del');
//const pref = require('gulp-autoprefixer');
//const babel = require('gulp-babel');

function clean() {
    return del('dist/');
}

function html_dist() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'));
}

function styles() {
    return gulp.src('app/styles/src/**/*.css', { sourcemaps: true })
        .pipe(concat('all.css'))
        .pipe(gulp.dest('app/styles/', { sourcemaps: true }));
}

function styles_dist() {
    return gulp.src('app/styles/src/**/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/styles/'));
}

function scripts() {
    return gulp.src('app/scripts/src/**/*.js', { sourcemaps: true })
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/scripts/', { sourcemaps: true }));
}

function scripts_dist() {
    return gulp.src('app/scripts/src/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/scripts/'));
}

exports.default = gulp.parallel(scripts, styles);
exports.publish = gulp.series(clean, gulp.parallel(html_dist, scripts_dist, styles_dist));