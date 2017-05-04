/**
 * Created by jiljiang on 2016/10/12.
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	// devtool: 'source-map',
	devtool: 'cheap-module-eval-source-map',

	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client',
			'./src/index'
		]
	},

	output: {
		path: path.join(__dirname, 'builds'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:1128/builds/'
	},

	plugins: [
		new ExtractTextPlugin('style.css', { allChunks: true }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),

		new webpack.DefinePlugin({
			'process.env': JSON.stringify('development'),
		}),

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),

		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./builds/manifest.json'),
		}),

		new webpack.IgnorePlugin(/common\.config/),
	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.scss/,
				loaders: [
					'style-loader',
					'css-loader?sourceMap&modules&importLoaders=1&localIdentName=bdp_[local]_[hash:base64:5]',
					'postcss-loader?sourceMap=inline',
					'sass-loader?sourceMap',
				],
				exclude: /style/,
			},
			{
				test: /\.scss/,
				loaders: [
					'style-loader',
					'css-loader?sourceMap&importLoaders=1',
					'postcss-loader?sourceMap=inline',
					'sass-loader?sourceMap',
				],
				include: /style/,
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
				loader: 'file?prefix=font/',
			},
			{
				test: /\.(png|gif|jpe?g|svg)$/i,
				loader: 'file?prefix=img/',
			},
		],
	},

	resolve: {
		modulesDirectories: ['node_modules', './src'],
	},
	target:'electron-renderer',
};
