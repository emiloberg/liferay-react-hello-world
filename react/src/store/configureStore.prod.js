import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const finalCreateStore = compose(
	applyMiddleware(sagaMiddleware)
)(createStore);

export default function configureStore(initialState) {
	return finalCreateStore(rootReducer, initialState);
}
