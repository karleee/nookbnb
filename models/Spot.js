const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Using embedded documents
const _amenities = new Schema({
  wifi: { type: Boolean, default: false },
  kitchen: { type: Boolean, default: false },
  breakfast: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
  pool: { type: Boolean, default: false },
  essentials: { type: Boolean, default: false }
});

const SpotSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  occupancy: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  beds: {
    type: Number,
    required: true
  },
  baths: {
    type: Number,
    required: true
  },
  amenities: [_amenities],
  price: {
    type: Number,
    required: true
  },
  main_image_url: '',
  thumbnail_image_urls: [],
  date: {
    type: Date,
    default: Date.now
  }
})

SpotSchema.statics.inBounds = function (bounds) {
  return this
    .where('latitude')
    .lt(bounds.northEast.lat)
    .gt(bounds.southWest.lat)
    .where('longitude')
    .gt(bounds.southWest.lng)
    .lt(bounds.northEast.lng);
}

module.exports = Spot = mongoose.model('Spot', SpotSchema);