'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const configPromise = require('./webpack/webpack.config');

configPromise.then(config => {
	new WebpackDevServer(webpack(config), {
		publicPath: config.output.publicPath,
		hot: true,
		historyApiFallback: true,
		stats: {
			assets: false,
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false,
			children: false,
			warnings: false
		}
	}).listen(3000, '0.0.0.0', (err/*, result*/) => {
		if (err) {
			console.log(err);
		}

		console.log(`Starting in ${process.env.NODE_ENV}`);
		console.log('Listening at localhost:3000');
	});
});

