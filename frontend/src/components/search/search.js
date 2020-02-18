import React from 'react';
import Map from './map';
import FiltersBar from '../filter/filters_bar';
import SearchResultsIndex from './search_results_index';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		// this.requestUpdateBounds = this.requestUpdateBounds.bind(this);
	}

	componentWillReceiveProps(nextProps) {
			// this.props.fetchFilteredSpots();
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
			<div>
				<FiltersBar />
				<br />
				<br />

				<div className="spot-index-top-wrapper">
					<h2>Search Results</h2>
					<h3>Explore some of the best-reviewed stays in the world</h3>

					<div>
						<SearchResultsIndex spots={spots} />
					</div>
				</div>

				<div className="map-container">
					<Map
						requestUpdateBounds={requestUpdateBounds}
						geocode={geocode}
            center={center}
            spots={spots}
            updateMapCenter={updateMapCenter}>
					></Map>
				</div>
			</div>
		);
	}
}

export default Search;