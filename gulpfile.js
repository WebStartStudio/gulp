// Importing Gulp and necessary plugins
const gulp = require('gulp');
const concat = require('gulp-concat-css'); // Concatenates multiple CSS files into one
const plumber = require('gulp-plumber'); // Prevents pipe breaking caused by errors from gulp plugins
const del = require('del'); // Utility for deleting files and directories
const browserSync = require('browser-sync').create(); // Live reloading and browser syncing

function html() {
  return gulp
    .src('src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return gulp
    .src('src/blocks/**/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return gulp
    .src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return gulp
    .src('src/fonts/**/*.{ttf,otf,woff,woff2}')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({ stream: true }));
}

function videos() {
  return gulp
    .src('src/videos/**/*.{mp4,webm,ogg}')
    .pipe(gulp.dest('dist/videos'))
    .pipe(browserSync.reload({ stream: true }));
}

function clean() {
  return del('dist'); // Deletes the entire 'dist' folder before a new build
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/fonts/**/*.{ttf,otf,woff,woff2}'], fonts);
  gulp.watch(['src/videos/**/*.{mp4,webm,ogg}'], videos);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist', // Sets the base directory for the server
    },
  });
}

const build = gulp.series(
  clean,  // Cleans the 'dist' folder
  gulp.parallel(html, css, images, fonts, videos) // Runs all tasks in parallel after cleaning
);
const watchapp = gulp.parallel(build, watchFiles, serve); // Runs build, watch, and serve tasks in parallel

exports.clean = clean;
exports.videos = videos;
exports.fonts = fonts;
exports.images = images;
exports.html = html;
exports.css = css;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;
