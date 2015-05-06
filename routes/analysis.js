var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Category = require('../models/Category.js');
var Chat = require('../models/Chat.js');
var Comment = require('../models/Comment.js');
var Suggestion = require('../models/Suggestion.js');
var Trip = require('../models/Trip.js');
var User = require('../models/User.js');
var Session = require('../models/Session.js');

var secretroute = '/supersecret/platinum/platupi';

/* GET /analysis/supersecret/platinum/platupi listing. */
router.get(secretroute, function(req, res) {
	  res.render('analysis');
});

// gets all the users
// GET /analysis/supersecret/platinum/platupi/users/all
router.get(secretroute + '/users/all', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

//gets all the sessions
// /analysis/supersecret/platinum/platupi/sessions
router.get(secretroute + '/sessions', function(req, res) {
  Session.find(function (err, sessions) {
    if (err) return next(err);
    res.json(sessions);
  });
});


// // POST users/session
// router.post('/session', function(req, res){
//   var email = req.body.email;
//   var password = req.body.password;
//   var query = User.findOne({ 'email': email }).select('email _id password');
//   query.exec(function (err, user) {

//     if (err) return handleError(err);
//     if(user){
//       var passwordMatches = bcrypt.compareSync(password, user.password);
//     }if(passwordMatches){
//       req.session.valid_user = true;
//       req.session.user_id = user._id;
//       res.redirect('/')
//     }else{
//       res.redirect('/login')
//     }
//   })
// })






/* GET /analysis listing. */
// router.get('/', function(req, res, next) {
//   Category.find(function (err, categories) {
//     if (err) return next(err);
//     res.json(categories);
//   });
// });

/* POST /categories */
// router.post('/', function(req, res, next) {
//   Category.create(req.body, function (err, categories) {
//     if (err) return next(err);
//     res.json(categories);
//   });
// });

// // /* GET /categories/id */
// // Gets all the categories from a trip
// router.get('/:trip_id', function(req, res, next) {
//   var query = Category.find({'trip_id' : req.params.trip_id});
//   query.exec(function(err, categories){
//     if (err) return handleError(err);
//     res.json(categories)
//   })
// });

// //this posts a category from a certain trip
// router.post('/:trip_id', function(req, res, next){
//   Category.create(req.body, function (err, categories){
//     if (err) return next(err);
//     res.json(categories)
//   })
// })


// router.get('/:trip_id/last', function(req, res, next){
//   var query = Category.find({'trip_id': req.params.trip_id}).sort({'created': 'desc'}).limit(1);
//   query.exec(function( err, categories){
//     if (err) return handleError(err);
//     res.json(categories)
//   })
// })




module.exports = router;
