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


//maps/food
router.post('/food' ,function(req, res){
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + req.body.lat +',' + req.body.lng + '&radius=5000&types=restaurant&minprice=2&key=' + key.google_places;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body)
      }
        res.send(data);
    })
})

//maps/lodging
router.post('/lodging' ,function(req, res){
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + req.body.lat +',' + req.body.lng + '&radius=5000&types=lodging&key=' + key.google_places;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body)
      }
        res.send(data);
    })
})

//maps/lodging
router.post('/nightlife' ,function(req, res){
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + req.body.lat +',' + req.body.lng + '&radius=5000&types=night_club&key=' + key.google_places;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body)
      }
        res.send(data);
    })
})

//maps/culture
router.post('/culture' ,function(req, res){
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + req.body.lat +',' + req.body.lng + '&radius=5000&types=museum|art_gallery&key=' + key.google_places;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body)
      }
        res.send(data);
    })
})

//maps/parks
router.post('/parks' ,function(req, res){
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + req.body.lat +',' + req.body.lng + '&radius=5000&types=park&key=' + key.google_places;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body)
      }
        res.send(data);
    })
})

//maps/shopping
router.post('/shopping' ,function(req, res){
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + req.body.lat +',' + req.body.lng + '&radius=5000&types=clothing_store|department_store|shoe_store&key=' + key.google_places;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body)
      }
        res.send(data);
    })
})




module.exports = router;