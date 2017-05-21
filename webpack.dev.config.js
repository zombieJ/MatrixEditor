/**
 * Created by jiljiang on 2016/10/12.
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	// devtool: 'source-map',
	devtool: 'cheap-module-eval-source-map',

	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client',
			'./src/index',
		]
	},

	output: {
		path: path.join(__dirname, 'builds'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:1128/builds/',
	},

	plugins: [
		new ExtractTextPlugin('style.css'),
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
		new webpack.IgnorePlugin(/vertx/),
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
				}],
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=bdp_[local]_[hash:base64:5]' },
					{ loader: 'postcss-loader?sourceMap=inline' },
					{ loader: 'sass-loader?sourceMap' },
				],
				exclude: /style/,
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader?sourceMap&importLoaders=1' },
					{ loader: 'postcss-loader?sourceMap=inline' },
					{ loader: 'sass-loader?sourceMap' },
				],
				include: /style/,
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
				],
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)/,
				use: [{
					loader: 'file-loader?prefix=font/',
				}],
			},
			{
				test: /\.(png|gif|jpe?g|svg)$/i,
				use: [{
					loader: 'file-loader?prefix=img/',
				}],
			},
		],
	},

	resolve: {
		modules: [
			'node_modules',
			path.join(__dirname, 'src'),
		],
	},
	target: 'electron-renderer',
};
