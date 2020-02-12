import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import Search from "./search/search";

const App = () => (
	<div>
		<NavBarContainer />
		<Switch>
			{/* <AuthRoute exact path="/" component={} /> */}
			<AuthRoute exact path="/login" component={LoginFormContainer} />
			<AuthRoute exact path="/signup" component={SignupFormContainer} />
			<ProtectedRoute path="/search" component={Search} />
		</Switch> 
    <h1>hello world</h1>
	</div>
);

export default App;
