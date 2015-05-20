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

// /* GET /comments/suggestion_id */
router.get('/:suggestion_id', function(req, res, next) {
  var query = Comment.find({'suggestion_id' : req.params.suggestion_id});
  query.populate('user_id suggestion_id');
  query.exec(function(err, comments){
    if (err) return handleError(err);
    res.json(comments)
  })
});


// GET /comments/:suggestion_id/last
router.get('/:suggestion_id/last', function(req, res, next) {
  var query = Comment.find({'suggestion_id' : req.params.suggestion_id}).sort({'created': 'desc'}).limit(1);
  query.populate('user_id', 'first_name last_name taken_avatars')
  query.exec(function(err, comments){
    if (err) return handleError(err);
    res.json(comments)
  })
});



router.put('/:comment_id/update', function(req, res, next) {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    {$set: req.body},
    function(err, comment) {
        // console.log(comment);
    }
);
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
