var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Trip = require('../models/Trip.js');
var User = require('../models/User.js');
var Category = require('../models/Category.js')


//this makes the default categories
var makeCategories = function(trip_id){
  var defaults = ["Food", "Lodging", "Activities", "Nightlife"]

  defaults.forEach(function(each){
    var content = {
      name: each,
      trip_id: trip_id
    }

    Category.create(content, function(err, category) {
      if (err) return next(err);
      console.log('itworked!')
    })
  })
}


/* POST /trips */
// this creates a new trip with the user's id
router.post('/', function(req, res, next) {
  req.body.created_by = req.session.user_id;
  console.log(req.body);
  Trip.create(req.body, function (err, trips) {
    if (err) return next(err);
    res.json(trips)
    makeCategories(trips._id)
  });

});

// GET /trips 
// gets all the trips from current user
//need to add the ability to get the trips they are attending too
router.get('/', function(req, res, next) {
  var query = Trip.find({'created_by': req.session.user_id}).populate('attending.user_id');
  query.exec(function (err, trips) {
    if (err) return handleError(err);
      res.json(trips)
  })
});

//gets the last trip a user posted
router.get('/last', function(req,res, next){
  var query = Trip.find({'created_by': req.session.user_id}).sort({'created': 'desc'}).limit(1);
  query.exec(function( err, trips){
    if (err) return handleError(err);
    res.json(trips)
  })
})

/* PUT /trips/addfriend/trip_id */
router.put('/addfriend/:trip_id', function(req, res, next) {
  console.log(req.body)
  Trip.findByIdAndUpdate(
    req.params.trip_id,
    {$addToSet: {"attending": req.body}},
    function(err, trips) {
        console.log(err);
    }
);
});

//gets the last trip a user posted
router.get('/avatar/:trip_id/:user_id', function(req, res, next){
  var query = Trip.findById( req.params.trip_id);
  query.exec(function( err, trips){
    if (err) return handleError(err);
    res.json(trips)
  })
})

/* PUT /trips/addfriend/trip_id */
router.put('/avatar/:trip_id/:user_id/push', function(req, res, next) {
  console.log(req.body)
  // req.body.user_id = req.params.user_id;
  console.log(req.body)
  Trip.findByIdAndUpdate(
    req.params.trip_id,
    {$push: {"taken_avatars": req.body}},
    {upsert: true},
    function(err, trips) {
      console.log("Trip Push!")
      console.log(err)
    })
});

/* PUT /trips/addfriend/trip_id */
router.put('/avatar/:trip_id/:user_id/set', function(req, res, next) {
  console.log('enter avatar')
  req.body.user_id = req.params.user_id;
  console.log(req.body)
  Trip.update(
    {_id: req.params.trip_id, 'taken_avatars.user_id': req.params.user_id},
    {$set: {'taken_avatars.$.avatar': req.body.avatar}},
    function(err, trips) {
      console.log("Trip Set!")
      res.json(trips)
    })

});

// GET /trips/:id
router.get('/:id', function(req, res, next){
  var query = Trip.findById( req.params.id );
  query.exec(function (err, trip) {
  if (err) return handleError(err);
    res.json(trip)
})
})

// /* DELETE /todos/:id */
// router.delete('/:id', function(req, res, next) {
//   Todo.findByIdAndRemove(req.params.id, req.body, function (err, categories) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;
