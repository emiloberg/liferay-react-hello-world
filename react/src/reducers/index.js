import { combineReducers } from 'redux';
import counter from 'sagas/counter';

export default combineReducers({
	counter,
	helloMsg: (state = '') => state,
});
