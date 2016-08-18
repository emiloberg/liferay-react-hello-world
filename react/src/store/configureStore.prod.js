import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import sagaMiddleware from 'sagas';

const finalCreateStore = compose(
	applyMiddleware(sagaMiddleware)
)(createStore);

export default function configureStore(initialState) {
	return finalCreateStore(rootReducer, initialState);
}
