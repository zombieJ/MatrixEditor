/**
 * Created by jiljiang on 2016/10/12.
 */

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new (express)();

const config = require('../webpack.dev.config');

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath.replace(/^\./, '') }));
app.use(webpackHotMiddleware(compiler));

app.use('/builds', express.static('builds'));
app.use('/scripts', express.static('scripts'));

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.listen(1128, function () {
	console.log('Server listening[1128]...');
});
