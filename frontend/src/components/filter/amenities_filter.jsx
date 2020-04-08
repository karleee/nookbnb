import React from "react";
import "./filters.css";
import { updateFilter } from "../../actions/filter_actions";

class AmenitiesFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wifi: "",
			breakfast: "",
			parking: "",
			essentials: "",
			formType: "Amenities"
		};
		this.handleClear = this.handleClear.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// $("#price-slider").slider({
		//   range: true,
		//   min: 0,
		//   max: 10,
		//   values: [this.state.minPrice, this.state.maxPrice],
		//   slide: function(event, ui) {
		//     $("#price").val("$" + ui.values[0] + " - $" + ui.values[1]);
		//   }
		// });
		console.log("1");
	}
	0;
	// $("#price").val(
	//   "$" +
	//     $("#price-slider").slider("values", 0) +
	//     " - $" +
	//     $("#price-slider").slider("values", 1)
	// );
	// }

	handleClear() {
		// debugger;
		// $("#price-slider").slider("option", "values", [10, 1000]);
		// $("#price").val(
		//   "$" +
		//     $("#price-slider").slider("values", 0) +
		//     " - $" +
		//     $("#price-slider").slider("values", 1)
		// );
		console.log();
	}

	handleSubmit() {
		this.props.updateFilter("wifi", this.state.wifi);
		this.props.updateFilter("breakfast", this.state.breakfast)
		this.props.updateFilter("parking", this.state.parking)
		this.props.updateFilter("essentials", this.state.essentials)
		this.hideModal();
	}

	// handlePlus() {
	// 	let guests = this.state.guests + 1;
	// 	this.setState({ guests });
	// }

	// handleMinus() {
	// 	if (this.state.guests > 1) {
	// 		let guests = this.state.guests - 1;
	// 		this.setState({ guests });
	// 	}
	// }

	render() {
		return (
			<div className="amenities-filter">
				<div className="amenities-filter-content">

					<div className="guests-filter-adults">
						<div className="guests-filter-text">WiFi</div>
						<input className="guests-filter-minus" type="checkbox" click={this.handleMinus} />

						<div className="guests-filter-value">{this.state.wifi}+</div>
						<input className="guests-filter-plus" type="checkbox" onClick={this.handlePlus} />
					</div>
					<br/>

					<div className="guests-filter-adults">
						<div className="guests-filter-text">Breakfast</div>
						<input className="guests-filter-minus" type="checkbox" onClick={this.handleMinus} />
						<br/>
						<div className="guests-filter-value">{this.state.bathrooms}+</div>
						<input className="guests-filter-plus" type="checkbox" onClick={this.handlePlus} />
					</div>

					<br/>
					<div className="guests-filter-adults">

						<div className="guests-filter-text">Parking</div>
						<input className="guests-filter-minus" type="checkbox" onClick={this.handleMinus} />
						<div className="guests-filter-value">{this.state.beds}+</div>
						<input className="guests-filter-plus" type="checkbox" onClick={this.handlePlus} />
						</div>

					<br/><br/>

					<div className="amenities-filter-apply-clear">
						<div className="amenities-filter-clear" onClick={this.handleClear}>
							Clear
						</div>
						<div className="amenities-filter-apply" onClick={this.handleSubmit}>
							Apply
						</div>
					</div>
				</div>
			</div>
		);

	}
}

export default AmenitiesFilter;