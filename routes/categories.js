var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../models/Category.js');


/* GET /categories listing. */
router.get('/', function(req, res, next) {
  Category.find(function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});

/* POST /categories */
// router.post('/', function(req, res, next) {
//   Category.create(req.body, function (err, categories) {
//     if (err) return next(err);
//     res.json(categories);
//   });
// });

// /* GET /categories/id */
// Gets all the categories from a trip
router.get('/:trip_id', function(req, res, next) {
  var query = Category.find({'trip_id' : req.params.trip_id});
  query.exec(function(err, categories){
    if (err) return handleError(err);
    res.json(categories)
  })
});

//this posts a category from a certain trip
router.post('/:trip_id', function(req, res, next){
  Category.create(req.body, function (err, categories){
    if (err) return next(err);
    res.json(categories)
  })
})


router.get('/:trip_id/last', function(req, res, next){
  var query = Category.find({'trip_id': req.params.trip_id}).sort({'created': 'desc'}).limit(1);
  query.exec(function( err, categories){
    if (err) return handleError(err);
    res.json(categories)
  })
})



// router.get('/last', function(req,res, next){
//   var query = Trip.find({'created_by': req.session.user_id}).sort({'created': 'desc'}).limit(1);
//   query.exec(function( err, trips){
//     if (err) return handleError(err);
//     res.json(trips)
//   })
// })


// router.get('/', function(req, res, next) {
//   var query = Trip.find({'created_by': req.session.user_id});
//   query.exec(function (err, trips) {
//     if (err) return handleError(err);
//       res.json(trips)
//   })
// });

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
