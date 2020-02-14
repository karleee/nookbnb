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
      selectedMonth: '',
      selectedDay: ''
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
    this.setState({currentMonth: newCurrentMonth});
    this.setState({nextMonth: newNextMonth});
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

  handleClick(day, month) {
    let monthNum = month + 1;
    this.setState({ selectedMonth: monthNum });
    this.setState({ selectedDay: day });
    // this.formatDate();
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

    return formatMonth + '/' + formatDay + '/' + this.state.currentYr;
  }

  render() {
    let startMnthNum = this.state.currentMonth;
    let endMnthNum = this.state.nextMonth;
    let month = this.state.selectedMonth;
    let day = this.state.selectedDay;

    return (
      <div className="datepicker-wrapper">
        <div className="calendar-wrapper">
          <div className="arrows prev-month" onClick={this.previousMonth}>
            <p>&lt;</p>
          </div>
          
          <div className="months-wrapper">
            <Month monthNum={startMnthNum} type="start" handleClick={this.handleClick} />

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
              value={this.formatDate(month, day)}
              placeholder="Check-in"
            />
          </div>

          <div className="checkout-date">
            <input
              type="text"
              placeholder="Checkout"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Datepicker;