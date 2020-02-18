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
			<div className="">
				<h2>{numResults} places to stay</h2>
				<ul>{spotItems}</ul>
			</div>
		);
	}
}

export default SearchResultsIndex;
