const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('../config/keys');

// Getting JSON web token from the header and secretOrKey from the keys file
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey; 

module.exports = passport => {
	passport.use(new JwtStrategy(options, (jwt_payload, done) => {
		User.findById(jwt_payload.id)
			.then(user => {
				if (user) {
					// Return the user to the frontend
					return done(null, user);
				}
				// Return false since there is no user
				return done(null, false);
			})
			.catch(err => console.log(err));
	}));
};