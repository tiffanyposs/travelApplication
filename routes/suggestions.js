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
    suggestions.update(req.body)
    res.json(suggestions);
  });
});


/* PUT /suggestions/:suggestion_id/upvote */
router.put('/votes/:id', function(req, res, next) {
  Suggestion.findByIdAndUpdate(
    req.params.id,
    {$addToSet: {"votes": req.body}},
    function(err, suggestion) {
        console.log('upvote success');
    }
);
});


/* PUT /suggestions/:suggestion_id/upvote */
router.put('/reference/:id', function(req, res, next) {
  Suggestion.findByIdAndUpdate(
    req.params.id,
    {$addToSet: {"references": req.body}},
    function(err, suggestion) {
        console.log('upvote success');
    }
);
});



/* PUT /suggestions/geocode/:suggestion_id */
router.put('/geocode/:id', function(req, res, next) {
  Suggestion.findByIdAndUpdate(
    req.params.id,
    {$set: {"geocode": req.body}},
    function(err, suggestion) {
        console.log('upvote success');
    }
);
});

// // GET /suggestions/:suggestion_id/one
// router.get('/:suggestion_id/one', function(req, res, next) {
//   var query = Suggestion.find({'_id' : req.params.suggestion_id}).populate('user_id');
//   query.populate('upvote.user_id', 'taken_avatars first_name last_name username');
//   query.populate('downvote.user_id', 'taken_avatars first_name last_name username');
//   query.exec(function(err, suggestions){
//     if (err) return handleError(err);
//     res.json(suggestions)
//   })
// });


//sugestions/trip_id
//gets all the suggestions from a trip
router.get('/:trip_id', function(req, res, next) {
  var query = Suggestion.find({'trip_id' : req.params.trip_id})
  .where('archived').ne(true)
  query.populate('user_id', 'first_name last_name username taken_avatars');
  query.populate('votes.user_id')
  query.exec(function(err, suggestions){
    if (err) return handleError(err);
    res.json(suggestions)
  })
});




//gets all the suggestions from a trip
router.get('/votes/:suggestion_id', function(req, res, next) {
  var query = Suggestion.findById(req.params.suggestion_id)
  // query.populate('user_id', 'first_name last_name username taken_avatars');
  // query.populate('votes.user_id')
  query.exec(function(err, suggestions){
    if (err) return handleError(err);
    res.json(suggestions)
  })
});


/* PUT /suggestions/:suggestion_id/upvote */
router.put('/votes/:suggestion_id', function(req, res, next) {
  Suggestion.findByIdAndUpdate(
    req.params.suggestion_id,
    {$set: {"votes": req.body}},
    function(err, suggestion) {
        console.log('upvote success');
    }
);
});


// GET /suggestions/:category_id/last
router.get('/:trip_id/last', function(req, res, next) {
  var query = Suggestion.find({'trip_id' : req.params.trip_id}).sort({'created': 'desc'}).limit(1);
  query.populate('user_id', 'first_name last_name username taken_avatars')
  query.populate('votes.user_id')
  query.exec(function(err, suggestions){
    if (err) return handleError(err);
    res.json(suggestions)
  })
});

/* PUT /suggestions/:suggestion_id/upvote */
// router.put('/votes/:suggestion_id', function(req, res, next) {
// Suggestion.update( {_id : req.params.suggestion_id, "votes.user_id" : req.body.user_id} , 
//                 {$addToSet : {"$.votes" : req.body} } ,
//                 function(err, suggestion){
//                   res.json(suggestion)
//                 });
// });


// Suggestion.update( {_id : req.params.suggestion_id, "votes.user_id" : req.body.user_id} , 
//                 {$addToSet : {"votes" : req.body} } ,
//                 function(err, suggestion){
//                   res.json(suggestion)
//                 });

 // db.bar.update( {user_id : 123456, "items.item_name" : {$ne : "my_item_two" }} , 
 //                {$addToSet : {"items" : {'item_name' : "my_item_two" , 'price' : 1 }} } ,
 //                false , 
 //                true);


// db.foo.update({"array.value" : 22}, {"$set" : {"array.$.text" : "blah"}})

// // GET /suggestions/:category_id
// //this gets all suggestions that belong to a category that are not archived.
// router.get('/:category_id', function(req, res, next) {
//   var query = Suggestion.find({'category_id' : req.params.category_id})
//   .where('archived').ne(true)
//   query.populate('user_id', 'first_name last_name username taken_avatars');
//   query.exec(function(err, suggestions){
//     if (err) return handleError(err);
//     res.json(suggestions)
//   })
// });

// // GET /suggestions/:category_id/last
// router.get('/:category_id/last', function(req, res, next) {
//   var query = Suggestion.find({'category_id' : req.params.category_id}).sort({'created': 'desc'}).limit(1);
//   query.populate('user_id', 'first_name last_name')
//   query.exec(function(err, suggestions){
//     if (err) return handleError(err);
//     res.json(suggestions)
//   })
// });

// router.get('/:suggestion_id/votes', function(req, res, next){
//   var query = Suggestion.findById(req.params.suggestion_id, 'upvote downvote');
//   // query.populate('user_id', 'first_name last_name')
//   query.exec(function(err, suggestions){
//     if (err) return handleError(err);
//     res.json(suggestions)
//   })
// })

// /* PUT /suggestions/:suggestion_id/upvote */
// router.put('/:suggestion_id/upvote', function(req, res, next) {
//   Suggestion.findByIdAndUpdate(
//     req.params.suggestion_id,
//     {$addToSet: {"upvote": req.body}},
//     function(err, suggestion) {
//         console.log('upvote success');
//     }
// );
// });

// /* PUT /suggestions/:suggestion_id/downvote */
// router.put('/:suggestion_id/downvote', function(req, res, next) {
//   Suggestion.findByIdAndUpdate(
//     req.params.suggestion_id,
//     {$addToSet: {"downvote": req.body}},
//     function(err, suggestion) {
//         res.json(suggestion)
//     }
// );
// });

// /* PUT /suggestions/:suggestion_id/downvote */
// router.put('/:suggestion_id/update', function(req, res, next) {
//   Suggestion.findByIdAndUpdate(
//     req.params.suggestion_id,
//     {$set: req.body},
//     function(err, suggestion) {
//         console.log(suggestion);
//     }
// );
// });

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



/* PUT /suggestions/:suggestion_id/downvote */
router.put('/archive/:suggestion_id/recover', function(req, res, next) {
  Suggestion.findByIdAndUpdate(
    req.params.suggestion,
    {$set: req.body},
    function(err, suggestion) {
        console.log(suggestion);
    }
);
});





// GET /suggestions/:suggestion_id/last
router.get('/archive/:user_id/all', function(req, res, next) {
  var query = Suggestion.find({ $and : [{ user_id : req.params.user_id }, {archived : true}]});
  query.populate('category_id')
  query.exec(function(err, suggestions){
    if (err) return handleError(err);
    res.json(suggestions)
  })
});



// /* DELETE /todos/:id */
// router.delete('/:id', function(req, res, next) {
//   Todo.findByIdAndRemove(req.params.id, req.body, function (err, categories) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;
