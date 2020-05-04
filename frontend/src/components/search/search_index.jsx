import React from 'react';

// import SpotIndexItem from '../spots/spot_index_item';
import SearchIndexItem from './search_index_item';

class SearchIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = { spots: [] };
	}

	// Runs once component has mounted
	// Ensures search results appear on a manual page refresh by the user
  componentDidMount() {
		const spots = this.props.fetchSpots();
		this.setState({ spots });
	}

	render() {
		const { spots, find_loc } = this.props;
		let numResults = spots.length;
		
		return (
			<div className="search-index found-spots-wrapper">
				<div className="search-index header-wrapper">
					<p>{numResults} {numResults > 1 || numResults === 0 ? 'stays' : 'stay'}</p>
					<h2>Stays in {find_loc}</h2>
				</div>

				<ul> 
					{spots.map(spot => (<SearchIndexItem key={spot._id} spot={spot} />))}
				</ul>
			</div>
		);
	}
}

export default SearchIndex;
