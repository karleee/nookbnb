import React from 'react';
import Map from './map';
import FiltersBar from '../filter/filters_bar';
import SearchResultsIndex from './search_results_index';
import "./search.css"

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		// this.requestUpdateBounds = this.requestUpdateBounds.bind(this);
	}

	componentWillReceiveProps(nextProps) {
			this.props.fetchFilteredSpots();
	}

	requestUpdateBounds(bounds) {
		this.props
			.updateFilter(bounds);
	}

	render() {
		const {
			spots,
			filters,
			requestUpdateBounds,
			geocode,
			center,
      updateFilter,
      updateMapCenter
		} = this.props;

		return (
			<div className="search">
				<FiltersBar />
				<SearchResultsIndex spots={spots} />
				<Map
						requestUpdateBounds={requestUpdateBounds}
						geocode={geocode}
						center={center}
						spots={spots}
						updateMapCenter={updateMapCenter}
						id="map-container"
					/>
			</div>
		);
	}
}

export default Search;