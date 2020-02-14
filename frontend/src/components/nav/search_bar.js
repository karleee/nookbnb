import React from "react";
import { connect } from "react-redux";
// import { updateFilter } from "../../actions/filter_actions";
import { withRouter } from "react-router";
import "./search_bar.css"

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: ""
		};

		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
		this.handleClearSearch = this.handleClearSearch.bind(this);
	}

	// componentDidMount() {
	// 	const map = this.refs.maps;
	// 	this.map = new this.maps.Map(map, mapOptions);
	// 	this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
	// 	if (this.props.singleSpot) {
	// 		this.props.fetchSpot(this.props.spotId);
	// 	} else {
	// 		this.registerListeners();
	// 		this.MarkerManager.updateMarkers(this.props.spots);
	// 	}
	// }

	handleUpdate() {
		return e => {
			this.setState({ searchInput: e.target.value });
			// this.setState({ searchInput: "" });

		};
	}

	handleClearSearch() {
		this.setState({ searchInput: "" });
	}

	// "fetchSearchResults" is temp name. will replace when file is created
	handleSubmitSearch(e) {
		e.preventDefault();
		this.props.fetchSearchResults(this.state.searchInput).then(() => {
			this.props.history.push({
				pathname: "/search",
			})
		})
		this.setState({ searchInput: "" });
		this.props.handleClearSearch();
	}

	render() {
		let close;
		let className = "search-bar";
		if (this.state.searchInput.length > 0) {
			close = (
				<div className="close" onClick={this.handleClearSearch}>
					x
				</div>
			);
		}

		// debugger

		return (
			<div className={className} onSubmit={this.handleSubmitSearch}>
				<div className="search-bar">
					<i className="fas fa-search"></i>
				</div>
				<input
					id="searchInput"
					type="text"
					className="search-bar-input"
					value={this.state.searchInput}
					placeholder="Search"
					onChange={this.handleUpdate()}
				/>
				{close}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	// updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
});

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));
