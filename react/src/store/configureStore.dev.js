import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const finalCreateStore = compose(
	applyMiddleware(sagaMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState);

	// Hot reload reducers
	if (module.hot) {
		module.hot.accept('../reducers', () =>
			//eslint-disable-next-line global-require
			store.replaceReducer(require('../reducers')/* .default if you use Babel 6+ */)
		);
	}

	return store;
}
