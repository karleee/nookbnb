import React from "react";
import "./filters.css";

class MoreFilters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bedrooms: this.props.bedrooms,
			bathrooms: this.props.bathrooms,
			beds: this.props.beds,
			formType: "Amenities"
		};
		this.handleClear = this.handleClear.bind(this);
		this.handleApply = this.handleApply.bind(this);
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

	handleApply() {
		// const range = $("#price-slider").slider("option", "values");
		// this.props.updatePrice({
		//   minPrice: range[0],
		//   maxPrice: range[1]
		// });
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
						<div className="guests-filter-text">Bedrooms</div>
						<div className="guests-filter-minus" onClick={this.handleMinus}>
							-
						</div>

						<div className="guests-filter-value">{this.state.bedrooms}+</div>
						<div className="guests-filter-plus" onClick={this.handlePlus}>
							+
						</div>
					</div><br/>
					<div className="guests-filter-adults">
						<div className="guests-filter-text">Bathrooms</div>
						<div className="guests-filter-minus" onClick={this.handleMinus}>
							-
						</div>
						<br/>
						<div className="guests-filter-value">{this.state.bathrooms}+</div>
						<div className="guests-filter-plus" onClick={this.handlePlus}>
							+
						</div>
					</div><br/>
					<div className="guests-filter-adults">
						<div className="guests-filter-text">Beds</div>
						<div className="guests-filter-minus" onClick={this.handleMinus}>
							-
						</div>
						<div className="guests-filter-value">{this.state.beds}+</div>
						<div className="guests-filter-plus" onClick={this.handlePlus}>
							+
						</div>

					</div><br/><br/>

					<div className="amenities-filter-apply-clear">
						<div className="amenities-filter-clear" onClick={this.handleClear}>
							Clear
						</div>
						<div className="amenities-filter-apply" onClick={this.handleApply}>
							Apply
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MoreFilters;