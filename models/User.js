const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profile_image_url: 'https://nookbnb-seeds.s3-us-west-1.amazonaws.com/default.png',
	date: {
		type: Date,
		default: Date.now 
	}
})

module.exports = User = mongoose.model('User', UserSchema);