const gulp = require("gulp");
const {dest} = global;

gulp.task('copy:iconfonts', function () {
	return gulp.src(['resources/assets/icons/font/**'])
		.pipe(gulp.dest(dest + 'fonts'))
});

gulp.task('copy:images', function () {
	return gulp.src([
		'resources/assets/images/**/*.*',
		'!' + 'resources/assets/images/_**/*.*',
	])
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
	return gulp.watch(target, ["copy:images"])
});

gulp.task("htaccess:watch", () => {
	let target = ['resources/.htaccess'];
	return gulp.watch(target, ["copy:htaccess"])
});

global.build.push("copy:iconfonts")
global.build.push("copy:images")
global.build.push("copy:htaccess")
global.watch.push("copy:iconfonts")
global.watch.push("copy:images")
global.watch.push("copy:htaccess")
global.watch.push("iconfonts:watch")
global.watch.push("images:watch")
global.watch.push("htaccess:watch")
