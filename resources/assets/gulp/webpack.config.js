var webpack = require('webpack');

module.exports = {
	entry: {
		'bundle': ['./resources/assets/js/app.js']
	},
	output: {
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ['es2015', 'stage-0']
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	]
};
