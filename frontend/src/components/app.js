import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import LoginFormContainer from "./session/login_form_container";
import SignupSecondFormContainer from "./session/signup_second_form_container";
import SignupFirstForm from "./session/signup_first_form";
import Modal from "./modal/modal";

const App = () => (
	<div>
		<Modal />
		<NavBarContainer />
		{/* <SignupSecondFormContainer /> */}
		<Switch>
			{/* <AuthRoute exact path="/" component={} /> */}
			{/* <AuthRoute exact path="/login" component={LoginFormContainer} /> */}
			{/* <AuthRoute exact path="/signup_login" component={SignupFirstForm} /> */}
		</Switch>
		<h1>hello world</h1>
	</div>
);

export default App;
