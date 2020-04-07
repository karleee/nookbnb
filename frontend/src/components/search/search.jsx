import React from 'react';

import Map from '../map/map';
import SearchResultsIndex from './search_results_index';
import Footer from '../footer/footer';

import '../../assets/stylesheets/search/search.css';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = { find_loc: this.props.find_loc };
	}

	// Triggers a re-render when component receives new props
	componentWillReceiveProps(newProps) {
    this.setState({ find_loc: newProps.match.params.find_loc });
	}

	// Gets spots matching search input
	getSpots(spots) {
		// Getting lowercased location string from search input
		const location = this.state.find_loc;
		let locationArr;
		let lowercasedLocation = [];
		let foundSpots = [];

		if (location) {
			locationArr = location.split(' ');
			locationArr.forEach(word => lowercasedLocation.push(word.toLowerCase()));
			lowercasedLocation = lowercasedLocation.join(' ');
		}

		// Searching for spots matching location
		spots.forEach(spot => {
			const city = spot.city.toLowerCase();
			const state = spot.state.toLowerCase();
			if (city === lowercasedLocation || state === lowercasedLocation) foundSpots.push(spot);
		});

		return foundSpots;
	}

	// Renders Search component
	render() {
		const { spots } = this.props;
    const foundSpots = this.getSpots(spots);

		return (
			<div className="search-container">
				<div className="search-results-wrapper">
				  <SearchResultsIndex spots={foundSpots} />
					<Map find_loc={this.state.find_loc} spots={foundSpots} /> 
				</div>

				<Footer />
			</div>
		);
	}
}

export default Search;