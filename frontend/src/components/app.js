import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBarContainer from "./nav/navbar_container";
import Modal from "./modal/modal";
import { Route, Switch } from 'react-router-dom';
import SpotIndex from './spots/spot_index_container';
import SpotDetail from './spots/spot_detail_container';
import SearchContainer from './search/search_container';
import '../assets/stylesheets/reset.css';
import '../assets/stylesheets/application.css';

// Loading static build folder in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	})
}

const App = () => (
	<div className="app-wrapper">
		<Modal />
		<NavBarContainer />
		
		<div className="app-main-content-wrapper">
		  <Switch>
		  	<Route exact path="/" component={SpotIndex} />
		  	<Route exact path="/spots/:spotId" component={SpotDetail} />
		  	<Route exact path="/search" component={SearchContainer} />
		  </Switch> 
		</div>
	</div>
);

export default App;
