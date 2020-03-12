require("@babel/register");

import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import concat from 'gulp-concat';
import replace from 'gulp-replace';
import pkg from './package.json';
import webpackConfig from './webpack.config';

function build_lib_clean(cb) {
  del.sync(['lib', 'dist']);
  cb();
}

function build_lib_babel(cb) {
  gulp
  .src(['src/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('lib'));
  cb();
}

function build_lib_umd(cb) {
  gulp
  .src(['src/index.js'])
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(gulp.dest('dist'));
  cb();
}

function build_lib_style(cb) {
  gulp
  .src(['src/**/*.scss', '!src/**/_*.scss'])
  .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
  .pipe(gulp.dest('lib'))
  .pipe(concat(`${pkg.name}.css`))
  .pipe(postcss())
  .pipe(gulp.dest('dist'));
  cb();
}

function build_lib_photoswipe_css(cb) {
  gulp
  .src([
    'node_modules/photoswipe/dist/photoswipe.css',
    'node_modules/photoswipe/dist/default-skin/default-skin.css'
  ])
  .pipe(replace(/url\s*\((\S+)\)/gi, 'url("./$1")'))
  .pipe(concat('photoswipe.css'))
  .pipe(gulp.dest('lib'))
  .pipe(postcss())
  .pipe(gulp.dest('dist'));
  cb();
}

function build_lib_photoswipe_copy(cb) {
  gulp
  .src([
    'node_modules/photoswipe/dist/default-skin/**/*',
    '!node_modules/photoswipe/dist/**/*.{scss,css,js}'
  ])
  .pipe(gulp.dest('lib'))
  .pipe(gulp.dest('dist'));
  cb();
}

function build_lib_copy(cb) {
  gulp
  .src(['src/**/*', '!src/**/*.{scss,js}'])
  .pipe(gulp.dest('lib'))
  .pipe(gulp.dest('dist'));
  cb();
}

exports.build = gulp.series(
    build_lib_clean, 
    build_lib_babel, 
    build_lib_umd,
    build_lib_style,
    build_lib_photoswipe_css,
    build_lib_photoswipe_copy,
    build_lib_copy
);