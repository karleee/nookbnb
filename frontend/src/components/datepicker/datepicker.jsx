import React from 'react';
import Month from './month_container';
import '../../assets/stylesheets/datepicker/datepicker.css';

class Datepicker extends React.Component {
  // Constructor for Datepicker
  constructor(props) {
    super(props);
    let currentDate = new Date();
    const monthsLength = 12;
    this.state = {
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
    this.setState({ clicks: 0 });
    this.setState({ selectedStartMonth: '' });
    this.setState({ selectedStartDay: '' });
    this.setState({ selectedStartYr: '' });
    this.setState({ selectedEndMonth: '' });
    this.setState({ selectedEndDay: '' });
    this.setState({ selectedEndYr: '' });
  }

  // Handles auto fill in dates for check-in and checkout
  handleDateClick(month, day, yr) {
    let clicks = this.state.clicks;
    let startMonthNum = this.state.selectedStartMonth;
    let startDay = this.state.selectedStartDay;
    let startYr = this.state.selectedStartYr;
    let endMonthNum = this.state.selectedEndMonth;
    let endDay = this.state.selectedEndDay;
    let endYr = this.state.selectedEndYr;

    if (this.state.clicks % 2 === 0) {
      clicks = this.state.clicks + 1;
      startMonthNum = month + 1;
      startDay = day;
      startYr = yr;
    } else {
      if (startMonthNum === 12) {
        if ((month === 11 && yr === startYr && parseInt(day) > parseInt(startDay)) || yr > startYr) {
          clicks = this.state.clicks + 1;
          endMonthNum = month + 1;
          endDay = day;
          endYr = yr;
        }
      } else {
        if (month + 1 >= startMonthNum && parseInt(day) > parseInt(startDay) && yr >= startYr) {
          clicks = this.state.clicks + 1;
          endMonthNum = month + 1;
          endDay = day;
          endYr = yr;
        }
      }
    }

    this.setState({ clicks });
    this.setState({ selectedStartMonth: startMonthNum });
    this.setState({ selectedStartDay: startDay });
    this.setState({ selectedStartYr: startYr });

    this.setState({ selectedEndMonth: endMonthNum });
    this.setState({ selectedEndDay: endDay });
    this.setState({ selectedEndYr: endYr });

    if (this.state.clicks % 2 === 0) this.resetEndDate();
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
        let newAdultGuests = guestCount + 1;
        this.setState({ adultGuests: newAdultGuests });
      } else if (guestType === 'children' && guestCount < 4) {
        let newChildrenGuests = guestCount + 1;
        this.setState({ childrenGuests: newChildrenGuests });
      } 
    }
  }

  // Handles guests subtracting click
  handleGuestsSubtractingClick(guestType) {
    let totalGuests = this.state.adultGuests + this.state.childrenGuests;
    let newTotalGuests;
    let guestCount;

    if (guestType === 'adult') {
      guestCount = this.state.adultGuests;
    } else if (guestType === 'children') {
      guestCount = this.state.childrenGuests;
    } else {
      guestCount = this.state.infantGuests;
    }

    if (totalGuests > 0) {
      newTotalGuests = totalGuests - 1;
      this.setState({ totalGuests: newTotalGuests });

      if (guestType === 'adult' && guestCount > 1) {
        let newAdultGuests = guestCount - 1;
        this.setState({ adultGuests: newAdultGuests });
      } else if (guestType === 'children' && guestCount > 0) {
        let newChildrenGuests = guestCount - 1;
        this.setState({ childrenGuests: newChildrenGuests });
      } else if (guestType === 'infant' && guestCount > 0) {
        let newInfantGuests = guestCount - 1;
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
      <div className="datepicker form-wrapper"> 
        <div className="datepicker calendars-wrapper">
          <div className="datepicker prev-arrow-icon" onClick={this.previousMonth}>
            <img src="/images/spot_detail/previous_arrow_icon.png" alt="Previous arrow" /> 
          </div>
          
          <div className="datepicker months-wrapper">
            <div className="datepicker start-end-month-wrapper">
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

            <div className="datepicker clear-dates-wrapper">
              <button onClick={this.reset}>Clear Dates</button>
            </div>
          </div>

          <div className="datepicker next-arrow-icon" onClick={this.nextMonth}>
            <img src="/images/spot_detail/next_arrow_icon.png" alt="Previous arrow" /> 
          </div>
        </div>

        <div className="datepicker user-input-wrapper">
          <div className="datepicker dates-input-wrapper">
            <input
              type="text"
              value={selectedStartMonth === '' && selectedStartDay === '' ? '' : this.formatDate(selectedStartMonth, selectedStartDay, selectedStartYr)}
              placeholder="Check-in"
            />

            <input
              type="text"
              value={selectedEndMonth === '' && selectedEndDay === '' ? '' : this.formatDate(selectedEndMonth, selectedEndDay, selectedEndYr)}
              placeholder="Checkout"
            />
          </div>

          <div className="datepicker guests-input-wrapper" onClick={this.toggleGuestsState}>
            <div className="datepicker num-guests-wrapper">
              <label>Guests</label>
              <p>{totalGuests > 1 ? `${totalGuests} guests` : `${totalGuests} guest`} {infantGuests > 0 ? `, ${infantGuests} infants` : ''}</p>
            </div>

            {guestsState ? <img className="datepicker dropdown-arrow-wrapper active" src="/images/spot_detail/dropdown_arrow_active_icon.png" alt="Active dropdown arrow" /> : <img className="datepicker dropdown-arrow-wrapper" src="/images/spot_detail/dropdown_arrow_icon.png" alt="Dropdown arrow" />}
          </div>

          { guestsState ? 
            <div className="datepicker dropdown-menu-wrapper">
              <div className="datepicker option-wrapper"> 
                <p>Adults</p>

                <div className="datepicker buttons-wrapper">
                  <div className="datepicker subtract-button-wrapper" onClick={() => this.handleGuestsSubtractingClick('adult')}>
                    {adultGuests > 1 ? <img className="datepicker subtract-button" src="/images/spot_detail/subtract_icon.png" alt="Subtract button" /> : <img className="datepicker subtract-icon disabled" src="/images/spot_detail/subtract_disable_icon.png" alt="Disabled subtract button" />}
                  </div>

                  <p>{adultGuests}</p> 

                  <div className="datepicker add-button-wrapper" onClick={() => this.handleGuestsAddingClick('adult')}>
                    {totalGuests < 4 ? <img className="datepicker add-button" src="/images/spot_detail/add_icon.png" alt="Add button" /> : <img className="datepicker add-button disable" src="/images/spot_detail/add_disable_icon.png" alt="Disabled add button" />}
                  </div>
                </div>
              </div>

              <div className="datepicker option-wrapper">
                <div className="datepicker label-wrapper">
                  <p>Children</p>
                  <p>Ages 2–12</p>
                </div>

                <div className="datepicker buttons-wrapper">
                  <div className="datepicker subtract-button-wrapper" onClick={() => this.handleGuestsSubtractingClick('children')}>
                    {childrenGuests > 0 ? <img className="datepicker subtract-button" src="/images/spot_detail/subtract_icon.png" alt="Subtract button" /> : <img className="datepicker subtract-icon disabled" src="/images/spot_detail/subtract_disable_icon.png" alt="Disabled subtract button" />}
                  </div>

                  <p>{childrenGuests}</p>

                  <div className="datepicker add-button-wrapper" onClick={() => this.handleGuestsAddingClick('children')}>
                    {totalGuests < 4 ? <img className="datepicker add-button" src="/images/spot_detail/add_icon.png" alt="Add button" /> : <img className="datepicker add-button disable" src="/images/spot_detail/add_disable_icon.png" alt="Disabled add button" />}
                  </div>
                </div>
              </div>

              <div className="datepicker option-wrapper">
                <div className="datepicker label-wrapper">
                  <p>Infants</p>
                  <p>Under 2</p>
                </div> 

                <div className="datepicker buttons-wrapper">
                  <div className="datepicker subtract-button-wrapper" onClick={() => this.handleGuestsSubtractingClick('infant')}>
                    {infantGuests > 0 ? <img className="datepicker subtract-button" src="/images/spot_detail/subtract_icon.png" alt="Subtract button" /> : <img className="datepicker subtract-icon disabled" src="/images/spot_detail/subtract_disable_icon.png" alt="Disabled subtract button" />}
                  </div>

                  <p>{infantGuests}</p>

                  <div className="datepicker add-button-wrapper" onClick={() => this.handleGuestsAddingClick('infant')}>
                    <img className="datepicker add-button" src="/images/spot_detail/add_icon.png" alt="Add button" />
                  </div>
                </div>
              </div>

              <div className="datepicker max-message-wrapper">
                <p>4 guests maximum. Infants don’t count toward the number of guests.</p>
              </div>

              <div className="datepicker close-wrapper">
                <p onClick={this.toggleGuestsState}>Close</p>
              </div>
            </div> : '' }
        </div>
      </div>
    );
  }
}

export default Datepicker;