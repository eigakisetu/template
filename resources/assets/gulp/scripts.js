const gulp = require("gulp");
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const webpack_config = require('./webpack.config.js');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const gulp_if = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const {src, dest, useWebpack, minifyOption} = global;

const concatFiles = ['./resources/assets/js/lib/jquery-3.1.1.min.js', './resources/assets/js/app.js']

gulp.task('scripts', function () {
	return gulp.src(concatFiles)
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
		.pipe(gulp_if(minifyOption.scripts, uglify({
			preserveComments: 'license'
		})))//jsを圧縮 option:ライセンス表記は圧縮しない
		.pipe(sourcemaps.write('./maps/'))
		.pipe(gulp.dest(dest + 'js/'));
});

gulp.task('scripts:webpack', function () {
	return gulp.src('resources/js/app.js')
		.pipe(plumber())
		.pipe(webpack(webpack_config))
		.pipe(gulp_if(minifyOption.scripts, uglify({
			preserveComments: 'license'
		})))//jsを圧縮 option:ライセンス表記は圧縮しない
		.pipe(gulp.dest(dest + 'js/'));
});

gulp.task("scripts:watch", () => {
	let target = [
		'resources/assets/js/**/*.*'
	];
	return gulp.watch(target, [useWebpack ? 'scripts:webpack' : 'scripts'])
});

global.watch.push("scripts:watch")
global.build.push(useWebpack ? 'scripts:webpack' : 'scripts')
