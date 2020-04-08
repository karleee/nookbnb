import React from "react";
import Helmet from "react-helmet";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "./filters.css"
import Datepicker from "../datepicker/datepicker";
import { updateFilter } from "../../actions/filter_actions";


export default class DatesFilter extends React.Component {
	static defaultProps = {
		numberOfMonths: 2
	};

	constructor(props) {
		super(props);
		this.state = {
			startDate: "",
			endDate: "",
			formType: "Dates"
		};
		this.handleDayClick = this.handleDayClick.bind(this);
			this.handleResetClick = this.handleResetClick.bind(this);
			this.state = this.getInitialState();
		    this.handleClear = this.handleClear.bind(this);
				this.handleSubmit = this.handleSubmit.bind(this);
				this.updateField = this.updateField.bind(this);
	}

	getInitialState() {
		return {
			from: "",
			to: "",
			formType: "dates" 
		};
	}

	handleDayClick(day) {
		const range = DateUtils.addDayToRange(day, this.state);
		this.setState(range);
	}

	handleResetClick() {
		this.setState(this.getInitialState());
	}

	parseDate(date) {
    if (date === "") {
      return date;
    }
    let parsed = "";
    // let stringDate = date.toString();
    // let arrDate = stringDate.split(" ");

    // parsed += arrDate[1] + " " + arrDate[2];
    return parsed;
	}
	
	updateField(field) {
    return e => {
      this.setState({ [field]: e });
    };
	}

	handleClear() {
    this.setState({ startDate: "", endDate: "" });
  }

  handleSubmit() {
		this.props.updateFilter("startDate", this.state.startDate);
		this.props.updateFilter("endDate", this.state.endDate);
    this.props.hideModal();
  }

	render() {
		const { from, to } = this.state;
		const modifiers = { start: from, end: to };
		return (
			<div className="dates-filter">
				<div className="dates-div">
					<span className="check-in">
						<DayPickerInput
							numberOfMonths={this.props.numberOfMonths}
							selectedDays={[from, { from, to }]}
							modifiers={modifiers}
							onDayClick={this.handleDayClick}
							value={this.parseDate(this.state.startDate)}
							onDayChange={this.updateField("startDate")}
							classNames={{
								container: "date-input",
								overlayWrapper: "calendar-wrapper",
								overlay: "calendar"
							}}
							placeholder="Check In"
							dayPickerProps={{
								selectedDay: this.state.startDate,
								disabledDays: [
									{ before: new Date() },
									{ after: this.state.endDate }
								]
							}}
						/>
					</span>
					<span className="arrow">
						<i className="material-icons"></i>
					</span>
					<span className="check-out">
						<DayPickerInput
							numberOfMonths={this.props.numberOfMonths}
							selectedDays={[from, { from, to }]}
							modifiers={modifiers}
							onDayClick={this.handleDayClick}
							value={this.parseDate(this.state.endDate)}
							onDayChange={this.updateField("endDate")}
							classNames={{
								container: "date-input",
								overlayWrapper: "calendar-wrapper",
								overlay: "calendar"
							}}
							placeholder="Check Out"
							dayPickerProps={{
								selectedDay: this.state.startDate,
								disabledDays: [
									{ before: new Date() },
									{ before: this.state.startDate }
								]
							}}
						/>
					</span>
				</div>
				<div className="dates-filter-apply-clear">
					<div className="dates-filter-clear" onClick={this.handleClear}>
						Clear
					</div>
					<div className="dates-filter-apply" onClick={this.handleSubmit}>
						Apply
					</div>
				</div>
			</div>
		);
	}
}
