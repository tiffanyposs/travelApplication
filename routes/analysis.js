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



var fileName = "../secrets/adminsecret.json";
var secret;


try {
  secret = require(fileName)
}
catch (err) {
  secret = {}
}


/* GET /analysis/supersecret/platinum/platupi listing. */
router.get(secretroute, function(req, res) {
	if(req.session.admin_user === true){
		res.render('analysis');
	}else{
		res.render('analysis_login')
	}
	  
});



// POST users/session
router.post(secretroute + '/session', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
    if(username === secret.adminUsername && password === secret.adminPassword){
      var passwordMatches = true;
    }if(passwordMatches === true){
      req.session.admin_user = true;
		res.redirect('/analysis' + secretroute)
    }else{
    	res.redirect('/analysis' + secretroute);
    }
})

router.post( secretroute + '/logout', function(req, res){
  req.session.admin_user = false;
  res.redirect('/analysis' + secretroute)
})



// gets all the users
// GET /analysis/supersecret/platinum/platupi/users/all
router.get(secretroute + '/users', function(req, res, next) {
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


// trips
router.get(secretroute + '/trips', function(req, res) {
  Trip.find(function (err, trips) {
    if (err) return next(err);
    res.json(trips);
  });
});



// categories
router.get(secretroute + '/categories', function(req, res) {
  Category.find(function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});


// suggestions
// router.get(secretroute + '/suggestions', function(req, res) {
//   Suggestion.find(function (err, suggestions) {
//     if (err) return next(err);
//     res.json(suggestions);
//   });
// });


router.get(secretroute + '/suggestions', function(req, res, next) {
  var query = Suggestion.find().populate('category_id user_id');
  query.exec(function (err, suggestions) {
    if (err) return handleError(err);
      res.json(suggestions);
  })
});

// comments
router.get(secretroute + '/comments', function(req, res) {
  Comment.find(function (err, comments) {
    if (err) return next(err);
    res.json(comments);
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
