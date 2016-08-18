/**
 * This is a helper file to make building a bit smoother
 * It's run as a part of 'npm run build' (see package.json)
 *
 * It will look at the ./dist folder to figure out the
 * new names of the js and css bundles, then use those names
 * and replace the header-portlet-css/footer-portlet-javascript
 * values in ../portlet/src/main/webapp/WEB-INF/liferay-portlet.xml
 */

var fs = require('fs');
var replace = require('replace');

var directoryContent = fs.readdirSync('./dist');

var cssFile;
var jsFile;

directoryContent.forEach(function(item) {
	if (item.match(/\.css$/)) {
		cssFile = item;
	}
	if (item.match(/\.js$/)) {
		jsFile = item;
	}
});

if (!jsFile || !cssFile) {
	console.log('\n\nError: Could not find the JS or CSS file\n\n');
	process.exit(1);
}

replace({
	regex: '<header-portlet-css>\/static\/bundle.*?\.css.*?<\/header-portlet-css>',
	replacement: '<header-portlet-css>/static/' + cssFile + '?minifierType=</header-portlet-css>',
	paths: ['../portlet/src/main/webapp/WEB-INF/liferay-portlet.xml']
});

replace({
	regex: '<footer-portlet-javascript>\/static\/bundle.*?\.js.*?<\/footer-portlet-javascript>',
	replacement: '<footer-portlet-javascript>/static/' + jsFile + '?minifierType=</footer-portlet-javascript>',
	paths: ['../portlet/src/main/webapp/WEB-INF/liferay-portlet.xml']
});
