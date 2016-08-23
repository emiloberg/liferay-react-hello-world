/* eslint-disable */

/**
 * Liferay responds in the same way with both trailing and non trailing slashes
 */

import React from 'react';

import joinurl from 'join-url';

import { Redirect, IndexRoute, Router, Route, Link, useRouterHistory, browserHistory, hashHistory } from 'react-router';
import useBasename from 'history/lib/useBasename';
// import { createHistory, useBasename } from 'history';
// import { createHashHistory, createBrowserHistory } from 'history';



import createBrowserHistory from 'history/lib/createBrowserHistory';

const basePath = getPageUrl(location.pathname);

function createURL(endSlug) {
	if (endSlug === '/') {
		return basePath.pagePrefix ? joinurl.pathname('/', basePath.pagePrefix) : '';
	}
	return joinurl.pathname(basePath.pagePrefix, '/-/', FRIENDLYURLMAPPING, endSlug);
}

const App = ({ children }) => (
		<div>
			<h1>App</h1>
			<h2>{ FRIENDLYURLMAPPING }</h2>
			<ul>
				<li><a href="/">Front</a></li>
				<li><a href="http://local.dev:3000/-/hello-world/">Front with namespace</a></li>
				<li><a href="http://local.dev:3000/-/hello-world/about">Front with namespace + param</a></li>
			</ul>
			<ul>
				<li><a href="http://local.dev:3000/en_US/web/guest/react-example/">Sub trailing</a></li>
				<li><a href="http://local.dev:3000/en_US/web/guest/react-example">Sub no trailing</a></li>
				<li><a href="http://local.dev:3000/en_US/web/guest/react-example/-/hello-world/">Sub with namespace</a></li>
				<li><a href="http://local.dev:3000/en_US/web/guest/react-example/-/hello-world/about">Sub with namespace + param</a></li>
			</ul>

			<ul>
				<li><Link to={ createURL('/') }>Hem</Link></li>
				<li><Link to={ createURL('/about') }>About</Link></li>
				<li><Link to={ createURL('/inbox') }>Inbox</Link></li>
			</ul>
			<ul>
				<li><Link to={ createURL('/') }>Hem</Link></li>
				<li><Link to={ createURL('about') }>About</Link></li>
				<li><Link to={ createURL('inbox') }>Inbox</Link></li>
			</ul>
			{children}
		</div>
	);


const About = () => (
	<h2>About</h2>
);

const Inbox = () => {
		return (
			<h2>Inbox</h2>
		);
};

const Home = () => (
	<h2>Hem</h2>
);


function getPageUrl(pathname) {
	const delimPos = pathname.indexOf('/-/');
	if (delimPos > -1) {
		pathname = pathname.substr(0, delimPos);
	}

	if (!pathname || pathname === '/') {
		return {
			basePath: '',
			pagePrefix: '/',
			rootRoute: '/',
		}
	}

	if (pathname.slice(-1) === '/') {
		return {
			basePath: pathname,
			pagePrefix: '/',
			rootRoute: '/',
		}
	}

	const pathArr = pathname.split('/');
	const page = pathArr.pop();
	return {
		basePath: pathArr.join('/'),
		pagePrefix: page,
		rootRoute: page,
	};
}


const createAppHistory = useRouterHistory(createBrowserHistory);
const appHistory = createAppHistory({
	basename: basePath.basePath
});

const createRouteURL = (slug) => {
	return joinurl.pathname('/', basePath.pagePrefix, '/-/hello-world/', slug);
};


export default class AppRoot extends React.Component {
	render() {
		return (
			<Router history={ appHistory }>
				<Route path={ basePath.pagePrefix } component={ App }>
					<IndexRoute component={ Home }/>
					{/* Below needed for portlet on front page with
					portlet namespace (url: server.com/-/namespace)  */}
					<Route path={ '-/' + FRIENDLYURLMAPPING } component={ Home } />
					<Route path={ createRouteURL('about') } component={ About } />
					<Route path={ createRouteURL('inbox') } component={ Inbox } />
				</Route>
			</Router>
		);
	}
}

//<Router history={withExampleBasename(browserHistory)}>
//<Redirect from={ fullUrlNamespace } to="/" />
