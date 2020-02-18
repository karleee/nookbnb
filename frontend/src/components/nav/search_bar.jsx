import React from "react";
import { connect } from "react-redux";
import { requestUpdateBounds } from "../../actions/filter_actions";
import { withRouter } from "react-router";
import "../../assets/stylesheets/search_bar.css";


class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: "",
			searchPlaceholder: false
		};

		this.toggleSearchBarPlaceholder = this.toggleSearchBarPlaceholder.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		// this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleClearSearch = this.handleClearSearch.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleSearchBarPlaceholder() {
		this.setState({searchPlaceholder: !this.state.searchPlaceholder});
	}

	handleUpdate() {
		return e => {
			this.setState({ searchInput: e.target.value });
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
	handleSubmitSearch(e) {
		e.preventDefault();
		this.props.requestUpdateBounds(this.state.searchInput).then(() => {
			this.props.history.push({
				pathname: "/search"
			});
		});
		this.setState({ searchInput: "" });
		this.props.handleClearSearch();
	}

	// handleSearchSubmit(e) {
	// 	e.preventDefault();
	// 	this.props.fetchTreehouseSearchResults(this.state.searchTerm);
	// 	this.setState({ redirectToSearchIdx: true });
	// }

	handleSearchUpdate() {
		return e => {
			this.setState({
				searchTerm: e.currentTarget.value
			});
		};
	}
	
	renderNavbarSearchField() {
		// if (this.props.navbarType === "With search") {
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
		// }
	}

	render() {
		let close;
		let className = "search-bar";
		if (this.state.searchInput.length > 0) {
			close = (
				<div className="close" onClick={this.handleClearSearch}>
					<i className="close-icon"><img src='/images/navbar/close_icon.png' /></i>
				</div>  
			);
		}

		return (
			<div className={className} onSubmit={this.handleSubmitSearch} onClick={this.toggleSearchBarPlaceholder}>
				<div className="search-bar">
					<i className="search-icon"><img src='/images/navbar/search_bar_icon.png' /></i>

					<input
						id="searchInput"
						type="text"
						className="search-bar-input"
						value={this.state.searchInput}
						placeholder={this.state.searchPlaceholder ? 'Search' : 'Anywhere • Stays'}
						onChange={this.handleUpdate()}
					/>

					{close}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	requestUpdateBounds: (filter, value) => dispatch(requestUpdateBounds(filter, value))
});

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));
