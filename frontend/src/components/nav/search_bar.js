import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "../../assets/stylesheets/search_bar.css";
import { requestUpdateBounds, geocode } from "../../actions/filter_actions";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: { address: '' },
			searchPlaceholder: false
		};

		this.toggleSearchBarPlaceholder = this.toggleSearchBarPlaceholder.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
		this.handleClearSearch = this.handleClearSearch.bind(this);
	}

	toggleSearchBarPlaceholder() {
		this.setState({searchPlaceholder: !this.state.searchPlaceholder});
	}

	handleUpdate() {
		return e => {
			this.setState({ searchInput: { address: e.target.value } });
		}
	}

	handleClearSearch() { 
		this.setState({ searchInput: { address: "" } });
	}

	handleSubmitSearch(e) {
		e.preventDefault();
		this.props.geocode(this.state.searchInput).then(() => {
			this.props.history.push({
				pathname: "/search",
			})
		})
		// this.setState({ searchInput: "" });
		// this.props.handleClearSearch();
	}

	render() {
		let close;
		let className = "search-bar";
		if (this.state.searchInput && this.state.searchInput.address.length > 0) {
			close = (
				<div className="close" onClick={this.handleClearSearch}>
					<i className="close-icon"><img src='/images/navbar/close_icon.png' /></i>
				</div>  
			);
		}

		return (
			<form className={className} 
				onSubmit={this.handleSubmitSearch} 
				onClick={this.toggleSearchBarPlaceholder}>
				<div className="search-bar">
					<i className="search-icon"><img src='/images/navbar/search_bar_icon.png' /></i>

					<input
						id="searchInput"
						type="text"
						className="search-bar-input"
						value={this.state.searchInput.address}
						placeholder={this.state.searchPlaceholder ? 'Search' : 'Anywhere • Stays'}
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
