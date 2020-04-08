import React from "react";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../actions/modal_actions";
import { updateFilter } from "../../actions/filter_actions";
import "./filters.css";

class GuestsFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			guests: 0,
			bedrooms: "",
			beds: "",
			baths: "",
			formType: "Guests",
		};
		this.handlePlus = this.handlePlus.bind(this);
		this.handleMinus = this.handleMinus.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateGuests() {
		this.props.startLoading();
		this.props
			.updateFilter("guests", this.state.guests)
			.then(() => this.props.stopLoading());
	}

	handlePlus() {
		if (this.state.guests >= 0 && this.state.guests < 6) {
			let guests = this.state.guests + 1;
			this.setState({ guests });
		}
	}

	handleMinus() {
		if (this.state.guests > 1) {
			let guests = this.state.guests - 1;
			this.setState({ guests });
		}
	}

	handleClear() {
		this.setState({ guests: "" });
	}

	handleSubmit() {
		this.props.updateFilter(this.state);
		this.props.hideModal();
	}

	handleClick(modal)
	{
		return e =>
		{
			e.stopPropagation();
			this.setState({ modal });
			this.props.openModal(modal);
		};
	}

	render() {
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
		} 
		let component;
		let clear;
		if (this.state.guests > 1) {
			clear = (
				<div className="guests-filter-clear" onClick={this.handleClear}>
					Clear
				</div>
			);
		}

		return (
			<div>
			<div
				onClick={this.handleClick("Guests")}
				className={
					this.state.modal === "Guests" ||
						this.props.guests !== ""
						? "filter-button selected"
						: "filter-button" }
			>
				{this.state.guests}
			</div>

			<div className="guests-filter">
				{/* <div className="guests-filter-content"> */}

					<div className="guests-filter-adults">
						<div className="guests-filter-text">Guests</div>
						<div className="guests-filter-minus" onClick={this.handleMinus}>
							- </div>
						<div className="guests-filter-value">{this.state.guests > 0 ? this.state.guests : null}+</div>
						<div className="guests-filter-plus" onClick={this.handlePlus}>
							+ </div>
					</div>

					<div className="guests-filter-apply-clear">
						{clear}
					<div className="guests-filter-apply" onClick={this.handleSubmit}>
						Apply
					</div>

					{/* </div> */}
				</div>

				{component && (
					<div className="everything-but-filter" onClick={this.hideModal}>
						<div onClick={e => e.stopPropagation()}>{component}</div>
					</div>
				)}
			</div>
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
	// stopLoading: () => dispatch(stopLoading("search"))
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestsFilter);
