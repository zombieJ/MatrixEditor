/**
 * Created by jiljiang on 2016/10/12.
 */

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new (express)();

const config = require('../devServer.webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath.replace(/^\./, "")}));
app.use(webpackHotMiddleware(compiler));

app.get("/", function (req, res) {
	res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.listen(3333, function () {
	console.log('Server listening...');
});
