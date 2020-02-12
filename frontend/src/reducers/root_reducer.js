import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import modal from "./modal_reducer";
import entities from './entities_reducer';
import ui from './ui_reducer';

// ED: added modal
const RootReducer = combineReducers({
	session,
	errors,
	modal,
	entities,
	ui
});

export default RootReducer;
