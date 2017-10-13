'use strict';

const gulp = require("gulp");
const runSequence = require("run-sequence")

global.watch = [];
global.build = [];

global.src = "./";
global.dest = "./public/";
global.useWebpack = false;
global.minifyOption = {
	"pug": true,
	"sass": true,
	"scripts": true
};

require("./resources/assets/gulp/server.js")
require("./resources/assets/gulp/pug.js")
require("./resources/assets/gulp/sass.js")
require("./resources/assets/gulp/scripts.js")
// require("./resources/assets/gulp/styleguide.js")
require("./resources/assets/gulp/clean.js")
require("./resources/assets/gulp/copy.js")

gulp.task("watch", global.watch)

gulp.task("prod", () => {
	runSequence.apply(this, global.build)
})

gulp.task("default", ["server", "watch"])
