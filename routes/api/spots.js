const express = require('express');
const router = express.Router();
const Spot = require('../../models/Spot');

// Route for getting all spots
router.get('/', (req, res) => {
  Spot.find()
    .sort({ date: -1 })
    .then(spots => res.json(spots))
    .catch(err => res.status(404).json({ nospotsfound: 'No spots found' }));
});

// Adding an additional route for displaying spots in a certain area
// Used on location based search as well as moving around on the map
router.get('/search', (req, res) => {
  const northEast = JSON.parse(req.query.northEast);
  const southWest = JSON.parse(req.query.southWest);
  Spot.inBounds({ northEast, southWest })
    .then(spots => res.json(spots))
    .catch(err => res.status(404).json({ nospotsfound: 'No spots found' }));
});

// Route for a particular spot
router.get('/:spotId', (req, res) => {
  Spot.findById(req.params.spotId)
    .populate({ path: 'user', select: 'email _id' })
    .then(data => {
      let payload = { user: data.user, spot: data };
      payload.spot.user = data.user._id;
      res.json(payload);
    })
    .catch(err =>
      res.status(404).json({ nospotfound: 'No spot found with that ID' })
    );
});

module.exports = router;