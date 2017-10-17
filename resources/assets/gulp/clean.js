const gulp = require("gulp");
const del = require('del');
const {dest} = global;

gulp.task('clean',
  del.bind(null, [dest])
);
gulp.task('clean:images',
	del.bind(null, [dest,'./resources/assets/images'])
);


global.build.unshift("clean")
