const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
	let errors = {};

	// Ensures that an email and password field exist for a user
	data.email = validText(data.email) ? data.email : '';
	data.password = validText(data.password) ? data.password : '';

	// Validations for email and password
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email is required';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is required';
	}

	// Returns an object with the outcomes of this function
	return {
		errors,
		isValid: Object.keys(errors).length === 0
	};
};