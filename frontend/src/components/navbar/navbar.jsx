import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Dropdown from './dropdown';
import SearchBar from './search_bar';

import '../../assets/stylesheets/navbar/navbar.css';

class NavBar extends React.Component { 
	constructor(props) {
		super(props);
		this.state = {searchInput: ''};
		this.logoutUser = this.logoutUser.bind(this);
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
	render() {
		const {logout, loggedIn, currentUser} = this.props; 

		return (
			<div className="app navbar-container">
				<div className="navbar logo-wrapper">
					<Link to="/">
						<img src="/images/navbar/nooks_cranny_logo.png" />
					</Link>
				</div>

				<SearchBar />

				{loggedIn ? 
				<div className="navbar profile-wrapper">
					<Dropdown
						currentUser={currentUser} 
						logout={logout}
					/>
				</div> : 
				<div className="navbar links-wrapper">
		 		  <button onClick={this.handleSignup}>Sign up</button> 
		 		  <button onClick={this.handleLogin}>Log in</button>
		 		</div>}
			</div>
		);
	}
}

export default withRouter(NavBar);
