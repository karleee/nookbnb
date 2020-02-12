import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { signup, login } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import SignupSecondFormContainer from "./signup_second_form_container";

class SignupFirstForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: {}
		};

		// this.handleSubmit = this.handleSubmit.bind(this);
		this.clearedErrors = false;
		this.handleDemo = this.handleDemo.bind(this);
		// this.handleSignup = this.handleSignup.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// if (nextProps.signedIn === true) {
		if (nextProps.currentUser === true) {
			this.props.history.push("/");
		}

		this.setState({ errors: nextProps.errors });
	}

	handleDemo(e) {
		e.preventDefault();
		const user = { email: "user1@gmail.com", password: "user1password" };
		this.props.demoLogin(user).then(this.props.closeModal);
	}

	// handleSignup(e) {
	// 	e.preventDefault();
	// // 	this.props.closeModal()
	// this.openModal("signupSecond")
	// this.props.history.push("/");
	// }
	
	handleSubmit(e) {
		e.preventDefault();
		openModal("signupSecond");
	}

	renderErrors() {
		return (
			<ul>
				{Object.keys(this.state.errors).map((error, i) => (
					<li key={`error-${i}`}>{this.state.errors[error]}</li>
				))}
			</ul>
		);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit}>
				<h3>Sign up</h3>
				<br />
				<div onClick={this.handleDemo}>
					<button>Log in as Demo User</button>
				</div>
				<br/> or <br/>
				{/* <div onClick={this.handleSignup}>
					<button>Continue with email</button>
				</div> */}
				{this.props.signupSecond}
				{/* <button onClick={() => openModal("signupSecond")}>Continue with email</button>
				<br/> */}
				<input type="submit" value="Continue with email" />
				<br/>
				Already have an account? {this.props.login}
				{/* <Link to="/login" onClick={() => openModal("login")}>
					Log in
				</Link> */}
				</form>
				<SignupSecondFormContainer />
			</div>
		);
	}
}

export default withRouter(SignupFirstForm);