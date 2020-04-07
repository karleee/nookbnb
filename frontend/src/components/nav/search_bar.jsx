import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import '../../assets/stylesheets/search_bar.css';

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
				this.setState({ searchPlaceholder: 'Search by city or state' });
			} else {
				this.setState({ searchPlaceholder: 'Anywhere • Stays' });
			}
		});
	}

	// Updates search input
	handleUpdate() {
		return e => { this.setState({ searchInput: e.target.value }) };
	}

	// Clears search input
	handleClearSearch() {
		this.setState({ searchInput: '' });
	}

	// Handles submitting search input
	handleSubmitSearch(e) {
		e.preventDefault();
		const loc = this.state.searchInput; 
		this.props.history.push(`/search/${loc}`); 
	}

	// Renders SearchBar component
	render() {
		let close;
		let className = "search-bar";
		if (this.state.searchInput && this.state.searchInput.length > 0) {
			close = (
				<div className="close-icon" onClick={this.handleClearSearch}>
					<img src='/images/navbar/close_icon.png' />
				</div>
			);
		}

		return (
			<form 
			  autoComplete="off"
			  className={className}
				onSubmit={this.handleSubmitSearch}
				onClick={this.toggleSearchBarPlaceholder}
			>
				<div className="search-bar">
					<div className="search-icon">
						<img src='/images/navbar/search_bar_icon.png' />
					</div>

					<input
						type="text"
						value={this.state.searchInput}
						placeholder={this.state.searchPlaceholder}
						onChange={this.handleUpdate()}
						maxLength="75"
					/>

					{close}
				</div>
			</form>
		);
	}
}

export default withRouter(SearchBar);

