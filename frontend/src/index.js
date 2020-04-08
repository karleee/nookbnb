import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Root from './components/root';
import configureStore from './store/store';

import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
	let store;

	// Saves session for returning user
	if (localStorage.jwtToken) {
		// Set the token as a common header for all axios requests
		setAuthToken(localStorage.jwtToken);

		// Decode the token to obtain the user's information
		const decodedUser = jwt_decode(localStorage.jwtToken);

		// Create a preconfigured state we can immediately add to our store
		const preloadedState = {
			session: { isAuthenticated: true, user: decodedUser }
		};

		store = configureStore(preloadedState);

		const currentTime = Date.now() / 1000;

		// Logout user if session has expired
		if (decodedUser.exp < currentTime) {
			store.dispatch(logout());
			window.location.href = "/login";
		}
	} else {
		// Empty store for first time users
		store = configureStore({});
	}

	const root = document.getElementById("root");

	ReactDOM.render(<Root store={store} />, root);
});
