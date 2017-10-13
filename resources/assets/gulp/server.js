const gulp = require("gulp");
const browserSync = require("browser-sync");
const {src, dest} = global;

gulp.task('server', () =>
	browserSync({
		server: {
			baseDir: [dest],
		},
		ghostMode: {
			clicks: false,
			location: true
		},
		startPath: src,
		open: true
	})
);
