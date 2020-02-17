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
      adultGuests: 1,
      childrenGuests: 0,
      infantGuests: 0,
      guestsState: false,
      clicks: 0
    }

    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.resetEndDate = this.resetEndDate.bind(this);
    this.reset = this.reset.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.toggleGuestsState = this.toggleGuestsState.bind(this);
    this.handleGuestsAddingClick = this.handleGuestsAddingClick.bind(this);
    this.handleGuestsSubtractingClick = this.handleGuestsSubtractingClick.bind(this);
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
  handleDateClick(month, day, yr) {
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

  // Handles dropdown menu click
  toggleGuestsState() {
    this.setState({ guestsState: !this.state.guestsState });
  }

  // Handles guests adding click
  handleGuestsAddingClick(guestType) {
    let totalGuests = this.state.adultGuests + this.state.childrenGuests;
    let newTotalGuests;
    let guestCount;

    if (guestType === 'adult') {
      guestCount = this.state.adultGuests;
    } else if (guestType === 'children') {
      guestCount = this.state.childrenGuests;
    } else {
      let newInfantGuests = this.state.infantGuests + 1;
      this.setState({ infantGuests: newInfantGuests });
      return;
    }

    if (totalGuests < 4) {
      newTotalGuests = totalGuests + 1;
      this.setState({ totalGuests: newTotalGuests });

      if (guestType === 'adult' && guestCount < 4) {
        let newAdultGuests = this.state.adultGuests + 1;
        this.setState({ adultGuests: newAdultGuests });
      } else if (guestType === 'children' && guestCount < 4) {
        let newChildrenGuests = this.state.childrenGuests + 1;
        this.setState({ childrenGuests: newChildrenGuests });
      } 
    }
  }

  // Handles guests subtracting click
  handleGuestsSubtractingClick(guestType) {
    let newTotalGuests = this.state.totalGuests - 1;
    let newGuestCount;
    let guestCount;

    if (guestType === 'adult') {
      guestCount = this.state.adultGuests;
    } else if (guestType === 'children') {
      guestCount = this.state.childrenGuests;
    } else {
      guestCount = this.state.infantGuests;
    }

    newGuestCount = guestCount - 1;    

    if (newTotalGuests >= 0 && newGuestCount >= 0) {
      this.setState({ totalGuests: newTotalGuests });

      if (guestType === 'adult') {
        let newAdultGuests = this.state.adultGuests - 1;
        this.setState({ adultGuests: newAdultGuests });
      } else if (guestType === 'children') {
        let newChildrenGuests = this.state.childrenGuests - 1;
        this.setState({ childrenGuests: newChildrenGuests });
      } else if (guestType === 'infant') {
        let newInfantGuests = this.state.infantGuests - 1;
        this.setState({ infantGuests: newInfantGuests });
      }
    }
  }

  // Formats dates correctly
  formatDate(month, day, yr) {
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

    return formatMonth + '/' + formatDay + '/' + yr;
  }

  render() {
    let currentMonth = this.state.currentMonth;
    let currentYr = this.state.currentYr;
    let nextMonth = this.state.nextMonth;
    let selectedStartMonth = this.state.selectedStartMonth;
    let selectedStartDay = this.state.selectedStartDay;
    let selectedStartYr = this.state.selectedStartYr;
    let selectedEndMonth = this.state.selectedEndMonth;
    let selectedEndDay = this.state.selectedEndDay;
    let selectedEndYr = this.state.selectedEndYr;
    let adultGuests = this.state.adultGuests;
    let childrenGuests = this.state.childrenGuests;
    let infantGuests = this.state.infantGuests;
    let totalGuests = adultGuests + childrenGuests;
    let guestsState = this.state.guestsState;

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
                handleDateClick={this.handleDateClick} 
              />

              <Month 
                currentMonth={nextMonth} 
                currentYr={currentYr}
                type="end" 
                handleDateClick={this.handleDateClick} 
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
                value={selectedStartMonth === '' && selectedStartDay === '' ? '' : this.formatDate(selectedStartMonth, selectedStartDay, selectedStartYr)}
                placeholder="Check-in"
              />
            </div>

            <div className="checkout-date">
              <input
                type="text"
                value={selectedEndMonth === '' && selectedEndDay === '' ? '' : this.formatDate(selectedEndMonth, selectedEndDay, selectedEndYr)}
                placeholder="Checkout"
              />
            </div>
          </div>

          <div className="guests" onClick={this.toggleGuestsState}>
            <div className="guests-input-wrapper">
              <label>Guests</label>
              <p>{totalGuests > 1 ? `${totalGuests} guests` : `${totalGuests} guest`} {infantGuests > 0 ? `, ${infantGuests} infants` : ''}</p>
            </div>

            <div className="guests-dropdown-arrow-wrapper">
              {guestsState ? <i className="guests-dropdown-arrow-active-icon"></i> : <i className="guests-dropdown-arrow-icon"></i>}
            </div>
          </div>

          { guestsState ? 
            <div className="guests-dropdown-menu">
              <div className="guests-dropdown-main-content-wrapper">
                <div className="adult-guests-wrapper">
                  <div className="adult-guests-label-wrapper">
                    <p>Adults</p>
                  </div> 

                  <div className="adult-guests-buttons-wrapper">
                    <div className="subtract-button-wrapper" onClick={() => this.handleGuestsSubtractingClick('adult')}>
                      {adultGuests > 1 ? <i className="subtract-icon"></i> : <i className="subtract-icon-disable"></i>}
                    </div>

                    <div className="button-text-wrapper">
                      <p>{adultGuests}</p>
                    </div>

                    <div className="add-button-wrapper" onClick={() => this.handleGuestsAddingClick('adult')}>
                      {totalGuests < 4 ? <i className="add-icon"></i> : <i className="add-icon-disable"></i>}
                    </div>
                  </div>
                </div>

                <div className="children-guests-wrapper">
                  <div className="children-guests-label-wrapper">
                    <p>Children</p>
                    <p>Ages 2–12</p>
                  </div>

                  <div className="children-guests-buttons-wrapper">
                    <div className="subtract-button-wrapper" onClick={() => this.handleGuestsSubtractingClick('children')}>
                      {childrenGuests > 0 ? <i className="subtract-icon"></i> : <i className="subtract-icon-disable"></i>}
                    </div>

                    <div className="button-text-wrapper">
                      <p>{childrenGuests}</p>
                    </div>

                    <div className="add-button-wrapper" onClick={() => this.handleGuestsAddingClick('children')}>
                      {totalGuests < 4 ? <i className="add-icon"></i> : <i className="add-icon-disable"></i>}
                    </div>
                  </div>
                </div>

                <div className="infant-guests-wrapper">
                  <div className="infant-guests-label-wrapper">
                    <p>Infants</p>
                    <p>Under 2</p>
                  </div> 

                  <div className="infant-guests-buttons-wrapper">
                    <div className="subtract-button-wrapper" onClick={() => this.handleGuestsSubtractingClick('infant')}>
                      {infantGuests > 0 ? <i className="subtract-icon"></i> : <i className="subtract-icon-disable"></i>}
                    </div>

                    <div className="button-text-wrapper">
                      <p>{infantGuests}</p>
                    </div>

                    <div className="add-button-wrapper" onClick={() => this.handleGuestsAddingClick('infant')}>
                      <i className="add-icon"></i>
                    </div>
                  </div>
                </div>

                <div className="maximum-guests-wrapper">
                  <p>4 guests maximum. Infants don’t count toward the number of guests.</p>
                </div>

                <div className="close-wrapper">
                  <p onClick={this.toggleGuestsState}>Close</p>
                </div>
              </div>
            </div> : '' }
        </div>
      </div>
    );
  }
}

export default Datepicker;