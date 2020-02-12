import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBarContainer from "./nav/navbar_container";
import LoginFormContainer from "./session/login_form_container";
import SignupSecondFormContainer from "./session/signup_second_form_container";
import SignupFirstForm from "./session/signup_first_form";
import Modal from "./modal/modal";
import { Route, Switch } from 'react-router-dom';
import SpotIndex from './spots/spot_index_container';
import SpotDetail from './spots/spot_detail_container';
import SearchContainer from './search/search_container';

const App = () => (
	<div>
		<Modal />
		<NavBarContainer />
		{/* <SignupSecondFormContainer /> */}
		<Switch>
			<Route exact path="/" component={SpotIndex} />
			<Route exact path="/spots/:spotId" component={SpotDetail} />
			{/* <AuthRoute exact path="/login" component={LoginFormContainer} /> */}
			{/* <AuthRoute exact path="/signup" component={SignupFormContainer} /> */} */}
			<Route path="/search" component={SearchContainer} />
		</Switch> 
	</div>
);

export default App;
