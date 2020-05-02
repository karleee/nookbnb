import React from 'react';

class Month extends React.Component {
  // Constructor for Month
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      emptyDays: [],
      leapYear: this.props.currentYr % 4 === 0
    }
    this.populateDays = this.populateDays.bind(this);
    this.getSelectedYr = this.getSelectedYr.bind(this);
  }
  
  // Runs once component has mounted
  componentDidMount() {
    const { currentMonth } = this.props;
    this.populateDays(currentMonth);
  }

  // Runs when component receives new props
  componentWillReceiveProps(newState) {
    this.populateDays(newState.currentMonth);
  }

  // Populates months with correct amount of days
  populateDays(month) {
    let firstDay = (new Date(this.props.currentYr, month, 1)).getDay();
    let emptyDays = [];
    let totalDays;
    let newDays = [];

    // Setting empty days
    for (let i = 0; i < firstDay; i++) {
      emptyDays.push(i);
    }

    this.setState({ emptyDays });

    // Setting total days for months
    if (month === 1 && !this.state.leapYear) {
      totalDays = 28;
    } else if (month === 1 && this.state.leapYear) {
      totalDays = 29;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
      totalDays = 30;
    } else {
      totalDays = 31;
    }

    for (let i = 0; i < totalDays; i++) {
      let newDay = i + 1;
      newDays.push(newDay.toString());
    }

    this.setState({days: newDays});
  }

  // Gets the correct year for the date the user selected
  getSelectedYr(currentMonth, nextMonth, yr) {
    let updatedYr;
    
    if (currentMonth === 0 && nextMonth !== 1) {
      updatedYr = yr + 1;
    } else {
      updatedYr = yr;
    }
    return updatedYr;
  }

  // Renders the Month component
  render() {
    const { currentMonth, nextMonth, currentYr, type } = this.props;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    let weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let month = months[currentMonth];
    let yr = this.getSelectedYr(currentMonth, nextMonth, currentYr);

    return (
      <div className="month month-wrapper">
        <div class={`month header-wrapper`}>{month}</div> 

        <div className="month days-wrapper">
          {weekdays.map(weekday => <p className="weekday">{weekday}</p>)}
          {this.state.days.map(day => <p className="number" onClick={() => this.props.handleDateClick(currentMonth, day, yr)}>{day}</p>)}
        </div>
      </div>
    );
  }
}

export default Month;