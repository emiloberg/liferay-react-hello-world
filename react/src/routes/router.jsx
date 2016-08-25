import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import { urlParts } from 'helpers/url';
import routes from 'routes/routes';

const createAppHistory = useRouterHistory(createBrowserHistory);
const appHistory = createAppHistory({
	basename: urlParts.basename
});

export default () => (
	<Router history={ appHistory }>
		{ routes }
	</Router>
);
