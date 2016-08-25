/* global FRIENDLYURLMAPPING */

import { pathname as joinUrl } from 'join-url';

/**
 * @typedef {Object} UrlParts
 * @type Object
 * @property {string} basename Calculated base url. E.g. for use when creating react-router history
 * @property {string} pagePrefix Calculated prefix for URLs
 */

/**
 *
 * @type {UrlParts}
 */
export const urlParts = getPageUrl(location.pathname);

/**
 * Takes location.pathname and based on that generates
 * url parts which are needed to create urls for <Link>,
 * <Route> and React Router History.
 *
 * @param {string} locationPathname Pathname, the part of URL without host
 * @return {UrlParts}
 */
function getPageUrl(locationPathname) {
	let pathname = locationPathname;

	const delimPos = pathname.indexOf('/-/');
	if (delimPos > -1) {
		pathname = pathname.substr(0, delimPos);
	}

	if (!pathname || pathname === '/') {
		return {
			basename: '',
			pagePrefix: '/'
		};
	}

	if (pathname.slice(-1) === '/') {
		return {
			basename: pathname,
			pagePrefix: '/'
		};
	}

	const pathArr = pathname.split('/');
	const page = pathArr.pop();
	return {
		basename: pathArr.join('/'),
		pagePrefix: page
	};
}

/**
 * Combines prefix(es) with slug to create a complete URL
 * for <Route> component
 *
 * @example
 * <Route path={ createRouteURL('about') } component={ About } />
 *
 * @param {string} slug URL slug, e.g. something/like/this
 * @returns {string} Complete URL
 */
export function createRouteURL(slug) {
	return joinUrl('/', urlParts.pagePrefix, '/-/hello-world/', slug);
}

/**
 * Combines prefix(es) with slug to create a complete URL
 * for <Link> component
 *
 * @example
 * <Link to={ createURL('/about') }>About</Link>
 *
 * @param {string} slug URL slug
 * @returns {string} Complete URL
 */
export function createURL(slug) {
	if (slug === '/') {
		return urlParts.pagePrefix ? joinUrl('/', urlParts.pagePrefix) : '';
	}
	return joinUrl(urlParts.pagePrefix, '/-/', FRIENDLYURLMAPPING, slug);
}
