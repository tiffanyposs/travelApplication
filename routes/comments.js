var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/Comment.js');


/* GET /comments listing. */
router.get('/', function(req, res, next) {
  Comment.find(function (err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

/* POST /comments */
router.post('/', function(req, res, next) {
  Comment.create(req.body, function (err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

// /* GET /comments/id */
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function (err, comments) {
    if (err) return next(err);
    res.json(comments);
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
