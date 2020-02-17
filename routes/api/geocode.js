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
  
  // return res;
});

module.exports = router;

// router.post("/", (req, res) => {
//   Spot.find()
//     .sort({ date: -1 })
//     .then(spots => res.json(spots))
//     .catch(err => res.status(404).json({ nospotsfound: "No spots found" }));
// });

// client.geocode({ address: this.state.address }, (results, status) => {
//   if (status == 'OK') {
//     this.map.setCenter(results[0].geometry.location);
//   } else {
//     console.log(status);
//   }
// })