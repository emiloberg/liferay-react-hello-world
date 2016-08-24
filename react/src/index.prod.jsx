/**
 * If you do not want to use React Router, change the
 * 'Router' here to any component you want to render.
 *
 * Don't forget to do the same thing in
 * both index.dev and index.prod
 */

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore.prod';
import Router from 'routes/router';

const Index = (initProps) => {
	const store = configureStore(initProps);

	return (
		<Provider store={ store } >
			<Router />
		</Provider>
	);
};

module.exports = {
	reactComponent: Index
};
