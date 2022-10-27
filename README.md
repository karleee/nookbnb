# Nookbnb

## Introduction
Nookbnb is a single page MERN stack (MongoDB, Express, React, Node) application that parodies off the concept and style of Airbnb. Drawing inspiration from the popular 'Animal Crossing' video game series, visitors to the site are able to browse rental listings for properties owned by Tom Nook himself. 

<kbd>
<img src="https://github.com/karleee/nookbnb/blob/master/README_images/nookbnb_main1.png" alt="Homepage" width="900px"     border="1">
</kbd>

<br>
<br>
<br>

<kbd>
<img src="https://github.com/karleee/nookbnb/blob/master/README_images/nookbnb_main2.png" alt="Homepage" width="900px" border="1">
</kbd>

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

### Google Maps API
To add a visualization of where vacation rentals were located in the world and to provide a more realistic simulation of the fictional locations, we integrated a third party Google Maps API. This allowed users to use the cursor to move left, right, up, and down on the map, as well as the ability to display the vacation rentals with visual markers in their respective longitude and latitude coordinates. Coupled with a searching functionality, the map performs an auto centering and zooming based on whether or not a search returns vacation rental results.

<kbd>
<img src="https://github.com/karleee/nookbnb/blob/master/README_images/maps_main1.png" alt="Homepage" width="900px"     border="1">
</kbd>

<br>
<br>
<br>

<kbd>
<img src="https://github.com/karleee/nookbnb/blob/master/README_images/maps_main2.png" alt="Homepage" width="900px" border="1">
</kbd>

**Challenges**
> Auto-Updating Map Location

The first challenge was to correctly update the map's displayed location when the user entered a new search input with the map being a solely stateless functional component. Without any local state being kept track of in the map component, what was the cleanest and most efficient way to update the map's location in real time?

> Lifecycle Methods and New Props

One small but important obstacle was finding a way to render the map multiple times, although the tutorial in the Google Maps API doc suggested the map rendering to be placed inside of `componentDidMount()` that would only solve half of the problem. The map would be rendered, but when the user enters a new search input, only the initial rendered map would be displayed.

> Staying in Bounds

The next challenge involved finding a way to render all the retrieved location results within a predefined set of bounds, in such a way that avoided rendering a map that was too large and revealed **all** the spots or a map that was too small and prevented all search results to be visible.

**Solutions**

> Auto-Updating Map Location: Solution

For simplicity's sake and to avoid unecessary containers for trivial components, our solution involved not the map container itself, but its parent container, which included both a container and presentational component. Rather than putting local states or a container on the map component, we chose to pass the location as a prop to the map component from the parent search component. 

```javascript
<Map spots={foundSpots} find_loc={this.state.find_loc} />
```

Another advantage of this solution was the automatic state update that happens on the search component when a user types in a new input, courtesy of React and Redux. In the container of the search component, the state determines the `find_loc` prop based on the current query parameter in the URL. 

```javascript
const mapStateToProps = (state, ownProps) => ({
  spots: Object.values(state.entities.spots),
  find_loc: ownProps.match.params.find_loc
});
```

Because this prop depends on the parameter found in the URL, once it has changed, the `find_loc` prop will also be automatically updated, thus initiating a re rendering of the search component, which in turn, re-renders the map component with the new `find_loc` prop as well.
  
> Lifecycle Methods and New Props: Solution

Placing the map rendering code inside of `componentDidMount()` seemed to work at first glance, however, during testing, we discovered that this **only** rendered the map once. This gave the impression that the user's new search inputs were not being read or taken in by the component which posed a problem. Drawing on the idea from the previous challenge, that we needed to somehow tell the map to update when a new location was received, we found that the `componentWillReceiveProps()` lifecycle method did exactly what we were looking for. Once the component received a new prop, then this lifecycle method would execute anything inside of it. 

Once we realized that both the `componentDidMount()` and `componentWillReceiveProps()` methods needed to perform the same process, it was apparent that we could refactor the map rendering logic into a new function. Rather than simply repeating the same map rendering code twice in these lifecycle methods, we were able to simply call on the newly made map rendering function and pass it the correct location variable.


> Staying in Bounds: Solution

To create a map that showed the correct cluster of locations without zooming in too far to too close, while also ensuring that every location in the search results were encompassed in the map display, we took advantage of some of the built in Google Maps API functions and combined it with our own custom logic.

We began by iterating through every location passed to the map component with a loop (all locations that were passed to the map component were already pre filtered by the user's search input). Once we had a location, we converted the longitude and latitude, which were stored as simple float values in MongoDB, into a Google Maps LatLng object. Now that we had this new object type, we could use the `extend` method of the LatLngBounds class to create a new bounds that included the location. By iterating through **every** given location to the map component, we were able to ensure that **all** locations would be visible in the calculated bounds.

```javascript
this.props.spots.forEach(spot => {
          // Create a position from spot coordinates
          const latitude = spot.latitude;
          const longitude = spot.longitude;
          const position = new google.maps.LatLng(latitude, longitude);

          // Place markers on the map
          const marker = new google.maps.Marker({
            position,
            map: this.map
          });

          // extend the bounds to fit this position
          bounds.extend(position);
        });
```

## Future Updates


| Version Number        | Updates           | 
| :------------- |:------------- |
| Version 1.1      | Booking Form |  
