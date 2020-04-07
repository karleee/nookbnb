import React from 'react';

// import Map from '../map/map';
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

	// Renders Search component
	render() {
		const { spots } = this.props;

		return (
			<div className="search-container">
				<div className="search-results-wrapper">
				  <SearchResultsIndex spots={spots} />
					<Map find_loc={this.state.find_loc} /> 
				</div>

				<Footer />
			</div>
		);
	}
}

export default Search;