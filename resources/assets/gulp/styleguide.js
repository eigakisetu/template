const gulp = require("gulp");
const del = require('del');//deleteができる
const styleguide = require('sc5-styleguide')
const runSequence = require("run-sequence")
const sass = require('gulp-sass');

const {src, dest} = global;

gulp.task('styleguide:generate', function () {
	return gulp.src('resources/assets/scss/**/*.*')
		.pipe(styleguide.generate({
			//port: 4000,
			//server: true,
			title: 'styleguide',
			enableJade: false,
			rootPath: "public",
			appRoot: "../styleguide",
			overviewPath: 'resources/styleguide/overview.md',
			extraHead: [
				'<style>html{font-size:62.5%;}body{font-size:1.6rem;}</style>'
			],
		}))
		.pipe(gulp.dest(dest + "styleguide"));
});

gulp.task('styleguide:applystyles', function () {
	return gulp.src('resources/assets/scss/**/*.*')
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(styleguide.applyStyles())
		.pipe(gulp.dest(dest + "styleguide"));
});

gulp.task('styleguide:clean', del.bind(null, [dest + "styleguide"]));

gulp.task('styleguide', ["styleguide:clean"], function (cb) {
	return runSequence('sass', ['styleguide:generate', 'styleguide:applystyles'], cb);
});

global.build.push("styleguide")
