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
    let month = months[currentMonth];
    let yr = this.getSelectedYr(currentMonth, nextMonth, currentYr);

    return (
      <div className={`${type}-month`}>
        <div id={`${type}-month-header`}>{month}</div>

        <div className="days">
          <div className="weekday-header">
            <div className="weekday">Su</div>
            <div className="weekday">Mo</div>
            <div className="weekday">Tu</div>
            <div className="weekday">We</div>
            <div className="weekday">Th</div>
            <div className="weekday">Fr</div>
            <div className="weekday">Sa</div>
          </div>
          
          <div className="number-days">
            {this.state.emptyDays.map(day => <p className="empty"></p>)}
            {this.state.days.map(day => <p className="number" onClick={() => this.props.handleDateClick(currentMonth, day, yr)}>{day}</p>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Month;