import React from "react";
import { connect } from "react-redux";
import { signup, login } from "../../actions/session_actions";
import SignupSecondForm from "./signup_second_form";
import { openModal, closeModal } from "../../actions/modal_actions";

const mapStateToProps = state => {
	return {
		signedIn: state.session.isSignedIn,
		errors: state.errors.session,
		formType: "signupSecond"
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signup: user => dispatch(signup(user)),
		// signup: user => dispatch(login(user)),
		login: (
			<span
				onClick={() => dispatch(openModal("login"))}
				className="session-link"
			>
				Log in
			</span>
		),
		closeModal: () => dispatch(closeModal()),
		openModal: formType => dispatch(openModal(formType))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupSecondForm);
