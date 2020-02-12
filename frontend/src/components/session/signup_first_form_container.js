import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import SignupFirstForm from "./signup_first_form";

const mapStateToProps = state => {
	return {
		// signedIn: state.session.isSignedIn,
		errors: state.errors.session,
		formType: "signupFirst"
	};
};

const mapDispatchToProps = dispatch => {
	return {
		demoLogin: user => dispatch(login(user)),
		signupSecond: (
			<button onClick={() => dispatch(openModal("signupSecond"))}>
				Continue with email
			</button>
		),
		openModal: formType => dispatch(openModal(formType)),
		closeModal: () => dispatch(closeModal()),
		login: (
			<button onClick={() => dispatch(openModal("login"))}>Log in</button>
		),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupFirstForm);
