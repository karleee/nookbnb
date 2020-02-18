import React from "react";
import { connect } from "react-redux";
import { requestUpdateBounds } from "../../actions/filter_actions";
import GuestsFilter from "./guests_filter";
import DatesFilter from "./dates_filter";
import MoreFilters from "./more_filters";
import { startLoading, stopLoading } from "../../actions/loading_actions";
import { openModal, closeModal } from "../../actions/modal_actions";

class FiltersBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// box: null,
			dates: "Dates",
			amenities: "Amenities",
			minGuests: "Guests",
			// startDate: "",
			// endDate: "",
			formType: ""
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
			.requestUpdateBounds("minGuests", guests)
			.then(() => this.props.stopLoading());
	}

	updateAmenities(amenities) {
		this.props.startLoading();
		this.props
			.requestUpdateBounds("amenities", amenities)
			.then(() => this.props.stopLoading());
	}

	updateDates(dates) {
		this.props.startLoading();
		this.props
			.requestUpdateBounds("dates", dates)
			.then(() => this.props.stopLoading());
	}

	handleSignup(e) {
		e.stopPropagation();
		this.props.openModal("signupFirst");
		// this.props.openModal("signupSecond");
		this.props.history.push("/");
	}

	handleClick({ formType }) {
		return e => {
			e.stopPropagation();
			this.setState({ formType });
			this.props.openModal({ formType });
		};
	}

	hideModal() {
		this.setState({ formType: null });
	}

	render() {
		let currentUser;
		let component;

		if (this.state.formType === "Guests") {
			component = (
				<GuestsFilter
					updateGuests={this.updateGuests}
					hideModal={this.hideModal}
					minGuests={this.props.filters.minGuests}
				/>
			);
		} else if (this.state.formType === "Amenities") {
			component = (
				<MoreFilters
					updateAmenities={this.updateAmenities}
					hideModal={this.hideModal}
					// 	minPrice={this.props.filters.price.minPrice}
					// 	maxPrice={this.props.filters.price.maxPrice}
				/>
			);
		} else if (this.state.formType === "Dates") {
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
							this.state.formType === "Dates"
							// this.props.filters.dates.startDate !== "" ||
							// this.props.filters.dates.endDate !== ""
								? "filter-button selected"
								: "filter-button"
						}
					>
						{this.state.dates}
					</div>
					<div
						onClick={this.handleClick("Guests")}
						className={
							this.state.formType === "Guests" ||
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
							this.state.formType === "Amenities"
							// 	this.props.filters.price.minPrice > 10 ||
							// 	this.props.filters.price.maxPrice < 1000
							// 		? "filter-button selected"
							// 		: "filter-button"
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
	requestUpdateBounds: filter => dispatch(requestUpdateBounds(filter)),
	openModal: formType => dispatch(openModal(formType)),
	hideModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBar);
