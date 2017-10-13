const gulp = require("gulp");
const del = require('del');
const {dest} = global;

gulp.task('clean',
  del.bind(null, [dest])
);

global.build.unshift("clean")
