var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var request = require('request')

var Map = require('../models/Map.js');


var fileName = "../secrets/apikeys.json";
var key;

try {
  key = require(fileName)
}
catch (err) {
  key = {}
}



// /maps/find_geocode
router.post('/find_geocode', function(req, res){
    // var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=Toledo&key=' + config.google_places;
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.location + '&key=' + key.google_places;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body)
      }
        res.send(data);
    })
})



module.exports = router;