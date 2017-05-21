/**
 * Created by jiljiang on 2016/10/12.
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',

	entry: {
		vendor: [
			'classnames',
			'electron-json-storage',
			'fs-extra',
			'graceful-fs',
			'immutable',
			'immutable-kv',
			'jquery',
			'lodash',
			'react',
			'react-css-modules',
			'react-dom',
			'react-dnd',
			'react-dnd-html5-backend',
			'react-redux',
			'redux',
			'redux-logger',
			'redux-thunk',
			'valve-vpk',
			'warning',
		],
	},

	output: {
		path: path.join(__dirname, 'builds'),
		publicPath: '/builds/',
		filename: '[name].bundle.js',
		library: '[name]',
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
		}),

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),

		new webpack.DllPlugin({
			context: __dirname,
			path: path.join(__dirname, 'builds', 'manifest.json'),
			name: '[name]',
		}),
		new ExtractTextPlugin('common.css'),
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
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
					// publicPath: '/builds',
				}),
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
