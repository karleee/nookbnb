# Nookbnb

## Introduction
Nookbnb is a single page MERN stack (MongoDB, Express, React, Node) application that parodies off the concept and style of Airbnb. Drawing inspiration from the popular 'Animal Crossing' video game series, visitors to the site are able to browse rental listings for properties owned by Tom Nook himself. 

<kbd>
<img src="https://github.com/karleee/airbnb_clone/blob/master/README_images/home_main1.png" alt="Homepage" width="900px"     border="1">
</kbd>

<br>
<br>
<br>

<kbd>
<img src="https://github.com/karleee/nookbnb/blob/master/README_images/home_main2.png" alt="Homepage" width="900px" border="1">
</kbd>


## How It Works
To see the most up to date version, please visit [the homepage](https://nookbnb.herokuapp.com/#/).

## Technologies Used
* Routing – Express
* Database – MongoDB
* Libraries – Mongoose, React
* Server Environment – NodeJS


## Feature Spotlight
### Custom Calendar Widget

This calendar widget, which was built from scratch, dynamically renders the correct amount of days for each month and allows users to choose a check-in and checkout date. A dropdown menu to choose how many guests will be staying in the rental is also available to the user. The widget enforces that there can only be a maximum of four guests and adjusts the editing buttons for each category of guests accordingly.

<kbd>
<img src="https://github.com/karleee/nookbnb/blob/master/README_images/calendar_widget_main.png" alt="Homepage" width="900px" border="1">
</kbd>

<br>
<br>

**Challenges**
> Building from Scratch

The first challenge was to build out this widget without using any pre-built widgets or components from other libraries or resources. Although I did find fully functioning React Datepickers that I could have borrowed from, I found that styling these components seemed to be more difficult than simply coding up a widget from scratch. Many of these pre-built components also did not offer custom input boxes to store the user's chosen pair of dates; this was an incremental feature that I needed for my calendar widget so it was extremely important to keep that aspect in the final product.

Another key point that we had to keep in mind was the overall organization of all of the different components in our application and separating out irrelevant code into new components. Planning out how to break apart the calendar widget into as few components as possible while still achieving the basic functionality of date picking and dynamic displaying proved to be quite time consuming.

<br>

> Split Years

Another interesting challenge was determining how to account for split year portions of the calendar. For example, when the user landed on the calendar page that displayed both December and January, I needed to show the user the correct year for the month that they had chosen. The widget not only needed to keep track of the current year, but it also had to add or subtract the correct amount when the user clicked on the previous and next buttons.

<br>

> Guests Amount

The last challenge was to create a customizable guest amount dropdown menu that was integrated into the calendar widget. More specifically, after doing some research, it seems that Airbnb **does not** include infants as a part of the total guests count. Additionally, they are enforcing a maximum amount of guests to the rental and the UI is dynamic enough to change appearances and functionality depending on whether or not the guest limit had been reached.

<br>
<br>

**Solutions**
> Building from Scratch: Solution

For the first trial, I attempted to use the built in React datepicker, which uses hooks rather than functional components. Although this achieved the functionality that I wanted, there were some limitations. Styling for the built in widget seemed to be embedded within the widget itself; and rather than using traditional CSS or SCSS, it utilized props to manage custom style needs. Due to the time restraint and lack of familiarity with the code produced by this hook, I decided that it would take less time and increase efficiency if I created a calendar widget from scratch. Not only did this save time on the styling process, but it also increased my understanding and knowledge of how to build a custom calendar component.

<br>

> Split Years: Solution

This was a tricky issue, but ultimately, my solution involved storing separate slices of local state in the datepicker component to keep track of the date that the user chose for check-in and the date that they chose for checkout.

And to determine which text field to autofill, a clever solution that I thought of was to use a `clicks` slice of state to determine whether or not the user was choosing their check-in or checkout date. Inside of the click handler for the dates on the calendar, I was able to determine if it was their first or second click and then update the correct slice of state to trigger a re-render of the text box inputs.

``` javascript
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
```
<br>

> Guests Amount: Solution

To create the guests amount dropdown menu, I created a HTML element that rendered the entirety of the dropdown menu; however, to make it appear as though it only activated when the user clicked on the guests options input bar, I initially set the opacity to 0. Once the user clicks on the input bar, a class is added to this HTML element and using styling, I changed the opacity to 1 for this specific class. This created the toggling effect that I was trying to accomplish with this piece of the calendar widget. And to create the editing buttons (adding and subtracting) in the dropdown menu I used icon tags that dynamically changed content depending on whether or not the maximum amount of guests had been reached.

<kbd>
<img src="https://github.com/karleee/airbnb_clone/blob/master/README_images/calendar_widget_guests.png" alt="Homepage" width="300px" border="1">
</kbd>

And to keep my code DRY, I managed to create a single adding and subtracting click event for every category of guests in the dropdown menu. These generic functions take in a string that indicates which type of guest they need to change the state for; and it also provides checks to see if the maximum guest amount has been reached. Because there can only be a maximum of four guests, the maximum amount for any of these categories can only be four. And if the code execution has reached the inside of the initial `if` statement, then we can safely assume that the total guest count has not reached the maximum and additions can still be made. A similar process applies to the subtraction function as well, except of course that the changes to the state are decreasing the total amount and the bounding range is checking to see if the guest amount is already at 0 (in that case, we cannot subtract any more). To account for how Airbnb handles the amount of infants in a rental, I excluded the infant guests from my total count.

``` javascript
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
```

------

### Search with Google Map API

The search functionality is implemented in 2 components--a result component and a map component integrating Google Map API. Users are able to search by city or state in the search bar. Search results are rendered alongside a Google maps that zooms according to the search position as well as displays location markers to represent the results. Integrating Google Maps posed challenges when it came to refreshing the map for every new search and updating location markers.  

<kbd>
<img src="/Users/eqdang/Desktop/app_academy/nookbnb-master/frontend/public/images/search.png" alt="Homepage" width="300px" border="1">
</kbd>

**Challenges**
> State Management
	
	The first feat was mounting the map and keeping it updated in realtime and synced with each new search. At first, I set the map to a default position that rerendered upon a search entry. However, the map was inconcistent and wavered between slow loading and nonloading.

	To solve this, I mount the map with the first search input and set a map based on the first search's lat/long. The map then is drawn to accomocate the lat/long of all remaining research results. Markers are also placed to represent each result in the state. If there are no results for a search entry, then the map is set to a default position.

```javascript
	// Initially mounts the map with first search input
		componentDidMount() {
			this.drawMap(this.props.find_loc);
		}

	// Draws a map with updated search input
		componentWillReceiveProps(newProps) {
			this.drawMap(newProps.find_loc);
		}

	// Creating the map
		MapUtil.setOptionsFromLocation(address)
			.then(options => {
			this.map = new google.maps.Map(map, options);

	// before adding markers, set up bounds
		let bounds = new google.maps.LatLngBounds();

	// Displaying nearby spots
		this.props.spots.forEach(spot => {
	// Create a position from spot coordinates
		const latitude = spot.latitude;
		const longitude = spot.longitude;
		const position = new google.maps.LatLng(latitude, longitude);

		const marker = new google.maps.Marker({
			position,
			map: this.map
		});

```

> Marker Manager

	After succesfully mountng the map to the first search state, the problem became managing updates. Markers would add to new locations upon state update, but they would not remove from those in the prevous state. 

	I resolved this by mapping through the new state and creating markers for any result that didn't previosly have one. I also mapped through the old state and removed markers from any results that were not passed in the new state.  

```javascript
	updateMarkers(spots) {
		const spotsObj = {};
		spots.forEach(spot => spotsObj[spot.id] = spot);

    spots
      .filter(spot => !this.markers[spot.id])
      .forEach(newspot => this.createMarkerFromSpot(newspot, this.handleClick))

    Object.keys(this.markers)
      .filter(spotId => !spotsObj[spotId])
			.forEach(spotId => this.removeMarker(this.markers[spotId]))
		}
```



**Challenges**
> Challenge #1

> Challenge #2

> Challenge #3

**Solutions**

> Solution #1


  
> Solution #2


> Solution #3



## Future Updates


| Version Number        | Updates           | 
| :------------- |:------------- |
| Version 1.1      | Booking Form |  
