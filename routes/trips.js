var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Trip = require('../models/Trip.js');
var User = require('../models/User.js');


/* GET /tripss listing. */
// router.get('/all', function(req, res, next) {
//   Trip.find(function (err, trips) {
//     if (err) return next(err);
//     res.json(trips);
//   });
// });

// GET /trips from user
// router.get('/', function(req, res, next) {
//   Trip.find(function (err, trips) {
//     if (err) return next(err);
//     res.json(trips);
//   });
// });

/* POST /trips */
// this creates a new trip with the user's id
router.post('/', function(req, res, next) {
  req.body.created_by = req.session.user_id;
  console.log(req.body);
  Trip.create(req.body, function (err, trips) {
    if (err) return next(err);
    res.redirect('/')
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
    {$push: {"attending": req.body}},
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




// the avatar will push and update the first one but it won't add the second person

/* PUT /trips/addfriend/trip_id */
router.put('/avatar/:trip_id/:user_id/push', function(req, res, next) {
  console.log(req.body)
  // req.body.user_id = req.params.user_id;
  console.log(req.body)
  Trip.findByIdAndUpdate(
    req.params.trip_id,
    {$push: {"taken_avatars": req.body}},
    {safe: true, upsert: true},
    function(err, trips) {
      console.log("Trip Push!")
      console.log(err)
    })


});



/* PUT /trips/addfriend/trip_id */
router.put('/avatar/:trip_id/:user_id/set', function(req, res, next) {

  // req.body.user_id = req.params.user_id;
  console.log(req.body)
  Trip.update(
    {_id: req.params.trip_id, 'taken_avatars.user_id': req.params.user_id},
    // {"taken_avatars": {$elemMatch: {"user_id": req.params.user_id}}}, {$set: {"taken_avatars.$.avatar": req.body }},
    {$set: {"taken_avatars.$.avatar": req.body.avatar}},
    function(err, trips) {
      console.log("Trip Set!")
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


// router.get('/:title', function(req, res, next){
//   var query = Trip.find( {'title': req.params.title} ).populate('created_by');
//   query.select('created_by location title');
//   query.exec(function (err, trip) {
//   if (err) return handleError(err);
//     res.json(trip)
// })
// })


// /* PUT /todos/:id */
// router.put('/:id', function(req, res, next) {
//   Todo.findByIdAndUpdate(req.params.id, req.body, function (err, categories) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* DELETE /todos/:id */
// router.delete('/:id', function(req, res, next) {
//   Todo.findByIdAndRemove(req.params.id, req.body, function (err, categories) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;
