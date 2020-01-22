'use strict';

/* path to source files (src) and build files (build) and files to be watched (watch) */
var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'srs/fonts/**/*.*'
    },
    clean: 'build/*'
};

/* server config */
var config = {
    server: {
        baseDir: 'build'
    },
    notify: false
};

/* load gulp and plugins */
var gulp = require('gulp'),  // gulp
    webserver = require('browser-sync'), // web server
    plumber = require('gulp-plumber'), // error handling
    rigger = require('gulp-rigger'), // include files
    sourcemaps = require('gulp-sourcemaps'), // source maps
    sass = require('gulp-sass'), // sass to css
    autoprefixer = require('gulp-autoprefixer'), // auto prefixes in css
    cleanCSS = require('gulp-clean-css'), // minimize css
    uglify = require('gulp-uglify'), // minimize JavaScript
    cache = require('gulp-cache'), // cache module
    imagemin = require('gulp-imagemin'), // minify PNG, JPEG, GIF and SVG images
    jpegrecompress = require('imagemin-jpeg-recompress'), // recompress jpeg
    pngquant = require('imagemin-pngquant'), // recompress png
    rimraf = require('gulp-rimraf'), // delete files and folders
    rename = require('gulp-rename'); // rename files

/* tasks */

// run web server
gulp.task('webserver', function () {
    webserver(config);
});

// build html
gulp.task('html:build', function () {
    return gulp.src(path.src.html) // select all html files in src
        .pipe(plumber()) // error handling
        .pipe(rigger()) // include files
        .pipe(gulp.dest(path.build.html)) // publish
        .pipe(webserver.reload({ stream: true })); // reload server
});

// build styles
gulp.task('css:build', function () {
    return gulp.src(path.src.style) // get main.scss
        .pipe(plumber()) // error handling
        .pipe(sourcemaps.init()) // initialize sourcemap
        .pipe(sass()) // scss -> css
        .pipe(autoprefixer()) // add prefixes
        .pipe(gulp.dest(path.build.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS()) // minimize CSS
        .pipe(sourcemaps.write('./')) // write sourcemap
        .pipe(gulp.dest(path.build.css)) // publish in build
        .pipe(webserver.reload({ stream: true })); // reload server
});

// build js
gulp.task('js:build', function () {
    return gulp.src(path.src.js) // get main.js
        .pipe(plumber()) // error handling
        .pipe(rigger()) // import files in main.js
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.init()) //initialize sourcemap
        .pipe(uglify()) // minimize js
        .pipe(sourcemaps.write('./')) //  write sourcemap
        .pipe(gulp.dest(path.build.js)) // put in build folder
        .pipe(webserver.reload({ stream: true })); // reload server
});

// copy fonts
gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

// parse images
gulp.task('image:build', function () {
    return gulp.src(path.src.img) // path to images
        .pipe(cache(imagemin([ // compress
            imagemin.gifsicle({ interlaced: true }),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        ])))
        .pipe(gulp.dest(path.build.img)); // publish
});

// delete build folder
gulp.task('clean:build', function () {
    return gulp.src(path.clean, { read: false })
        .pipe(rimraf());
});

// clear cache
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// build
gulp.task('build',
    gulp.series('clean:build',
        gulp.parallel(
            'html:build',
            'css:build',
            'js:build',
            'fonts:build',
            'image:build'
        )
    )
);

// run tasks if files changed
gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

// default task
gulp.task('default', gulp.series(
    'build',
    gulp.parallel('webserver','watch')
));
