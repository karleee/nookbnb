const express = require('express');
const router = express.Router();
const Spot = require('../../models/Spot');

router.get('/', (req, res) => {
  Spot.find()
    .sort({ date: -1 })
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