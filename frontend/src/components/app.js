import React, { Component } from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import NavBarContainer from './nav/navbar_container';
import Modal from './modal/modal_container';
import SpotIndex from './spots/spot_index_container';
import SpotDetail from './spots/spot_detail_container';
import SearchContainer from './search/search_container';
// import SearchContainer from './search/search_container';

import '../assets/stylesheets/reset.css';
import '../assets/stylesheets/application.css';

class App extends Component {
	// Render a script tag for scriptUrl in head of the HTML page
	addScriptToPage(scriptUrl) {
		const script = document.createElement("script");
		script.src = scriptUrl;
		document.head.appendChild(script);
	}

	componentDidMount() {
		// CreateReactApp requires the REACT_APP_ prefix for env vars
		let MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY; 
		// place the google maps api as a script tag in the head
		// this script places a google object on window.google
		let mapsApiUrl = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}`;
		this.addScriptToPage(mapsApiUrl);
	}

	render() {
		return (
	    <div className='app-wrapper'>
	    	<Modal />
	    	<NavBarContainer />
	    	
	    	<div className="app-main-content-wrapper">
	    	  <Switch>
	    	  	<Route exact path='/' component={SpotIndex} />
	    	  	<Route exact path='/spots/:spotId' component={SpotDetail} />
	    	  	<Route exact path='/s' component={SearchContainer} />  
	    	  </Switch> 
	    	</div>
	    </div>
		);
	}
};

export default App;
