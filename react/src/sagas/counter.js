import { createAction, handleActions } from 'redux-actions';

/**
 * Dispatch Types
 */
const ADD_SUBTRACT = 'hw/data/ADD_SUBTRACT';

/**
 * Action Creators
 */
export const actionAddSubtract = createAction(ADD_SUBTRACT);

/**
 * Reducer
 */
const initState = 0;
const reducer = handleActions({
	[ADD_SUBTRACT]: (state, action) => (state + action.payload.modifier)
}, initState);

export default reducer;
