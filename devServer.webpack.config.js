/**
 * Created by jiljiang on 2016/10/12.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-source-map',

	entry: [
		'webpack-hot-middleware/client',
		'./src/index'
	],

	output: {
		path: path.join(__dirname, 'builds'),
		filename: 'bundle.js',
		publicPath: './builds/',
		publicPath: '/builds/'
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),

		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname
			},
		]
	},

	target:'electron'
};
