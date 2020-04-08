import React from 'react';

// import SpotIndexItem from '../spots/spot_index_item';
import SearchIndexItem from './search_index_item';

class SearchResultsIndex extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { spots } = this.props;
		let numResults = spots.length;

		return (
			<div className="search-index-container">
				<div className="search-index header-wrapper">
					<p>{numResults} {numResults > 1 || numResults === 0 ? 'stays' : 'stay'}</p>
					<h2>Stays in {spots[0].city}</h2>
				</div>

				<div className="search-index spots-wrapper">
					<ul>
						{this.props.spots.map(spot => (<SearchIndexItem key={spot._id} spot={spot} />))}
					</ul>
				</div>
			</div>
		);
	}
}

export default SearchResultsIndex;
