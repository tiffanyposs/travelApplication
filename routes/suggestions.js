var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Suggestion = require('../models/Suggestion.js');


/* GET /suggestions listing. */
router.get('/', function(req, res, next) {
  Suggestion.find(function (err, suggestions) {
    if (err) return next(err);
    res.json(suggestions);
  });
});

/* POST /suggestions */
router.post('/', function(req, res, next) {
  Suggestion.create(req.body, function (err, suggestions) {
    if (err) return next(err);
    res.json(suggestions);
  });
});

// GET /suggestions/:category_id
router.get('/:category_id', function(req, res, next) {
  var query = Suggestion.find({'category_id' : req.params.category_id}).populate('user_id', 'first_name last_name username');
  query.exec(function(err, suggestions){
    if (err) return handleError(err);
    res.json(suggestions)
  })
});

// /* GET /categories/id */
// router.get('/:id', function(req, res, next) {
//   Suggestion.findById(req.params.id, function (err, suggestions) {
//     if (err) return next(err);
//     res.json(suggestions);
//   });
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
