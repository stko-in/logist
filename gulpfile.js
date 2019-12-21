const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require("browser-sync").create();

function logist(done) {
  gulp.src('scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.reload({ stream: true }));
  done();
}

// BrowserSync
function sync(done) {
  browserSync.init({
    proxy: "http://site/"
  });
  	gulp.watch('scss/**/*.scss', logist);
  	gulp.watch('templates/**/*.twig').on('change', browserSync.reload);
  done();
}

exports.default = sync;