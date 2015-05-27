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

// GET /suggestions/:suggestion_id/one
router.get('/:suggestion_id/one', function(req, res, next) {
  var query = Suggestion.find({'_id' : req.params.suggestion_id}).populate('user_id');
  query.populate('upvote.user_id', 'taken_avatars first_name last_name username');
  query.populate('downvote.user_id', 'taken_avatars first_name last_name username');
  query.exec(function(err, suggestions){
    if (err) return handleError(err);
    res.json(suggestions)
  })
});

// GET /suggestions/:category_id
router.get('/:category_id', function(req, res, next) {
  var query = Suggestion.find({'category_id' : req.params.category_id})
  // where it is not archived
  .where('archived').ne(true)
  query.populate('user_id', 'first_name last_name username taken_avatars');
  query.exec(function(err, suggestions){
    if (err) return handleError(err);
    res.json(suggestions)
  })
});


// GET /suggestions/:category_id/last
router.get('/:category_id/last', function(req, res, next) {
  var query = Suggestion.find({'category_id' : req.params.category_id}).sort({'created': 'desc'}).limit(1);
  query.populate('user_id', 'first_name last_name')
  query.exec(function(err, suggestions){
    if (err) return handleError(err);
    res.json(suggestions)
  })
});


router.get('/:suggestion_id/votes', function(req, res, next){
  var query = Suggestion.findById(req.params.suggestion_id, 'upvote downvote');
  // query.populate('user_id', 'first_name last_name')
  query.exec(function(err, suggestions){
    if (err) return handleError(err);
    res.json(suggestions)
  })
})


/* PUT /suggestions/:suggestion_id/upvote */
router.put('/:suggestion_id/upvote', function(req, res, next) {
  console.log('enter upvote')
  Suggestion.findByIdAndUpdate(
    req.params.suggestion_id,
    {$push: {"upvote": req.body}},
    function(err, suggestion) {
        console.log('upvote success');
    }
);
});


/* PUT /suggestions/:suggestion_id/downvote */
router.put('/:suggestion_id/downvote', function(req, res, next) {
  Suggestion.findByIdAndUpdate(
    req.params.suggestion_id,
    {$push: {"downvote": req.body}},
    function(err, suggestion) {
        res.json(suggestion)
    }
);
});


/* PUT /suggestions/:suggestion_id/downvote */
router.put('/:suggestion_id/update', function(req, res, next) {
  Suggestion.findByIdAndUpdate(
    req.params.suggestion_id,
    {$set: req.body},
    function(err, suggestion) {
        console.log(suggestion);
    }
);
});


/* PUT /suggestions/:suggestion_id/downvote */
router.put('/archive/:suggestion_id', function(req, res, next) {
  Suggestion.findByIdAndUpdate(
    req.params.suggestion_id,
    {$set: req.body},
    function(err, suggestion) {
        console.log(suggestion);
    }
);
});



// router.get('/last', function(req,res, next){
//   var query = Trip.find({'created_by': req.session.user_id}).sort({'created': 'desc'}).limit(1);
//   query.exec(function( err, trips){
//     if (err) return handleError(err);
//     res.json(trips)
//   })
// })

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
