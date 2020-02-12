import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import modal from "./modal_reducer";

// ED: added modal
const RootReducer = combineReducers({
	session,
	errors,
	modal,
});

export default RootReducer;
