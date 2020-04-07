import React from 'react';

import Map from '../map/map';
import SearchResultsIndex from './search_results_index';
import Footer from '../footer/footer';

import '../../assets/stylesheets/search/search.css';

class Search extends React.Component {
	constructor(props) {
		super(props);
	}

	// Fetches all spots once component has mounted
	componentDidMount() {
		const spots = this.props.fetchSpots();
	}

	// Renders Search component
	render() {
		const { spots } = this.props;

		return (
			<div className="search-container">
				<div className="search-results-wrapper">
				  <SearchResultsIndex spots={spots} />
					<Map /> 
				</div>

				<Footer />
			</div>
		);
	}
}

export default Search;