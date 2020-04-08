import React from "react";
import { connect } from "react-redux";
import { updateFilter } from "../../actions/filter_actions";
import GuestsFilter from "./guests_filter";
import DatesFilter from "./dates_filter";
import AmenitiesFilters from "./amenities_filter";
import { startLoading, stopLoading } from "../../actions/loading_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import "./filters.css";

class FiltersBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: null,
			dates: "Dates",
			amenities: "Amenities",
			guests: "Guests",
			occupancy: "",
			bedrooms: "",
			beds: "",
			baths: "",
			startDate: "",
			endDate: "",
			wifi: "",
			breakfast: "",
			parking: "",
			essentials: "",
		};
		this.handleClick = this.handleClick.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.updateGuests = this.updateGuests.bind(this);
		this.updateAmenities = this.updateAmenities.bind(this);
		this.updateDates = this.updateDates.bind(this);
	}

	componentWillReceiveProps(props) {
		let amenities = "Amenities";
		let dates = "Dates";
		let {occupancy, beds, guests, bedrooms, baths, startDate, endDate, wifi, breakfast, parking, essentials} = this.props;
		this.setState({ occupancy, beds, guests, bedrooms, baths, startDate, endDate, wifi });
	}

	updateGuests() {
		this.props.startLoading();
		this.props
			.updateFilter("guests", this.state.guests)
			.then(() => this.props.stopLoading());
	}

	updateAmenities() {
		// this.props.startLoading();
		this.props
			.updateFilter("wifi", this.state.wifi)
			// .then(() => this.props.stopLoading());
	}

	updateDates() {
		// this.props.startLoading();
		this.props
			.updateFilter("startDate", this.state.startDate)
			// .then(() => this.props.stopLoading());
	}

	handleClick(modal) {
		return e => {
			e.stopPropagation();
			this.setState({ modal });
			this.props.openModal( modal );
		};
	}

	hideModal() {
		this.setState({ modal: null });
	}

	render() {
		let currentUser;
		let component;

		if (this.state.modal === "Guests") {
			component = (
				<GuestsFilter
					updateFilter={this.updateFilter}
					hideModal={this.hideModal}
					// occupancy={this.props.occupancy}
					// beds={this.props.beds}
					// beds={this.props.beds}
					// bedrooms={this.props.bedrooms}
					// bedrooms={this.props.bedrooms}
					// baths={this.props.baths}					
					// baths={this.props.baths}					
				/>
			);
		} else if (this.state.modal === "Amenities") {
			component = (
				<AmenitiesFilters
					updateFilter={this.updateFilter}
					hideModal={this.hideModal}
					wifi={this.props.wifi}
					breakfast={this.props.breakfast}
					parking={this.props.parking}
					essentials={this.props.essentials}
				/>
			);
		} else if (this.state.modal === "Dates") {
			component = (
				<DatesFilter
					updateFilter={this.updateFilter}
					hideModal={this.hideModal}
					startDate={this.props.startDate}
					endDate={this.props.endDate}
				/>
			);
		}
		// debugger;

		return (
			<div onClick={this.hideModal}>
				<div className="filter-bar">
					<div
						onClick={this.handleClick("Dates")}
						className={
							this.state.formType === "Dates" ||
							this.props.startDate !== "" ||
							this.props.endDate !== ""
							? "filter-button selected" 
							: "filter-button"
						}
					>
						{this.state.dates}
					</div>
					<div
						onClick={this.handleClick("Guests")}
						className={
							this.state.modal === "Guests" ||
							this.props.guests !== ""
								? "filter-button selected"
								: "filter-button"
						}
					>
						{this.state.guests}
					</div>
					<div
						onClick={this.handleClick("Amenities")}
						className={
							this.state.modal === "Amenities" ||
								this.props.bedrooms !== "" ||
								this.props.beds !== "" ||
								this.props.bathrooms !== ""
									? "filter-button selected"
									: "filter-button"
						}
					>
						{this.state.amenities}
					</div>
				</div>
				{component && (
					<div className="everything-but-filter" onClick={this.hideModal}>
						<div onClick={e => e.stopPropagation()}>{component}</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	filters: state.ui.filters,
	currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
	updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
	openModal: formType => dispatch(openModal(formType)),
	hideModal: () => dispatch(closeModal()),
stopLoading: () => dispatch(stopLoading("search"))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBar);
