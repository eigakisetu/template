const gulp = require("gulp");
const {dest, minifyOption} = global;
const imagemin = require('gulp-imagemin');


gulp.task('copy:iconfonts', function () {
	return gulp.src(['resources/assets/icons/font/**'])
		.pipe(gulp.dest(dest + 'fonts'))
});

gulp.task('copy:images', function () {
	//todo:dummyフォルダをbuild時に省く
	return gulp.src([
		'resources/assets/images/**/*.*',
		// '!' + 'resources/assets/images/_**/*.*',
	])
		.pipe(gulp.dest(dest + 'images'))
});

gulp.task('copy:images:minify', function () {
	let target = ['resources/assets/images/**/*.*'];
	gulp.src(target)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest(dest + 'images'))
});

gulp.task('copy:htaccess', () => {
	gulp.src(['resources/.htaccess'])
		.pipe(gulp.dest(dest))
});

gulp.task("iconfonts:watch", () => {
	let target = ['resources/assets/icons/font/**'];
	return gulp.watch(target, ["copy:iconfonts"])
});

gulp.task("images:watch", () => {
	let target = ['resources/assets/images/**/*.*'];
	return gulp.watch(target, [minifyOption.images ? "copy:images:minify" : 'copy:images'])
});

gulp.task("htaccess:watch", () => {
	let target = ['resources/.htaccess'];
	return gulp.watch(target, ["copy:htaccess"])
});


global.build.push("copy:iconfonts")
global.build.push("images:minify")
global.build.push(minifyOption.images ? "copy:images:minify" : 'copy:images')
global.build.push("copy:htaccess")

global.watch.push("copy:iconfonts")
global.watch.push("copy:images")
global.watch.push("copy:htaccess")
global.watch.push("iconfonts:watch")
global.watch.push("images:watch")
global.watch.push("htaccess:watch")
