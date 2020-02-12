const express = require('express');
const router = express.Router();
const Spot = require('../../models/Spot');

router.get('/', (req, res) => {
  Spot.find()
    .sort({ date: -1 })
    .then(spots => res.json(spots))
    .catch(err => res.status(404).json({ nospotsfound: 'No spots found' }));
});

// Adding an additional route for displaying spots in a certain area
// Used on location based search as well as moving around on the map
router.get('/search', (req, res) => {
  Spot.inBounds(JSON.parse(req.query.bounds))
    .then(spots => res.json(spots))
    .catch(err => res.status(404).json({ nospotsfound: 'No spots found' }));
});

router.get('/:spotId', (req, res) => {
  Spot.findById(req.params.spotId)
    .then(spot => res.json(spot))
    .catch(err =>
      res.status(404).json({ nospotfound: 'No spot found with that ID' })
    );
});

module.exports = router;