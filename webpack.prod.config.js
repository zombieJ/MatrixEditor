var config = require('./webpack.dev.config');

config.devtool = 'source-map';
config.entry = {
	app: [
		'./src/prod.index.js',
	],
};

module.exports = config;
