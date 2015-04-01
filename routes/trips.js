var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Trip = require('../models/Trip.js');


/* GET /tripss listing. */
router.get('/', function(req, res, next) {
  Trip.find(function (err, trips) {
    if (err) return next(err);
    res.json(trips);
  });
});

/* POST /trips */
router.post('/', function(req, res, next) {
  Trip.create(req.body, function (err, trips) {
    if (err) return next(err);
    res.json(trips);
  });
});

// /* GET /trips/id */
// router.get('/:id', function(req, res, next) {
//   Trip.findById(req.params.id, function (err, trips) {
//     if (err) return next(err);
//     res.json(trips);
//   }).populate('users');
// });



// router.get('/:title', function(req, res, next){
//   var query = Trip.find( {'title': req.params.title} ).populate('created_by');
//   query.select('created_by location title');
//   query.exec(function (err, trip) {
//   if (err) return handleError(err);
//     res.json(trip)
// })
// })


router.get('/:id', function(req, res, next){
  // var query = Trip.findById( req.params.id ).populate('created_by attending', 'first_name');
  var query = Trip.findById( req.params.id ).populate('created_by attending');

  // query.select('created_by location title');
  query.exec(function (err, trip) {
  if (err) return handleError(err);
    res.json(trip)
})
})

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
