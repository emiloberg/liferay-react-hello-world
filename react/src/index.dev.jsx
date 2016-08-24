/* global module,require */

/**
 * If you do not want to use React Router, change the
 * 'Router' here to any component you want to render.
 *
 * Don't forget to do the same thing in
 * both index.dev and index.prod
 */

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore.dev';
import Router from 'routes/router';

const store = configureStore({
	helloMsg: 'Monator is awesome'
});

const rootEl = document.getElementById('root');
ReactDOM.render(
	<AppContainer>
		<Provider store={ store } >
			<Router />
		</Provider>
	</AppContainer>,
	rootEl
);

if (module.hot) {
	module.hot.accept('./routes/router', () => {
		// If you use Webpack 2 in ES modules mode, you can
		// use <App /> here rather than require() a <NextApp />.
		//eslint-disable-next-line global-require
		const NextRouter = require('routes/router').default;

		ReactDOM.render(
			<AppContainer>
				<Provider store={ store } >
					<NextRouter />
				</Provider>
			</AppContainer>,
			rootEl
		);
	});
}
