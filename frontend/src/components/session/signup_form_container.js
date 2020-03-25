import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import SignupFirstForm from "./signup_first_form";

// Mapping state to props
const mapStateToProps = state => ({
	signedIn: state.session.isSignedIn,
	errors: state.errors.session,
	formType: "signupFirst"
});

// Mapping dispatched functions to props
const mapDispatchToProps = dispatch => ({
	demoLogin: user => dispatch(login(user)),
	signupSecond: (
		<button onClick={() => dispatch(openModal("signupSecond"))} className="session-submit">
			Continue with email
		</button>
	),
	openModal: formType => dispatch(openModal(formType)),
	closeModal: () => dispatch(closeModal()),
	login: (
		<span onClick={() => dispatch(openModal("login"))} className="session-link">Log in</span>
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupFirstForm);
