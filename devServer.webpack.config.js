/**
 * Created by jiljiang on 2016/10/12.
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
		new ExtractTextPlugin('style.css', { allChunks: true }),
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
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader?sourceMap'
				)
			},
		]
	},

	target:'electron'
};
