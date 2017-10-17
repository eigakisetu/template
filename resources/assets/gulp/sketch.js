const gulp = require("gulp");
const sketch = require("gulp-sketch");

gulp.task('sketch', function () {
	return gulp.src("./sketch/*.sketch")
		.pipe(sketch({
			export: 'slices'
		}))
		.pipe(gulp.dest("./resources/assets/images/"));
});

gulp.task('sketch:watch', function () {
	let target = ['./sketch/*.sketch'];
	return gulp.watch(target, ["sketch"])
});

global.build.push("sketch")
global.watch.push("sketch:watch")
