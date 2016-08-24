import React from 'react';
import { urlParts, createRouteURL } from 'helpers/url';
import { IndexRoute, Route } from 'react-router';

import App from 'routes/App/App';
import Home from 'routes/Home/Home';
import About from 'routes/About/About';

const routes = (
	<Route path={ urlParts.pagePrefix } component={ App }>
		<IndexRoute component={ Home } />
		{/* Below needed for portlet on front page with
		 portlet namespace (url: server.com/-/namespace)  */}
		<Route path={ '-/' + FRIENDLYURLMAPPING } component={ Home } />
		<Route path={ createRouteURL('about') } component={ About } />
	</Route>
);


export default routes;
