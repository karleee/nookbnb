import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/stylesheets/session/login_form.css';

class LoginForm extends Component {
	// Constructor for LoginForm
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.renderErrors = this.renderErrors.bind(this);
		this.handleDemo = this.handleDemo.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// After authentication redirect user to home page
	componentWillReceiveProps(nextProps) {
		if (nextProps.currentUser) {
			this.props.history.push('/');
			this.props.closeModal();
		}
	}

	// Hides scrolling when modal is mounted
	componentDidMount() {
		if (this.props.modal) document.body.style.overflow = 'hidden';
	}

	// Reactiviates scrolling when modal is unmounted
	componentWillUnmount() {
		document.body.style.overflow = 'unset';
	}

	// Render the session errors if there are any
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

	// Handle form submission
	handleSubmit(e) {
		e.preventDefault();
		let user = {
			email: this.state.email,
			password: this.state.password
		};

		if (this.props.errors) {
			this.props.login(user).then(this.openLoginModal);
		} else {
		  this.props.login(user).then(() => this.props.closeModal());
		}
	}

	// Handle demo user login
	handleDemo(e) {
		e.preventDefault();
		const user = { email: 'isabelle@gmail.com', password: 'password' };
		this.props.login(user)
			.then(this.props.history.push('/'), this.props.closeModal());
	}

	// Rendering component
	render() {		
		const { errors } = this.props;

		return (
			<div className="login-modal-wrapper">
				<div className="modal-wrapper" onClick={this.props.closeModal}></div>

				<form onSubmit={this.handleSubmit} className={errors.email ? 'form-errors' : 'form-normal'}>
					<div className="header-wrapper">
					  <div className="close-wrapper" onClick={this.props.closeModal}>
					  	<i className="close-button"></i>
					  </div>

					  <h1>Log in</h1>
					</div>

					<div className="main-content-wrapper">
					  <button onClick={this.handleDemo}>
					  	Demo Log In
					  </button>

					  <div className="button-separator-wrapper"><p>or</p></div>

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
				  	
					  <button type="submit">Log in</button>

						<div className="no-account-wrapper">
							<p>Don't have an account? <span onClick={() => this.props.openModal('signup')}>Sign up</span></p>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(LoginForm);
