import {
	RECEIVE_SESSION_ERRORS,
	RECEIVE_CURRENT_USER
} from '../actions/session_actions';
// import { CLOSE_MODAL } from "../actions/modal_actions";

const SessionErrorsReducer = (state = [], action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_SESSION_ERRORS:
			return action.errors;
		case RECEIVE_CURRENT_USER:
			return state;
		// case CLOSE_MODAL:
		// 	return Object.assign({}, state, {errors: []});
		default:
			return state;
	}
};

export default SessionErrorsReducer;
