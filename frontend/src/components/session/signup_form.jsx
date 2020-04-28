import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/stylesheets/session/session.css';

class SignupForm extends Component {
	// Constructor for SignupForm
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.handleDemo = this.handleDemo.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// Lifecycle method for once component receives props
	componentWillReceiveProps(nextProps) {
		if (nextProps.signedIn) this.props.history.push('/');
		this.setState({ errors: nextProps.errors });
	}

	// Hides scrolling when modal is mounted
	componentDidMount() {
		if (this.props.modal) document.body.style.overflow = 'hidden';
	}

	// Reactiviates scrolling when modal is unmounted
	componentWillUnmount() {
		document.body.style.overflow = 'unset';
	}

	// Handles demo signup
	handleDemo(e) {
		e.preventDefault();
		const user = { email: "isabelle@gmail.com", password: "password" };
		this.props.demoLogin(user).then(this.props.closeModal);
	}

	// Handles form submission
	handleSubmit(e) {
		e.preventDefault();
		let user = {
			email: this.state.email,
			password: this.state.password,
		};

		if (this.props.errors) {
			this.props.signup(user).then(this.openLoginModal);
		} else {
			this.props.login(user).then(() => this.props.closeModal());
		}

		this.props.signup(user, this.props.history);
	}

	// Rendering errors
	renderErrors() {
		return (
			<ul>
				{Object.values(this.props.errors).map((error, i) => (
					<li key={`error-${i}`}>{error}</li>
				))}
			</ul>
		);
	}

	// Handle field updates
	update(field) {
		return e => this.setState({ [field]: e.currentTarget.value });
	}

	// Renders SignupForm component
	render() {
		const { errors } = this.props;
		console.log(this.state);

		return (
			<div className="session modal-container">
				<div className="session background-wrapper" onClick={this.props.closeModal}></div>

				<form onSubmit={this.handleSubmit} className={errors.email ? 'session errors-wrapper' : 'session form-wrapper'}>
					<div className="session header-wrapper"> 
						<div className="session close-wrapper" onClick={this.props.closeModal}>
							<i className="session close-button"></i>
						</div>

						<h1>Sign up</h1>
					</div>

					<div className="session input-wrapper">
						<button onClick={this.handleDemo}>
							Demo Sign Up
					  </button>

						<div className="session separator-wrapper"><p>or</p></div>

						<input
							type="text"
							className={errors.email ? 'bad-input' : ''}
							value={this.state.email}
							onChange={this.update('email')}
							placeholder="Email"
						/>

						<input
							type="password"
							className={errors.email ? 'bad-input' : ''}
							value={this.state.password}
							onChange={this.update("password")}
							placeholder="Password"
						/>

						<div className="session-errors-wrapper">
							{this.renderErrors()}
						</div>

						<button type="submit">Sign up</button>

						<div className="session no-account-wrapper">
							<p>Already have an account? <span onClick={() => this.props.openModal('login')}>Log in</span></p>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(SignupForm);