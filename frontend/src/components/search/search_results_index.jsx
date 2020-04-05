import React from 'react';

import SpotIndexItem from '../spots/spot_index_item';
import Footer from '../footer/footer';

class SearchResultsIndex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		let { spots } = this.props;

		const spotItems = this.props.spots.map(spot => (
			<SpotIndexItem key={spot._id} spot={spot} />
		));

		let numResults = spots.length;

		return (
			<div className="search-index-container">
				<div className="search-index-header-wrapper">
					<h2>Search Results</h2>
					<h3>{numResults} places to stay</h3>
				</div>

				<div className="search-index-spots-wrapper">
					<ul>{spotItems}</ul>
				</div>
			</div>
		);
	}
}

export default SearchResultsIndex;
