import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/navbar/dropdown.css';

class Dropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showMenu: false };
		this.toggleMenu();
		this.showMenu = this.showMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.dropdownElement = null;
		this.setDropwdownElementRef = element => { this.dropdownElement = element };
	}

	// Changes search input placeholder
	toggleMenu() {
		window.addEventListener('click', e => {
			if (e.target.parentElement.className === 'avatar-wrapper') {
				this.setState({ showMenu: !this.state.showMenu });
			} else {
				this.setState({ showMenu: false });
			}
		});
	}

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

		// Extracting capitalized username from email
		const email = currentUser.email;
		let username = email.split('@')[0];
		username = username[0].toUpperCase() + username.slice(1, username.length);

		return (
      <div className="profile-menu-container">
        <div className="avatar-wrapper">
					<p>{username}</p>
					<div className="avatar-image"></div>
				</div>

				{this.state.showMenu ? <div className="dropdown-menu-wrapper">
					<ul>
					  <li>
						  <button onClick={e => logout()} className="dropdown-button">Logout</button>
						</li>
					</ul>
				</div> : ''}
			</div>
		);
	}
}

export default Dropdown;