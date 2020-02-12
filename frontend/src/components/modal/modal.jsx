// ED: created new modal component file

import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import LoginFormContainer from "../session/login_form_container";
import SignupSecondFormContainer from "../session/signup_second_form_container";
import SignupFirstFormContainer from "../session/signup_first_form_container";
import "./modal.css"

function Modal({ modal, closeModal }) {
	if (!modal) {
		return null;
	}
	let component;
	switch (modal) {
		case "login":
			component = <LoginFormContainer />;
			break;
		case "signupFirst":
			component = <SignupFirstFormContainer />;
			break;
		case "signupSecond":
			component = <SignupSecondFormContainer />;
		default:
			return null;
	}
	return (
		<div className="modal-background" onClick={closeModal}>
			<div className="modal-child" onClick={e => e.stopPropagation()}>
				{component}
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		// modal: state.ui.modal
		modal: state.modal
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () => dispatch(closeModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
