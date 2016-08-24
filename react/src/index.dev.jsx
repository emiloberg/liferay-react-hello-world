/* global module,require */

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore.dev';
import App from 'components/dumb/NewApp/NewApp';

const store = configureStore({
	helloMsg: 'Monator is awesome'
});

const rootEl = document.getElementById('root');
ReactDOM.render(
	<AppContainer>
		<Provider store={ store } >
			<App />
		</Provider>
	</AppContainer>,
	rootEl
);

if (module.hot) {
	module.hot.accept('./components/dumb/NewApp/NewApp', () => {
		// If you use Webpack 2 in ES modules mode, you can
		// use <App /> here rather than require() a <NextApp />.
		//eslint-disable-next-line global-require
		const NextApp = require('components/dumb/NewApp/NewApp').default;

		ReactDOM.render(
			<AppContainer>
				<Provider store={ store } >
					<NextApp />
				</Provider>
			</AppContainer>,
			rootEl
		);
	});
}
