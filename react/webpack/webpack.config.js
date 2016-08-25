'use strict'; //eslint-disable-line
/**
 * Imports
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const parseString = require('xml2js').parseString;

function createConfig(artifactId, friendlyUrlMapping) {
	/**
	 * Save current build modes
	 */
	const DEVELOPMENT = process.env.NODE_ENV === 'development';
	const TEST = process.env.NODE_ENV === 'test';
	const PRODUCTION = process.env.NODE_ENV === 'production';

	/**
	 * CSS/JS Bundle Filenames
	 *
	 * When building for production, the file's hash is addedto js/css filenames.
	 * This is an easy way to bust web browser caches.
	 *
	 * Of course this means that every time a new build is made,
	 * the Liferay portlet (liferay-portlet.xml) needs to be updated
	 * to match the new filenames. This is automagically when building.
	 * The buildstep in the package.json is called "build:replace-filenames"
	 * and it will run the file replace-filesnames.js which takes
	 * care of the replacing.
	 *
	 * As you can see the css bundle filename is always set to contain
	 * content hash. This is because it's only used for production mode.
	 * Webpack dev server takes care of serving the css file when in
	 * development mode and it doesn't care about the filename.
	 *
	 */
	const jsBundleFilename = PRODUCTION ? 'bundle.[hash].min.js' : 'bundle.min.js';
	const cssBundleFilename = 'bundle.[contenthash].min.css';

	/**
	 * Loaders, JSX.
	 */
	const jsxLoader = ['babel-loader'];

	/**
	 * Loaders, SCSS.
	 *
	 * When building for production this uses Extract Text Plugin to extract all css style
	 * and concatenate it to a single css file.
	 *
	 * CSS Selector Name:
	 * When in production/development mode - We make each css selector name
	 * (e.g .myClassName, #myId, etc) unique by adding a hash.
	 * However, this makes it hard to test so when running in test mode
	 * the selector names are the actual selectors names (and can be tested).
	 */
	const cssSelectorName = TEST ? '[local]' : '[name]__[local]___[hash:base64:5]';
	let cssLoader;
	const cssLoaderParts = [
		'css-loader?sourceMap&modules&importLoaders=1&localIdentName=' + cssSelectorName + '',
		'sass?sourceMap'
	];
	if (PRODUCTION) {
		cssLoader = ExtractTextPlugin.extract('style', cssLoaderParts);
	} else {
		cssLoader = 'style!' + cssLoaderParts.join('!');
	}

	/**
	 * Image loader
	 *
	 * Inline base64 URLs for <=8k images. All other images gets a
	 * direct URL.
	 */
	const imageLoader = 'url-loader?limit=8192&name=assets/[hash:10].[ext]';

	/**
	 * Plugins
	 */
	const plugins = [
		/**
		 * Make the current build mode available as global
		 * variables inside the Javascript. This way we can do things like
		 * if (DEVELOPMENT) { console.log("We're in dev mode") }
		 */
		new webpack.DefinePlugin({
			FRIENDLYURLMAPPING: JSON.stringify(friendlyUrlMapping),
			DEVELOPMENT: JSON.stringify(DEVELOPMENT),
			TEST: JSON.stringify(TEST),
			PRODUCTION: JSON.stringify(PRODUCTION),
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
	];
	if (DEVELOPMENT) {
		/**
		 * Register Hot Module Replacement in Dev mode
		 */
		plugins.push(new webpack.HotModuleReplacementPlugin());
	} else if (PRODUCTION) {
		/**
		 * In production mode:
		 * 	- Register Extract Text Plugin (put all style in a single file)
		 * 	- Search for equal or similar files and deduplicate them in the output.
		 * 	- Minimize all JavaScript output
		 */
		plugins.push(new ExtractTextPlugin(cssBundleFilename, { allChunks: true }));
		plugins.push(new webpack.optimize.DedupePlugin());
		plugins.push(new webpack.optimize.UglifyJsPlugin({
			comments: false,
			screw_ie8: true
		}));
	}

	/**
	 * Entry
	 *
	 * Use different entries for production and development mode.
	 * When in development mode we want to render the component to a
	 * html element with the id of 'root'. When in production mode we want
	 * the portlet to take care of the rendering process as it can render it
	 * to a namespaced element.
	 *
	 * Also, in dev mode, make sure hot-loading works
	 */
	const entry = {
		bundle: [
			'./src/index.prod.jsx'
		]
	};
	if (DEVELOPMENT) {
		entry.bundle = [
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
			'react-hot-loader/patch',
			'./src/index.dev.jsx'
		];
	}

	/**
	 * Dev Tool (source maps)
	 *
	 * Generate source maps in development mode. In production mode,
	 * create a source map but do not include any references to it.
	 * This way a developer can load the source map (which is generated)
	 * in his/her browser when the need to debug the live environment arises.
	 */
	let devtool;
	if (DEVELOPMENT) {
		devtool = 'source-map';
	} else if (TEST) {
		devtool = 'inline-source-map';
	} else if (PRODUCTION) {
		devtool = 'hidden-source-map';
	}

	/**
	 * External packages
	 *
	 * List of packages which should *not* be included in the bundle,
	 * but rather loaded witch a separate <script> tag. E.g. from a CDN.
	 */
	const externals = {};
	if (PRODUCTION) {
		externals.react = 'React';
		externals['react-dom'] = 'ReactDOM';
	}

	/**
	 * A good developer lints his/her code. By adding the
	 * eslint-loader as a preLoader linting will be done every time
	 * a file updates. The results are reported both in the console
	 * and sent to the browser console.
	 */
	const preLoaders = [];
	if (DEVELOPMENT || TEST) {
		preLoaders.push({
			test: /\.jsx?$/,
			loader: 'eslint-loader',
			exclude: /node_modules/
		});
	}

	/**
	 * Output
	 *
	 * Output the finished bundle file to a folder named dist and name it bundle.js.
	 *
	 * When in production mode, export the entire bundle as a variable.
	 * Webpack can export the bundle in all common library formats
	 * (e.g. CommonJS/UMD/AMD/etc), here we specify that we want to export it by
	 * setting a variable. We also specify that the library name should be
	 * reactComponents, helloWorldFromReact.
	 *
	 * What all this means is that if we build for production and add the bundle.js
	 * file on a webpage, the app will be available at
	 * window.reactComponents.{artifactId}
	 */
	const output = {
		path: path.join(__dirname, '../dist'),
		filename: jsBundleFilename,
		publicPath: '/'
	};
	if (PRODUCTION) {
		output.libraryTarget = 'var';
		output.library = ['reactComponents', artifactId];
		output.publicPath = '/' + artifactId + '/static/';
	}

	/**
	 * Webpack Configuration
	 */
	return {
		devtool,
		entry,
		output,
		plugins,
		externals,
		module: {
			preLoaders,
			loaders: [{
				test: /\.jsx?$/,
				loaders: jsxLoader,
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				loader: cssLoader,
				exclude: /node_modules/
			}, {
				test: /\.(png|jpg|gif)$/,
				loader: imageLoader,
				exclude: /node_modules/
			}]
		},
		resolve: {
			root: path.resolve(__dirname, '..'),
			alias: {
				components: 'src/components',
				reducers: 'src/reducers',
				store: 'src/store',
				sagas: 'src/sagas',
				helpers: 'src/helpers',
				routes: 'src/routes',
			},
			extensions: ['', '.js', '.json', '.jsx', '.css']
		}
	};
}

/**
 * Read artifactId from pom.xml
 *
 * The artifactId is used in a few places:
 *	- It's the base URL for any files in the portlet.
 *		E.g: If you add an image to the project, it will be available
 *		at server.com/my-artifact-id/static/assets/.c9a5ddd9d2.jpg
 *		Therefor we need to set the output.publicPath of the Webpack
 *		config to "/{artifactId}/static/" so that all URLs gets
 *		prepended with this.
 *	- When we build for production and add the bundle.js
 * 		file on a webpage, the app will be available at
 * 		window.reactComponents.{artifactId}
 * 		This way we have a can namespace the different React portlets
 */
function getArtifactId() {
	return new Promise(resolve => {
		const pomXML = fs
			.readFileSync('../portlet/pom.xml', 'utf8');
		parseString(pomXML, function (err, result) {
			if (err) {
				console.log('Error reading pom.xml, error 6');
				console.log(err);
				process.exit(1);
			}

			if (result.project.artifactId.length !== 1) {
				console.log('Could not read artifactId from pom.xml, error 1');
				process.exit(1);
			}

			resolve(result.project.artifactId[0]);
		});
	});
}

/**
 * Read friendly-url-mapping from liferay-portlet.xml
 *
 * The friendly-url-mapping is used to build URLs in the React portlet
 */
function getFriendlyURLMapping() {
	return new Promise(resolve => {
		const lrPortletXML = fs
			.readFileSync('../portlet/src/main/webapp/WEB-INF/liferay-portlet.xml', 'utf8');
		parseString(lrPortletXML, function (err, result) {
			if (err) {
				console.log('Error reading liferay-portlet.xml, error 5');
				console.log(err);
				process.exit(1);
			}

			if (result['liferay-portlet-app'].portlet.length !== 1) {
				console.log('Could not understand liferay-portlet.xml, error 3');
				process.exit(1);
			}

			if (result['liferay-portlet-app'].portlet[0]['friendly-url-mapping'].length !== 1) {
				console.log('Could not understand liferay-portlet.xml, error 4');
				process.exit(1);
			}

			resolve(result['liferay-portlet-app'].portlet[0]['friendly-url-mapping'][0]);
		});
	});
}

function generate() {
	let artifactId;
	let friendlyUrlMapping;

	return getArtifactId()
		.then((data) => { artifactId = data; })
		.then(getFriendlyURLMapping)
		.then((data) => { friendlyUrlMapping = data; })
		.then(() => (
			createConfig(
				artifactId,
				friendlyUrlMapping
			)
		));
}

module.exports = new Promise((resolve) => {
	generate().then(resolve);
});
