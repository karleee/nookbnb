import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Dropdown from './dropdown';
import SearchBar from './search_bar';

import '../../assets/stylesheets/navbar/navbar.css'

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: ""
		};

		this.logoutUser = this.logoutUser.bind(this);
		this.getLinks = this.getLinks.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.navigateToSearch = this.navigateToSearch.bind(this);
	}

	logoutUser(e) {
		e.preventDefault();
		this.props.logout();
	}

	handleSignup(e) {
		e.preventDefault();
		this.props.openModal('signup');
	}

	handleLogin(e) {
		e.preventDefault();
		this.props.openModal('login');
	}

	// ** BUG FOUND ** 
	// This is causing the search page to always render upon app load up
	handleSearchSubmit(e) {
		this.navigateToSearch();
	}

	// For testing, changed the route from '/search' to '/'
	navigateToSearch() {
		this.props.history.push("/");
	}

	update(property) {
		return e =>
			this.setState({
				[property]: e.target.value
			});
	}

	// Selectively render links dependent on whether the user is logged in
	getLinks() {
		const { logout, currentUser } = this.props;
		if (this.props.loggedIn) {
			return (
				<div className="navbar">
					<div className="logo">
						<Link to="/">
							<img src="/images/navbar/nooks_cranny_logo.png" />
						</Link>
					</div>

					<div className="search-bar">
						<SearchBar />
					</div>

					<div className="profile-wrapper">
						<Dropdown
							currentUser={currentUser}
							logout={logout}
						/>
					</div>
				</div>
			);
		} else {
			return (
				<div className="navbar">
					<div className="logo">
						<Link to="/">
						  <img src='/images/navbar/nooks_cranny_logo.png' />
						</Link>
					</div>

					<div className="search-bar">
					  <SearchBar />
					</div>

					<div className="signup-login-wrapper">
						<div className="signup-button">
							<button onClick={this.handleSignup}>
								<p>Sign up</p>
							</button>
						</div>

						<div className="login-button">
							<button onClick={this.handleLogin}>
								<p>Log in</p>
							</button>
						</div>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				{this.getLinks()}
			</div>
		);
	}
}

export default withRouter(NavBar);
