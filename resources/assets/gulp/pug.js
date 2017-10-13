const gulp = require("gulp");
const pug = require("gulp-pug");
const cached = require('gulp-cached');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const {src, dest, minifyOption} = global;

gulp.task('pug', () =>
  gulp.src(['resources/views/**/*.pug', '!resources/views/**/_*.pug'])
    .pipe(cached('pug')) // 対象ファイルをキャッシュし、変更ファイルのみ処理
    .pipe(plumber({ // エラーをデスクトップ通知
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(pug({
      doctype: 'html',
      pretty: minifyOption.pug ? false : true,//falseでhtmlを圧縮
    }))
    .pipe(gulp.dest(dest))
);

gulp.task("pug:watch", () => {
  let target = ['resources/views/**/*.pug', '!resources/views/**/_*.pug'];
  return gulp.watch(target, ["pug"])
});

// gulp.task('pug:minify', () => {
//   return gulp.src(['resources/views/**/*.pug', '!resources/views/**/_*.pug'])
//     .pipe(plumber({ // エラーをデスクトップ通知
//       errorHandler: notify.onError('Error: <%= error.message %>')
//     }))
//     .pipe(pug({
//       doctype: 'html',
//       pretty: false //htmlを圧縮
//     }))
//     .pipe(gulp.dest(dest));
// });

global.watch.push("pug:watch")
global.build.push("pug")

