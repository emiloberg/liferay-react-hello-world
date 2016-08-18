import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import sagaMiddleware from 'sagas';

const finalCreateStore = compose(
	applyMiddleware(sagaMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState);

	// Hot reload reducers
	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers')/* .default if you use Babel 6+ */)
		);
	}

	return store;
}
