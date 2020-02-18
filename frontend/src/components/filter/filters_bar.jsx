import React from "react";
import { connect } from "react-redux";
import { updateFilter } from "../../actions/filter_actions";
import GuestsFilter from "./guests_filter";
import DatesFilter from "./dates_filter";
import MoreFilters from "./more_filters";
import { startLoading, stopLoading } from "../../actions/loading_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import "./filters.css"

class FiltersBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: null,
			dates: "Dates",
			amenities: "Amenities",
			minGuests: "Guests",
			startDate: "",
			endDate: "",
			// formType: ""
		};
		this.handleClick = this.handleClick.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.updateGuests = this.updateGuests.bind(this);
		this.updateAmenities = this.updateAmenities.bind(this);
		this.updateDates = this.updateDates.bind(this);
	}

	componentWillReceiveProps(props) {
		const minGuests =
			props.filters.minGuests > 1
				? `${props.filters.minGuests}+ guests`
				: "Guests";
		let amenities = "Amenities";
		let dates = "Dates";
		this.setState({ minGuests, amenities, dates });
	}

	updateGuests(guests) {
		this.props.startLoading();
		this.props
			.updateFilter("minGuests", guests)
			.then(() => this.props.stopLoading());
	}

	updateAmenities(amenities) {
		this.props.startLoading();
		this.props
			.updateFilter("amenities", amenities)
			.then(() => this.props.stopLoading());
	}

	updateDates(dates) {
		this.props.startLoading();
		this.props
			.updateFilter("dates", dates)
			.then(() => this.props.stopLoading());
	}

	handleClick(modal) {
		return e => {
			e.stopPropagation();
			this.setState({ modal });
			// this.props.openModal({ formType });
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
					updateGuests={this.updateGuests}
					hideModal={this.hideModal}
					minGuests={this.props.filters.minGuests}
				/>
			);
		} else if (this.state.modal === "Amenities") {
			component = (
				<MoreFilters
					updateAmenities={this.updateAmenities}
					hideModal={this.hideModal}
					// 	minPrice={this.props.filters.price.minPrice}
					// 	maxPrice={this.props.filters.price.maxPrice}
				/>
			);
		} else if (this.state.modal === "Dates") {
			component = (
				<DatesFilter
					updateDates={this.updateDates}
					hideModal={this.hideModal}
					startDate={this.props.filters.dates.startDate}
					endDate={this.props.filters.dates.endDate}
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
							this.state.modal === "Dates" ||
							this.props.filters.dates.startDate !== "" ||
							this.props.filters.dates.endDate !== ""
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
							this.props.filters.minGuests > 1
								? "filter-button selected"
								: "filter-button"
						}
					>
						{this.state.minGuests}
					</div>
					<div
						onClick={this.handleClick("Amenities")}
						className={
							this.state.modal === "Amenities" ||
								this.props.filters.amenities.bedrooms > 0 ||
								this.props.filters.amenities.beds < 0 ||
								this.props.filters.amenities.bathrooms < 0
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
	// openModal: formType => dispatch(openModal(formType)),
	// hideModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBar);
