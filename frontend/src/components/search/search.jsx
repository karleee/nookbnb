import React from 'react';

import FiltersBar from '../filter/filters_bar';
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
		// Library of state abbreviations
		const states = {
			"AL": "alabama",
			"AK": "alaska",
			"AS": "american samoa",
			"AZ": "arizona",
			"AR": "arkansas",
			"CA": "california",
			"CO": "colorado",
			"CT": "connecticut",
			"DE": "delaware",
			"DC": "district of columbia",
			"FL": "florida",
			"GA": "georgia",
			"GU": "guam",
			"HI": "hawaii",
			"ID": "idaho",
			"IL": "illinois",
			"IN": "indiana",
			"IA": "iowa",
			"KS": "kansas",
			"KY": "kentucky",
			"LA": "louisiana",
			"ME": "maine",
			"MD": "maryland",
			"MA": "massachusetts",
			"MI": "michigan",
			"MN": "minnesota",
			"MS": "mississippi",
			"MO": "missouri",
			"MT": "montana",
			"NE": "nebraska",
			"NV": "nevada",
			"NH": "new hampshire",
			"NJ": "new jersey",
			"NM": "new mexico",
			"NY": "new york",
			"NC": "north carolina",
			"ND": "north dakota",
			"OH": "ohio",
			"OK": "oklahoma",
			"OR": "oregon",
			"PA": "pennsylvania",
			"PR": "puerto rico",
			"RI": "rhode island",
			"SC": "south carolina",
			"SD": "south dakota",
			"TN": "tennessee",
			"TX": "texas",
			"UT": "utah",
			"VT": "vermont",
			"VI": "virgin Islands",
			"VA": "virginia",
			"WA": "washington",
			"WV": "west Virginia",
			"WI": "wisconsin",
			"WY": "wyoming"
		}

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
			const stateAbbr = spot.state.toLowerCase();
			const stateFull = states[spot.state];

			if (city === lowercasedLocation || stateAbbr === lowercasedLocation || stateFull === lowercasedLocation) {
				foundSpots.push(spot);
			}
		});

		return foundSpots;
	}

	// Renders Search component
	render() {
		const { spots } = this.props;
    const foundSpots = this.getSpots(spots);

		const map = foundSpots.length > 0 ? <Map find_loc={this.state.find_loc} spots={foundSpots} /> : null;

		return (
			<div className="search-container">
				<div><FiltersBar /></div>
				<div className="search-results-wrapper">
				  <SearchResultsIndex spots={foundSpots} />
					<Map find_loc={this.state.find_loc} spots={foundSpots} /> 
					{map}
				</div>

				{/* <Footer /> */}
			</div>
		);
	}
}

export default Search;