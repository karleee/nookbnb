import React from "react";
import { withRouter } from "react-router-dom";

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

		this.props.login(user).then(this.props.closeModal);
	}

	handleDemo(e) {
		e.preventDefault();
		const user = { email: "user1@gmail.com", password: "user1password" };
		this.props.demoLogin(user).then(
			// this.props.history.push("/"),
			this.props.closeModal
		);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<h3>Sign up</h3>
						<button onClick={this.handleDemo}>Log in with DemoUser</button>
						<br /> or <br />
						<input
							type="text"
							value={this.state.email}
							onChange={this.update("email")}
							placeholder="Email address"
						/>
						<br />
						<input
							type="password"
							value={this.state.password}
							onChange={this.update("password")}
							placeholder="Password"
						/>
						<br />
						<div>{this.renderErrors()}</div>
						<input type="submit" value="Log in" />
						<br />
						<a href="#">Forgot password?</a>
						<br />
						Don't have an account? {this.props.signup}
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(LoginForm);
