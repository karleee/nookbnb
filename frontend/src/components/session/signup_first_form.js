import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { signup, login } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import SignupSecondFormContainer from "./signup_second_form_container";
import '../../assets/stylesheets/session/login_form.css';

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
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.signedIn === true) {
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
							<button
								type="submit"
								onClick={() => this.props.openModal("signupSecond")}
								className="session-submit"
							>
							Continue with email
							</button>
						</div>

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