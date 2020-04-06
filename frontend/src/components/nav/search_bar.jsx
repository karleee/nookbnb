import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "../../assets/stylesheets/search_bar.css";
import { requestUpdateBounds, geocode } from "../../actions/filter_actions";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: '',
			searchPlaceholder: 'Anywhere • Stays'
		};

		this.togglePlaceholder();
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
		this.handleClearSearch = this.handleClearSearch.bind(this);
	}

	// Changes search input placeholder
	togglePlaceholder() {
		window.addEventListener('click', e => {
			if (e.target.parentElement.className === 'search-bar') {
				this.setState({ searchPlaceholder: 'Search' });
			} else {
				this.setState({ searchPlaceholder: 'Anywhere • Stays' });
			}
		});
	}

	// Updates search input
	handleUpdate() {
		return e => {
			this.setState({ searchInput: e.target.value });
		}
	}

	// Clears searach input
	handleClearSearch() {
		this.setState({ searchInput: '' });
	}

	// Handles submitting search input
	handleSubmitSearch(e) {
		e.preventDefault();
		this.props.geocode(this.state.searchInput).then(() => {
			this.props.history.push({
				pathname: "/search",
			})
		})
	}

	// Renders SearchBar component
	render() {
		let close;
		let className = "search-bar";
		if (this.state.searchInput && this.state.searchInput.length > 0) {
			close = (
				// <div className="close" onClick={this.handleClearSearch}>
					<div className="close-icon" onClick={this.handleClearSearch}>
						<img src='/images/navbar/close_icon.png' />
					</div>
				// </div>
			);
		}

		return (
			<form autoComplete="off"
			  className={className}
				onSubmit={this.handleSubmitSearch}
				onClick={this.toggleSearchBarPlaceholder}>
				<div className="search-bar">
					<div className="search-icon">
						<img src='/images/navbar/search_bar_icon.png' />
					</div>

					<input
						id="searchInput"
						type="text"
						className="search-bar-input"
						value={this.state.searchInput}
						placeholder={this.state.searchPlaceholder}
						onChange={this.handleUpdate()}
					/>

					{close}
				</div>
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	requestUpdateBounds: bounds => dispatch(requestUpdateBounds(bounds)),
	geocode: addressObject => dispatch(geocode(addressObject))
});

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));

