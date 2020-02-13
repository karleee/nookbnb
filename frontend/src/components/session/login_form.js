import React from "react";
import { withRouter } from "react-router-dom";
import "./session_forms.css"

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			errors: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
		this.handleDemo = this.handleDemo.bind(this);
	}

	// Once the user has been authenticated, redirect to the Tweets page
	componentWillReceiveProps(nextProps) {
		if (nextProps.currentUser === true) {
			this.props.history.push("/");
		}

		// Set or clear errors
		this.setState({ errors: nextProps.errors });
	}

	// Render the session errors if there are any
	renderErrors() {
		return (
			<ul>
				{Object.keys(this.state.errors).map((error, i) => (
					<li key={`error-${i}`}>{this.state.errors[error]}</li>
				))}
			</ul>
		);
	}

	// renderErrors() {
	// 	return (
	// 		<ul>
	// 			{this.props.errors.map((error, i) => (
	// 				<li key={`error-${i}`}>{error}</li>
	// 			))}
	// 		</ul>
	// 	);
	// }

	// Handle field updates (called in the render method)
	update(field) {
		return e =>
			this.setState({
				[field]: e.currentTarget.value
			});
	}

	// Handle form submission
	handleSubmit(e) {
		e.preventDefault();
		let user = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.login(user)
			.then(this.props.history.push("/"), () => this.props.closeModal());
	}

	handleDemo(e) {
		e.preventDefault();
		const user = { email: "user1@gmail.com", password: "user1password" };
		this.props
			.demoLogin(user)
			.then(this.props.history.push("/"), this.props.closeModal());
	}

	render() {
		let errors;
		if (this.props.errors) {
			errors = this.props.errors;
		// } else {
		// 	errors = {};
		}
		let emailErrors = errors.email ? <div>{errors.email}</div> : <></>;
		let passwordErrors = errors.password ? (
			<div>{errors.password}</div>
		) : (
			<></>
		);

		return (
			<div className="session-form-container">
				<form onSubmit={this.handleSubmit} className="session-form-box">
					<div onClick={this.props.closeModal} className="close-x">
						X
					</div>
					<div className="session-form">
						<p className="session-form-header">Log in</p>
						<button onClick={this.handleDemo} className="session-submit">
							Log in with DemoUser
						</button>
						<br /> or <br />
						<input
							type="text"
							value={this.state.email}
							onChange={this.update("email")}
							placeholder="Email address"
							className="session-input-email"
						/>
						<div className="session-errors">{emailErrors}</div>
						<br />
						<input
							type="password"
							value={this.state.password}
							onChange={this.update("password")}
							placeholder="Password"
							className="session-input-password"
						/>
						<div className="session-errors">{passwordErrors}</div>
						<br />
						{/* <div className="modalError">{this.renderErrors()}</div> */}
						<input type="submit" value="Log in" className="session-submit" />
						<br />
						<a href="#" className="session-text">
							Forgot password?
						</a>
						<br />
						<div className="session-text">
							Don't have an account?
							<span
								onClick={() => this.props.openModal("signupFirst")}
								className="session-link"
							>
								Sign up
							</span>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(LoginForm);
