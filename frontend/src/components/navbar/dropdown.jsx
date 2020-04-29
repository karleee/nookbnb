import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/navbar/dropdown.css';

class Dropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showMenu: false };
		this.toggleMenu();
	}

	// Changes search input placeholder
	toggleMenu() {
		window.addEventListener('click', e => {
			if (e.target.className === 'dropdown avatar-wrapper' || e.target.parentElement.className === 'dropdown avatar-wrapper') {
				this.setState({ showMenu: !this.state.showMenu });
			} else {
				this.setState({ showMenu: false });
			}
		});
	}

	render() {
		const { currentUser, logout } = this.props;

		// Extracting capitalized username from email
		const email = currentUser.email;
		let username = email.split('@')[0];
		username = username[0].toUpperCase() + username.slice(1, username.length);

		return (
      <div className="dropdown user-wrapper">
        <div className="dropdown avatar-wrapper">
					<p>{username}</p>
					<i className="dropdown avatar-image-wrapper"></i>
				</div> 

				{this.state.showMenu ? <div className="dropdown menu-wrapper">
					<ul>
						<li onClick={e => logout()} className="dropdown-button">
						  <button>Logout</button> 
						</li>
					</ul>
				</div> : ''}
			</div>
		);
	}
}

export default Dropdown;