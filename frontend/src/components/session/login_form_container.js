import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import LoginForm from "./login_form";

// ED: added formType
const mapStateToProps = state => {
	return {
		errors: state.errors.session,
		formType: "login"
	};
};

// ED: added openOpen, closeModal, signup, loginDemo
const mapDispatchToProps = dispatch => {
	return {
		login: user => dispatch(login(user)),
		signupFirst: (
			<button onClick={() => dispatch(openModal("signupFirst"))}>Sign up</button>
		),
		demoLogin: user => dispatch(login(user)),
		openModal: formType => dispatch(openModal(formType)),
		closeModal: () => dispatch(closeModal()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
