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
				<div className="">
					<div className="">
						<span className="" />
					</div>
					<div className="">
						<Link to={`/users/${currentUser.id}`} className="">
							{" "}
							<p className="">
								 Profile
								<span className="" />
							</p>
						</Link>
					</div>
				</div>
				<div className="item-separator" />
				<Link to="/" className="">Account</Link>
				<div className="item-separator" />
				<button onClick={e => logout()} className="">
					Logout
				</button>
			</div>
		) : null;
		return (
			<div>
				<button type="button" onClick={this.showMenu} className="">
					<div
						className=""
						ref={el => {
							this.dropdownElement = el;
						}}
					>
						<span className=""></span>
						<p>Profile</p>
					</div>
				</button>

				{menu}
			</div>
		);
	}
}

export default Dropdown;