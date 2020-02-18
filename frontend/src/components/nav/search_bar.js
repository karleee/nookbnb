import React from "react";
import { connect } from "react-redux";
import { requestUpdateBounds } from "../../actions/filter_actions";
import { withRouter } from "react-router";
import "./search_bar.css"


class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: ""
		};

		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleClearSearch = this.handleClearSearch.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	// componentDidMount() {
	// 	const input = document.getElementById("searchInput");
	// 	const options = { types: ["(regions)"] };
	// 	const autocomplete = new google.maps.places.Autocomplete(input, options);

	// 	let address;
	// 	autocomplete.addListener("place_changed", e => {
	// 		if (!autocomplete.getPlace().formatted_address) {
	// 			address = autocomplete.getPlace().name;
	// 			this.setState({ search: address });
	// 			this.handleSubmit(address);
	// 		} else {
	// 			address = autocomplete.getPlace().formatted_address;
	// 			this.setState({ search: address });
	// 			this.handleSubmit(address);
	// 		}
	// 	});
	// }

	handleUpdate() {
		return e => {
			this.setState({ searchInput: e.target.value });
			// this.setState({ searchInput: "" });
		};
	}

	handleClearSearch() {
		this.setState({ searchInput: "" });
	}

	// handleSubmit(address) {
	// 	const geocoder = new google.maps.Geocoder();
	// 	geocoder.geocode({ address: address }, (results, status) => {
	// 		if (status == google.maps.GeocoderStatus.OK) {
	// 			const lat = results[0].geometry.location.lat();
	// 			const lng = results[0].geometry.location.lng();
	// 			this.props.history.push(`/homes?lat=${lat}&lng=${lng}`);
	// 		}
	// 	});

	// 	this.setState({ search: "" });
	// }

	// "fetchSearchResults" is temp name. will replace when file is created
	// handleSubmitSearch(e) {
	// 	e.preventDefault();
	// 	this.props.requestUpdateBounds(this.state.searchInput).then(() => {
	// 		this.props.history.push({
	// 			pathname: "/search"
	// 		});
	// 	});
	// 	this.setState({ searchInput: "" });
	// 	this.props.handleClearSearch();
	// }
	handleSearchSubmit(e) {
		e.preventDefault();
		this.props.fetchTreehouseSearchResults(this.state.searchTerm);
		this.setState({ redirectToSearchIdx: true });
	}

	handleSearchUpdate() {
		return e => {
			this.setState({
				searchTerm: e.currentTarget.value
			});
		};
	}
	
	renderNavbarSearchField() {
		if (this.props.navbarType === "With search") {
			return (
				<div className={this.state.searchFormClasses.join(" ")}>
					<i className="fas fa-search"></i>
					<form
						className="navbar-search-form"
						onSubmit={this.handleSearchSubmit}
					>
						<div className="navbar-search-input-container">
							<input
								className="navbar-search-input"
								type="text"
								placeholder="Search"
								value={this.state.searchTerm}
								onChange={this.handleSearchUpdate()}
								onFocus={this.toggleSearchBarLength}
								onBlur={this.toggleSearchBarLength}
							/>
						</div>
					</form>
				</div>
			);
		}
	}

	render() {
		let close;
		let className = "search-bar";
		if (this.state.searchInput.length > 0) {
			close = (
				<div className="close" onClick={this.handleSubmit}>
					x
				</div>
			);
		}

		// debugger

		return (
			<div className={className} onSubmit={this.handleSubmit}>
				<div className="search-bar">
					<i className="fas fa-search"></i>
				</div>
				<input
					id="searchInput"
					type="text"
					className="search-bar-input"
					value={this.state.searchInput}
					placeholder="Search"
					onChange={this.handleUpdate}
				/>
				{close}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	requestUpdateBounds: (filter, value) => dispatch(requestUpdateBounds(filter, value))
});

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));
