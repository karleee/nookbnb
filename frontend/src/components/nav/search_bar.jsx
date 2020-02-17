import React from "react";
import { connect } from "react-redux";
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
		this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
		this.handleClearSearch = this.handleClearSearch.bind(this);
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

	// "fetchSearchResults" is temp name. will replace when file is created
	handleSubmitSearch(e) {
		e.preventDefault();
		this.props.fetchSearchResults(this.state.searchInput).then(() => {
			this.props.history.push({
				pathname: "/search",
			})
		})
		this.setState({ searchInput: "" });
		this.props.handleClearSearch();
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
});

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));
