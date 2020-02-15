import React from 'react';
import Month from './month_container';
import '../../assets/stylesheets/datepicker.css';

class Datepicker extends React.Component {
  // Constructor for Datepicker
  constructor(props) {
    super(props);
    let currentDate = new Date();
    const monthsLength = 12;
    this.state= {
      currentDay: currentDate.getDate(),
      currentMonth: currentDate.getMonth(),
      nextMonth: (currentDate.getMonth() + 1) % monthsLength,
      currentYr: currentDate.getFullYear(),
      selectedStartMonth: '',
      selectedStartDay: '',
      selectedStartYr: '',
      selectedEndMonth: '',
      selectedEndDay: '',
      selectedEndYr: '',
      clicks: 0
    }

    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.resetEndDate = this.resetEndDate.bind(this);
    this.reset = this.reset.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  // Goes to next month
  nextMonth() {
    const monthsLength = 12;
    let yrIndicator = this.state.currentMonth + 1;

    if (yrIndicator > 11) {
      this.setState({ currentYr: this.state.currentYr + 1 });
    }

    let newCurrentMonth = (this.state.currentMonth + 1) % monthsLength;
    let newNextMonth = (this.state.nextMonth + 1) % monthsLength;
    this.setState({ currentMonth: newCurrentMonth });
    this.setState({ nextMonth: newNextMonth });
  }

  // Goes to previous month
  previousMonth() {
    const monthsLength = 12;
    let yrIndicator = this.state.currentMonth - 1;

    if (yrIndicator < 0) {
      this.setState({ currentYr: this.state.currentYr - 1 });
    }

    let newCurrentMonth = ((this.state.currentMonth - 1) + monthsLength) % monthsLength;
    let newNextMonth = ((this.state.nextMonth - 1) + monthsLength) % monthsLength;
    this.setState({ currentMonth: newCurrentMonth });
    this.setState({ nextMonth: newNextMonth });
  }

  // Resets the end date
  resetEndDate() {
    this.setState({ selectedEndMonth: '' });
    this.setState({ selectedEndDay: '' });
    this.setState({ selectedEndYr: '' });
  }

  // Resets entire state
  reset() {
    this.setState({ selectedStartMonth: '' });
    this.setState({ selectedStartDay: '' });
    this.setState({ selectedStartYr: '' });
    this.setState({ selectedEndMonth: '' });
    this.setState({ selectedEndDay: '' });
    this.setState({ selectedEndYr: '' });
  }

  // Handles auto fill in dates for check-in and checkout
  handleClick(month, day, yr) {
    let newClicks = this.state.clicks + 1;
    let realMonthNum = month + 1;

    this.setState({ clicks: newClicks });
 
    if (newClicks % 2 !== 0) {
      this.setState({ selectedStartMonth: realMonthNum });
      this.setState({ selectedStartDay: day });
      this.setState({ selectedStartYr: yr });
      this.resetEndDate();
    } else {
      this.setState({ selectedEndMonth: realMonthNum });
      this.setState({ selectedEndDay: day });
      this.setState({ selectedEndYr: yr });
    }
  }

  formatDate(month, day) {
    let formatMonth = '';
    let formatDay = '';

    if (month < 10) {
      formatMonth = '0' + month.toString();
    } else {
      formatMonth = month;
    }

    if (day < 10) {
      formatDay = '0' + day.toString();
    } else {
      formatDay = day;
    }

    // need to figure out how to keep yr static
    return formatMonth + '/' + formatDay + '/' + this.state.selectedStartYr;
  }

  render() {
    let currentMonth = this.state.currentMonth;
    let currentYr = this.state.currentYr;
    let nextMonth = this.state.nextMonth;
    let selectedStartMonth = this.state.selectedStartMonth;
    let selectedStartDay = this.state.selectedStartDay;
    let selectedEndMonth = this.state.selectedEndMonth;
    let selectedEndDay = this.state.selectedEndDay;

    return (
      <div className="datepicker-wrapper">
        <div className="calendar-wrapper">
          <div className="arrows prev-month" onClick={this.previousMonth}>
            <i className="previous-arrow-icon"></i>
          </div>
          
          <div className="months-content-wrapper">
            <div className="months-wrapper">
              <Month 
                currentMonth={currentMonth}
                nextMonth={nextMonth}
                currentYr={currentYr} 
                type="start" 
                handleClick={this.handleClick} 
              />

              <Month 
                currentMonth={nextMonth} 
                currentYr={currentYr}
                type="end" 
                handleClick={this.handleClick} 
              />
            </div>

            <div className="clear-dates-wrapper">
              <button onClick={this.reset}>Clear Dates</button>
            </div>
          </div>

          <div className="arrows next-month" onClick={this.nextMonth}>
            <i className="next-arrow-icon"></i>
          </div>
        </div>

        <div className="selected-dates-wrapper">
          <div className="dates-wrapper">
            <div className="check-in-date">
              <input
                type="text"
                value={selectedStartMonth === '' && selectedStartDay === '' ? '' : this.formatDate(selectedStartMonth, selectedStartDay)}
                placeholder="Check-in"
              />
            </div>

            <div className="checkout-date">
              <input
                type="text"
                value={selectedEndMonth === '' && selectedEndDay === '' ? '' : this.formatDate(selectedEndMonth, selectedEndDay)}
                placeholder="Checkout"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Datepicker;