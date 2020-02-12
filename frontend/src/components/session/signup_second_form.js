import React from "react";
import { withRouter } from "react-router-dom";

class SignupSecondForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearedErrors = false;
	}

	componentWillReceiveProps(nextProps) {
		// if (nextProps.signedIn === true) {
		if (nextProps.currentUser === true) {
			this.props.history.push("/");
		}

		this.setState({ errors: nextProps.errors });
	}

	update(field) {
		return e =>
			this.setState({
				[field]: e.currentTarget.value
			});
	}

	handleSubmit(e) {
		e.preventDefault();
		let user = {
			email: this.state.email,
			password: this.state.password,
		};

		this.props.signup(user, this.props.history)
			.then(this.props.history.push("./"), 
			this.props.closeModal());
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
			<div className="signup-form-container">
				<form onSubmit={this.handleSubmit}>
					<h3>Finish signing up</h3>
					<div className="signup-form">
						<br />
						<input
							type="text"
							value={this.state.fname}
							onChange={this.update("fname")}
							placeholder="First name"
						/>
						<br />
						<input
							type="text"
							value={this.state.lname}
							onChange={this.update("lname")}
							placeholder="Last name"
						/>
						<br />
						Make sure it matches the name on your government ID.
						<br />
						<input
							type="text"
							value={this.state.email}
							onChange={this.update("birthdate")}
							placeholder="Birthdate (mm/dd/yyyy)"
						/>
						<br/>
						To sign up, you need to be at least 18. Your birthday won't be shared with other people who use Airbnb.
						<br />
						<input
							type="text"
							value={this.state.email}
							onChange={this.update("email")}
							placeholder="Email address"
						/>
						<br/>
						We'll email you trip confirmation and receipts.
						<br />
						<input
							type="password"
							value={this.state.password}
							onChange={this.update("password")}
							placeholder="Password"
						/>
						<br />
						<input type="submit" value="Sign up" />
						{this.renderErrors()}
						Already have an Airbnb account? {this.props.login}
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(SignupSecondForm);
