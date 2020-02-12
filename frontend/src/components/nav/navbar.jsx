import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./navbar.css"
import Dropdown from "./dropdown";

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
		this.navbarSearch = this.navbarSearch.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit(this);
		this.navigateToSearch = this.navigateToSearch.bind(this);
	}

	logoutUser(e) {
		e.preventDefault();
		this.props.logout();
	}

	// ED: added signup modal
	handleSignup(e) {
		e.preventDefault();
		this.props.openModal("signupFirst");
		// this.props.openModal("signupSecond");
		this.props.history.push("/");
	}

	// ED: added login modal
	handleLogin(e) {
		e.preventDefault();
		this.props.openModal("login");
		this.props.history.push("/");
	}

	handleSearchSubmit(e) {
		// e.preventDefault();
		// 	this.props.fetchSearchResults(this.state.searchInput);
		this.navigateToSearch();
	}

	navigateToSearch() {
		this.props.history.push("/search");
	}

	update(property) {
		return e =>
			this.setState({
				[property]: e.target.value
			});
	}

	navbarSearch() {
		if (this.props.loggedIn) {
			return (
				<div>
					<i></i>
					<form onSubmit={this.props.handleSearchSubmit}>
						<div>
							<input
								type="text"
								placeholder="Search"
								value={this.state.searchInput}
								onChange={this.update("searchInput")}
							/>
						</div>
						<div>
							<input type="submit" />
						</div>
					</form>
				</div>
			);
		}
	}

	// Selectively render links dependent on whether the user is logged in
	getLinks() {
		const { logout, currentUser } = this.props;
		if (this.props.loggedIn) {
			return (
				<div>
					<div>
						<Link to={"/"}>Logo</Link>
					</div>
					<div>{this.navbarSearch()}</div>
					<div>
						<Link to={"/"}>Become a host</Link>
					</div>
					<div>
						<Link to={"/wishlists"}>Saved</Link>
					</div>
					<div>
						<Link to={"/trips"}>Trips</Link>
					</div>
					<div>
						<Link to={"/"}>Messages</Link>
					</div>
					<div>
						<Link to={"/"}>Help</Link>
					</div>
					<div>
						<Dropdown currentUser={currentUser} logout={logout} />
						{/* <Link to={"/"}>Profile</Link> */}
					</div>
				</div>
			);
		} else {
			return (
				<div>
					{/* <Link to={"/signup"}>Signup</Link> */}
					{/* <Link to={"/login"}>Login</Link> */}

					{/* <NotLoggedInNavBar /> */}
					<div>
						<Link to={"/"}>Logo</Link>
					</div>
					<div>
						<Link to={"/host/homes"}>Host a home</Link>
					</div>
					<div>
						<Link to={"/host/experiences"}>Host an experience</Link>
					</div>
					<div>
						<Link to={"/"}>Help</Link>
					</div>
					<div>
						<button onClick={this.handleSignup}>Sign up</button>
					</div>
					<div>
						<button onClick={this.handleLogin}>Log in</button>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<div>
					<h1>
						<Link to="/">AirBnB</Link>
					</h1>
				</div>
				{this.getLinks()}
			</div>
		);
	}
}

export default withRouter(NavBar);
