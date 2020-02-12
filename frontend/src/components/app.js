import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import SpotIndex from './spots/spot_index_container';
import SpotDetail from './spots/spot_detail_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
	<div>
		<NavBarContainer />
		<Switch>
			<Route exact path="/" component={SpotIndex} />
			<Route exact path="/spots/:spotId" component={SpotDetail} />
			{/* <AuthRoute exact path="/login" component={LoginFormContainer} /> */}
			{/* <AuthRoute exact path="/signup" component={SignupFormContainer} /> */} */}
		</Switch> 
	</div>
);

export default App;
