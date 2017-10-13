const gulp = require("gulp");
const cached = require('gulp-cached');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const {src, dest, minifyOption} = global;

gulp.task('sass', function () {
  var processors = [  // ベンダープレフィックスの対象ブラウザを指定
    autoprefixer({
      browsers: ['last 2 versions', 'ie 9']
    })
  ];
  return gulp.src('resources/assets/scss/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: minifyOption.sass ? 'compressed' : 'expanded'
    }))
    .pipe(postcss(processors))  // ベンダープレフィックスを自動付与
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest(dest + 'css'));
});
//
// gulp.task('sass:minify', ['sass'], function () {
//   return gulp.src(dest + '/css/style.css')
//     .pipe(csso())//cssを圧縮
//     .pipe(gulp.dest(dest + 'css/'))
// });

gulp.task("sass:watch", () => {
  let target = [
    'resources/assets/scss/**/*.*'
  ];
  return gulp.watch(target, ['sass'])
});

global.watch.push("sass:watch")
global.build.push('sass')

// global.build.push(minifyOption.sass ? "sass:minify" : 'sass')





