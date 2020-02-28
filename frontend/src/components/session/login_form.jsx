import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/stylesheets/session/login_form.css';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
		this.handleDemo = this.handleDemo.bind(this);
		this.closeLoginModal = this.closeLoginModal.bind(this);
	}

	// After authentication redirect user to home page
	componentWillReceiveProps(nextProps) {
		if (nextProps.currentUser === true) {
			this.props.history.push('/');
			this.setState({ errors: {} });
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
				{Object.keys(this.state.errors).map((error, i) => (
					<li key={`error-${i}`}>{this.state.errors[error]}</li>
				))}
			</ul>
		);
	}

	// Handle field updates
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

		if (this.props.errors) {
			this.props.login(user)
				.then(this.openLoginModal);
		} else {
		  this.props.login(user)
				.then(() => this.props.closeModal());
		}
	}

	// Handle demo user login
	handleDemo(e) {
		e.preventDefault();
		const user = { email: 'demouser@nookbnb.com', password: 'password' };
		this.props.login(user)
			.then(this.props.history.push('/'), this.props.closeModal());
	}

	// Closes a login modal
	closeLoginModal() {
		this.setState({ errors: {} });
		this.props.closeModal();
	}

	// Rendering component
	render() {
		let errors;

		if (this.props.errors) {
			errors = this.props.errors;
		} else {
			errors = {};
		}

		let emailErrors = errors.email ? <div className="email-error">{errors.email}</div> : '';
		let passwordErrors = errors.password ? <div className="password-error">{errors.password}</div> : '';

		return (
			<div className="login-modal-wrapper">
				<div className="modal-wrapper" onClick={this.closeLoginModal}></div>

				<form onSubmit={this.handleSubmit} className={errors.email && errors.email.length !== 0 ? 'form-errors' : 'form-normal'}>
					<div className="header-wrapper">
					  <div className="close-wrapper" onClick={this.closeLoginModal}>
					  	<i className="close-button"></i>
					  </div>

					  <h1>Log in</h1>
					</div>

					<div className="main-content-wrapper">
					  <button onClick={this.handleDemo}>
					  	Demo Log in
					  </button>

					  <div className="button-separator-wrapper"><p>or</p></div>

					  <input
							type="text"
							className={errors.email && errors.email.length !== 0 ? 'bad-input' : ''}
					  	value={this.state.email}
					  	onChange={this.update('email')}
					  	placeholder="Email"
					  />
				  	
					  <input
							type="password"
							className={errors.email && errors.email.length !== 0 ? 'bad-input' : ''}
					  	value={this.state.password}
					  	onChange={this.update("password")}
					  	placeholder="Password"
					  />

						<div className="session-errors">
							{emailErrors}
							{passwordErrors}
						</div>
				  	
					  <button type="submit">Log in</button>

						<div className="no-account-wrapper">
							<p>Don't have an account? <span onClick={() => this.props.openModal('signupFirst')}>Sign up</span></p>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(LoginForm);
