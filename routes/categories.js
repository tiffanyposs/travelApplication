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
router.post('/', function(req, res, next) {
  Category.create(req.body, function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});

// /* GET /categories/id */
router.get('/:id', function(req, res, next) {
  Category.findById(req.params.id, function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});

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
