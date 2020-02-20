const express = require("express");
const router = express.Router();
const Client = require("@googlemaps/google-maps-services-js").Client;
const mapsAPIKey = require('../../config/keys').mapsAPIKey;

const client = new Client({});

router.post('/', (req, res) => {
  client
    .geocode({ params: { address: req.body.address, key: mapsAPIKey } })
    .then(response => {
        location = response.data.results[0].geometry.location
        res.json(location);
    })
    .catch(err => {
      res.status(422).json({ invalid: err });
    })
});

module.exports = router;