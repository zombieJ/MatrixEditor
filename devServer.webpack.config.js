/**
 * Created by jiljiang on 2016/10/12.
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',

	entry: {
		app: [
			'webpack-hot-middleware/client',
			'./src/index'
		],
		vendor: [
			"classnames",
			"electron-json-storage",
			"fs-extra",
			"immutable",
			"jquery",
			"react",
			"react-css-modules",
			"react-dom",
			"react-redux",
			"react-router",
			"redux",
			"redux-logger",
			"redux-thunk",
			"warning",
		]
	},

	output: {
		path: path.join(__dirname, 'builds'),
		filename: 'bundle.js',
		publicPath: '/builds/'
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
		new ExtractTextPlugin('style.css', { allChunks: true }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),

		new webpack.DefinePlugin({
			'process.env': JSON.stringify('development')
		}),

		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],

	module: {
		preLoaders: [{
			test: /\.js$/,
			loader: 'eslint',
			exclude: /node_modules/,
			include: __dirname
		}],
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
				),
				exclude: /style/,
			},
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?sourceMap&importLoaders=1!sass-loader?sourceMap'
				),
				include: /style/
			},
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader'
				),
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)/,
				loader: 'file?prefix=font/'
			},
			{
				test:   /\.(png|gif|jpe?g|svg)$/i,
				loader: 'file?prefix=img/',
			},
		]
	},

	resolve: {
		modulesDirectories: ['node_modules', './src']
	},

	target:'electron-renderer'
};
