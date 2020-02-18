import React from "react";
import SpotIndexItem from "../spots/spot_index_item";

class SearchResultsIndex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		// if (!this.props.spots) {
		// 	return <div />;
		// }

		let { spots } = this.props;

		const spotItems = this.props.spots.map(spot => (
			<SpotIndexItem key={spot._id} spot={spot} />
		));

		let numResults = spots.length;

		return (
			<div className="search-index">
				<div className="search-index-top-wrapper">
					<h2>Search Results</h2>
					<h3>{numResults} places to stay</h3>
				</div>
				<div className="search-index-div"><ul>{spotItems}</ul></div>
			</div>
		);
	}
}

export default SearchResultsIndex;
