import React from 'react';

import Map from '../map/map';
import FiltersBar from '../filter/filters_bar';
import SearchResultsIndex from './search_results_index';
import Footer from '../footer/footer';

import '../../assets/stylesheets/search/search.css';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	requestUpdateBounds(bounds) {
		this.props.updateFilter(bounds);
	}

	render() {
		const {
			spots,
			requestUpdateBounds,
			geocode,
			center,
      updateMapCenter
		} = this.props;

		return (
			<div className="search-container">
				{/* <FiltersBar /> */}

				<div className="search-results-wrapper">
				  <SearchResultsIndex spots={spots} />

				  <Map
				  	requestUpdateBounds={requestUpdateBounds}
				  	geocode={geocode}
				  	center={center}
				  	spots={spots}
				  	updateMapCenter={updateMapCenter}
				  />
				</div>

				<Footer />
			</div>
		);
	}
}

export default Search;