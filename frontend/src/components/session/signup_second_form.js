import React from "react";
import { withRouter } from "react-router-dom";
import '../../assets/stylesheets/session/login_form.css';

class SignupSecondForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
		this.clearedErrors = false;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.signedIn === true) {
		// if (nextProps.currentUser === true) {
			this.props.history.push("/");
			this.props.closeModal();
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

		this.props.signup(user, this.props.history);
			// .then(this.props.history.push("/"), 
			// () => this.props.closeModal());
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
		let errors;
		if (this.props.errors) {
			errors = this.props.errors;
		} else {
			errors = {};
		}
		let emailErrors = errors.email ? <div>{errors.email}.</div> : <></>;
		let passwordErrors = errors.password ? (
			<div>{errors.password}.</div>
		) : (
			<></>
		);

		return (
			<div className="session-form-container">
				<form onSubmit={this.handleSubmit} className="session-form">
					<div onClick={this.props.closeModal} className="close-x">
						X
					</div>
					<p className="session-header">Finish signing up</p>
					<div className="signup-form">
						<br />
						<input
							type="text"
							value={this.state.fname}
							onChange={this.update("fname")}
							placeholder="First name"
							className="session-input-fname"
						/>
						<br />
						<input
							type="text"
							value={this.state.lname}
							onChange={this.update("lname")}
							placeholder="Last name"
							className="session-input-lname"
						/>
						<br />
						<p className="session-instruct">
							Make sure it matches the name on your government ID.
						</p>
						<br />
						<input
							type="text"
							value={this.state.birthdate}
							onChange={this.update("birthdate")}
							placeholder="Birthdate (mm/dd/yyyy)"
							className="session-input-birthdate"
						/>
						<br />
						<p className="session-instruct">
							To sign up, you need to be at least 18. Your birthday won't be
							shared with other people who use Nookbnb.
						</p>
						<br />
						<input
							type="text"
							value={this.state.email}
							onChange={this.update("email")}
							placeholder="Email address"
							className="session-input-email"
						/>
						<div className="session-errors">{emailErrors}</div>
						<br />
						<p className="session-instruct">We'll email you trip confirmation and receipts.</p>
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
						<input type="submit" value="Sign up" className="session-submit" />
						{/* {this.renderErrors()} */}
						<br />
						<p className="session-text">
							Already have an Nookbnb account? {this.props.login}
						</p>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(SignupSecondForm);
