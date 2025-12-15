"use strict";

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sync from 'browser-sync';

const browserSync = sync.create();
const sass = gulpSass(dartSass);

// Server
export const server = () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    notify: false,
    ui: false
  });
}

// Styles
export const styles = () => {
  return gulp.src("src/scss/styles.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
}

// HTML
export const html = () => {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("build"))
    .pipe(browserSync.stream());
}

// js

export const js = () => {
  return gulp.src("src/js/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
}

// Watcher

export const watcher = () => {
  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/*.html", gulp.series("html"));
  gulp.watch("src/js/*.js", gulp.series("js"));
}

export default gulp.series(
  gulp.parallel(html, styles, js),
  gulp.parallel(server, watcher)
);
