import { OPEN_MODAL, OPEN_SPOT_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

const _initialSpotModal = {
	formType: '',
	imageNum: ''
}

const modalReducer = (state = null, action) => { 
	Object.freeze(state);
	
	switch (action.type) {
		case OPEN_MODAL:
			return { formType: action.formType };
		case OPEN_SPOT_MODAL:
			return Object.assign({}, _initialSpotModal, { formType: action.formType, imageNum: action.imageNum });
		case CLOSE_MODAL:
			return null;
		default:
			return state;
	}
}

export default modalReducer;