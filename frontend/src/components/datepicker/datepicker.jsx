import React from 'react';
import Month from './month_container';
import '../../stylesheets/datepicker.css';

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
      selectedEndMonth: '',
      selectedEndDay: '',
      clicks: 0
    }

    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
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

  // Handles auto fill in dates for check-in and checkout
  handleClick(month, day) {
    let newClicks = this.state.clicks + 1;
    let realMonthNum = month + 1;

    this.setState({ clicks: newClicks });
 
    if (newClicks % 2 !== 0) {
      this.setState({ selectedStartMonth: realMonthNum });
      this.setState({ selectedStartDay: day });
    } else {
      this.setState({ selectedEndMonth: realMonthNum });
      this.setState({ selectedEndDay: day });
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
    return formatMonth + '/' + formatDay + '/' + this.state.currentYr;
  }

  render() {
    let currentDay = this.state.currentDay;
    let currentMonth = this.state.currentMonth;
    let nextMonth = this.state.nextMonth;
    let selectedStartMonth = this.state.selectedStartMonth;
    let selectedStartDay = this.state.selectedStartDay;
    let selectedEndMonth = this.state.selectedEndMonth;
    let selectedEndDay = this.state.selectedEndDay;

    return (
      <div className="datepicker-wrapper">
        <div className="calendar-wrapper">
          <div className="arrows prev-month" onClick={this.previousMonth}>
            <p>&lt;</p>
          </div>
          
          <div className="months-wrapper">
            <Month 
              currentMonth={currentMonth}
              type="start" 
              handleClick={this.handleClick} 
            />

            <Month 
              currentMonth={nextMonth} 
              type="end" 
              handleClick={this.handleClick} 
            />
          </div>

          <div className="arrows next-month" onClick={this.nextMonth}>
            <p>&gt;</p>
          </div>
        </div>

        <div className="selected-dates-wrapper">
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
    );
  }
}

export default Datepicker;