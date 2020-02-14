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
      currentDate,
      currentDay: currentDate.getDate(),
      currentMonth: currentDate.getMonth(),
      nextMonth: (currentDate.getMonth() + 1) % monthsLength,
      currentYr: currentDate.getFullYear(),
      selectedStartMonth: '',
      selectedStartDay: '',
      selectedEndMonth: '',
      selectedEndDay: '',
      selectedYr: '',
      direction: '',
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
    this.setState({ direction: 'forward' });
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
    this.setState({ direction: 'back' });
  }

  // Handles auto fill in dates for check-in and checkout
  handleClick(day, monthNum) {
    let newClicks = this.state.clicks + 1;
    let realMonthNum = monthNum + 1;

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
    let startMnthNum = this.state.currentMonth;
    let endMnthNum = this.state.nextMonth;
    let selectedStartMonth = this.state.selectedStartMonth;
    let selectedStartDay = this.state.selectedStartDay;
    let selectedEndMonth = this.state.selectedEndMonth;
    let selectedEndDay = this.state.selectedEndDay;
    let currentDate = this.state.currentDate;
    let currentYr = this.state.currentYr;
    let direction = this.state.direction;

    return (
      <div className="datepicker-wrapper">
        <div className="calendar-wrapper">
          <div className="arrows prev-month" onClick={this.previousMonth}>
            <p>&lt;</p>
          </div>
          
          <div className="months-wrapper">
            <Month 
              currentDate={currentDate} 
              monthNum={startMnthNum} 
              currentYr={currentYr}
              type="start" 
              direction={direction}
              handleClick={this.handleClick} 
            />

            <Month monthNum={endMnthNum} type="end" handleClick={this.handleClick} />
          </div>

          <div className="arrows next-month" onClick={this.nextMonth}>
            <p>&gt;</p>
          </div>
        </div>

        <div className="selected-dates-wrapper">
          <div className="check-in-date">
            <input
              type="text"
              value={this.formatDate(selectedStartMonth, selectedStartDay)}
              placeholder="Check-in"
            />
          </div>

          <div className="checkout-date">
            <input
              type="text"
              value={this.formatDate(selectedEndMonth, selectedEndDay)}
              placeholder="Checkout"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Datepicker;