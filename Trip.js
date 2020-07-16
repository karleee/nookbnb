const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Using embedded documents
const _upcoming = new Schema({
	past: { type: Boolean, default: false },
});s
const _expired = new Schema({
	past: { type: Boolean, default: true },
});

const TripSchema = new Schema({
	trip: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	booking: {
		type: String,
		required: true
	},
	spot: {
		type: String,
		required: true
	},
	showReviewModal: {
		type: String,
		required: true
	},
	destroyBooking: {
		type: String,
		required: true
	},
	upcomingBookings: [_upcoming],
	expiredBookings: [_expired],
	main_image_url: '',
	thumbnail_image_urls: [],
	date: {
		type: Date,
		default: Date.now
	}
})

// TripSchema.statics.inBounds = function (bounds) {
// 	return this
// 		.where('latitude')
// 		.lt(bounds.northEast.lat)
// 		.gt(bounds.southWest.lat)
// 		.where('longitude')
// 		.gt(bounds.southWest.lng)
// 		.lt(bounds.northEast.lng);
// }

module.exports = Trip = mongoose.model('Trip', TripSchema);