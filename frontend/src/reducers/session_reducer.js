import {
	RECEIVE_CURRENT_USER,
	RECEIVE_USER_LOGOUT,
	RECEIVE_USER_SIGN_IN
} from "../actions/session_actions";
import { RECEIVE_SINGLE_SPOT } from "../actions/spot_actions";

// Initial state
const initialState = {
	isAuthenticated: false,
	user: {},
	currentSpot: {}
};

// Session reducer
export default function(state = initialState, action) {
	switch (action.type) {
		case RECEIVE_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !!action.currentUser,
				user: action.currentUser
			};
		case RECEIVE_USER_LOGOUT:
			return {
				isAuthenticated: false,
				user: undefined
			};
		case RECEIVE_USER_SIGN_IN:
			return {
				...state,
				isSignedIn: true
			};
		case RECEIVE_SINGLE_SPOT:
		  return Object.assign({}, state, { currentSpot: action.spot.data });
		default:
			return state;
	}
}