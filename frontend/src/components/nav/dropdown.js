import React from "react";
import { Link } from "react-router-dom";
import "./dropdown.css";

class Dropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false
		};
		this.showMenu = this.showMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.dropdownElement = null;

		this.setDropwdownElementRef = element => {
			this.dropdownElement = element;
		};
	}

	componentWillUnmount() {}

	showMenu(event) {
		event.preventDefault();

		this.setState({ showMenu: true }, () => {
			document.addEventListener("click", event => this.closeMenu(event));
		});
	}

	closeMenu(event) {
		if (this.dropdownElement && !this.dropdownElement.contains(event.target)) {
			this.setState({ showMenu: false }, () => {
				document.removeEventListener("click", event => this.closeMenu(event));
			});
		}
	}

	render() {
		const { currentUser, logout } = this.props;
		const menu = this.state.showMenu ? (
			<div className="">
				<div className="user-dropdown-list">
				<button className="dropdown-button">
					<Link to={`/users/${currentUser.id}`} className="dropdown-button">
						{" "}
							Profile
					</Link>
				</button>
				<button className="dropdown-button">
					<Link to="/" className="">
						Account
					</Link>
				</button>
				<button onClick={e => logout()} className="dropdown-button">
					Logout
				</button>
				</div>
			</div>
		) : null;
		return (
			<div>
				<button type="button" onClick={this.showMenu} className="user-dropdown-list">
					<div
						className="user-dropdown-list"
						ref={el => {
							this.dropdownElement = el;
						}}
					>
						<span className=""> 
						<img src="/images/navbar/nooks_cranny_logo.png" id="profile-pict"/>
						</span>
					</div>
				</button>

				{menu}
			</div>
		);
	}
}

export default Dropdown;