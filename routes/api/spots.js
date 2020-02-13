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

// Route for getting a specific spot
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