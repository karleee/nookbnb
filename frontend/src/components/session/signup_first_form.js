import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { signup, login } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import SignupSecondFormContainer from "./signup_second_form_container";
import "./session_forms.css"

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
		if (nextProps.signedIn === true) {
		// if (nextProps.currentUser === true) {
			this.props.history.push("/");
		}

		this.setState({ errors: nextProps.errors });
	}

	handleDemo(e) {
		e.preventDefault();
		const user = { email: "demouser@nookbnb.com", password: "password" };
		this.props.demoLogin(user).then(this.props.closeModal);
	}

	handleSignup(e) {
		e.preventDefault();
	// 	this.props.closeModal()
		// this.props.openModal("signupSecond");
		// .then(this.props.history.push("/"));
	}
	
	// handleSubmit(e) {
	// 	e.preventDefault();
	// 	openModal("signupSecond");
	// }

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
			<div className="session-form-container">
				<div className="session-form-box">
					<div className="session-form">
						<div onClick={this.props.closeModal} className="close-x">
							X
						</div>
						<p className="session-header">Sign up</p>
						<br />
						<div onClick={this.handleDemo} className="session-demo">
							<button className="session-submit">Log in as Demo User</button>
						</div>
						<br /> or <br />
						<div onClick={this.handleSignup}>
							{/* {this.props.signupSecond} */}
							<button
								type="submit"
								onClick={() => this.props.openModal("signupSecond")}
								className="session-submit"
							>
								Continue with email
							</button>
						</div>
						{/* <br/>  */}
						{/* <input type="submit" value="Continue with email" /> */}
						<br />
						<div className="session-text">
							Already have an account?
							<span
								onClick={() => this.props.openModal("login")}
								className="session-link"
							>
								Log in
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SignupFirstForm);