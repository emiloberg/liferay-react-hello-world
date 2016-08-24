/* global FRIENDLYURLMAPPING */

import React from 'react';
import { urlParts, createRouteURL } from 'helpers/url';
import { IndexRoute, Route } from 'react-router';

import App from 'components/dumb/App/App';
import Home from 'components/dumb/Home/Home';
import Kitten from 'components/dumb/Kitten/Kitten';
import MessageContainer from 'components/smart/MessageContainer/MessageContainer';
import CounterContainer from 'components/smart/CounterContainer/CounterContainer';

const routes = (
	<Route path={ urlParts.pagePrefix } component={ App }>
		<IndexRoute component={ Home } />
		{
		/**
		 * Below needed for portlet on front page when page
		 * is loaded with portlet namespace (only) in the url
		 * (e.g.: server.com/-/namespace)
		 */
		}
		<Route path={ `-/${FRIENDLYURLMAPPING}` } component={ Home } />
		<Route path={ createRouteURL('kitten') } component={ Kitten } />
		<Route path={ createRouteURL('message') } component={ MessageContainer } />
		<Route path={ createRouteURL('counter') } component={ CounterContainer } />
	</Route>
);

export default routes;
