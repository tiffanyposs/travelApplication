var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");


var mongoose = require('mongoose');
var User = require('../models/User.js');


//get all the categories
/* GET /users listing. */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});


// post a new category
/* POST /users */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});


// /* GET /users/stuff */
router.get('/stuff', function(req, res, next) {
  var query = User.findById(req.session.user_id).populate('trips friends');
  query.select('username first_name last_name friends trips')
  query.exec(function (err, user) {
    if (err) return handleError(err);
      res.json(user);
  })
});

// GET users/findfriends
// gets all the user's trips
router.get('/findfriend/:email', function(req, res, next) {
  var query = User.find({'email': req.params.email});
  query.exec(function (err, user) {
    if (err) return handleError(err);
    res.json(user)
  })
});






// GET users/trips
// gets all the user's trips
router.get('/trips', function(req, res, next) {
  var query = Trip.find({'created_by': req.session.user_id});
  query.exec(function (err, user) {
    if (err) return handleError(err);
      res.redirect('/')
  })
});


// // /* GET /users/id */
// router.get('/:id', function(req, res, next) {
//   User.findById(req.params.id, function (err, users) {
//     if (err) return next(err);
//     res.json(users);
//   });
// });


// POST users/signup
// only lets one email to sign up
router.post('/signup', function(req, res){
  var query = User.find({'email': req.body.email}).select('email _id');
  query.exec(function (err, stuff) {
    if (err){ return handleError(err)}
    else if(stuff.length === 0 && req.body.password === req.body.confirm_password){
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      User.create(req.body, function (err, users) {
        if (err) return next(err);
         else{
          req.session.valid_user = true;
          req.session.user_id = users._id;
          res.redirect('/');
         } 
      });
    }
    else{
      res.redirect('/login')
    }
  })
})//end /user post


// POST users/session
router.post('/session', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  var query = User.findOne({ 'email': email }).select('email _id password');
  query.exec(function (err, user) {

    if (err) return handleError(err);
    if(user){
      var passwordMatches = bcrypt.compareSync(password, user.password);
    }if(passwordMatches){
      req.session.valid_user = true;
      req.session.user_id = user._id;
      res.redirect('/')
    }else{
      res.redirect('/login')
    }
  })
})

// POST users/logout
router.post('/logout', function(req, res){
  req.session.valid_user = false;
  res.redirect('/')
})

// router.get('/:title', function(req, res, next){
//   var query = Trip.find( {'title': req.params.title} ).populate('created_by');
//   query.select('created_by location title');
//   query.exec(function (err, trip) {
//   if (err) return handleError(err);
//     res.json(trip)
// })
// })





// // .findOne finds the first one
// router.get('/signin/:first_name', function(req, res, next){
//   var query = User.findOne({ 'first_name': req.params.first_name });
//   query.select('first_name email');
//   query.exec(function (err, user) {
//   if (err) return handleError(err);
//     res.json(user)
//   console.log('%s is a %s.', user.first_name, user.email) // Space Ghost is a talk show host.
// })
// })

// .find finds all of them
// router.get('/signin/:first_name', function(req, res, next){
//   var query = User.find({ 'first_name': req.params.first_name }).populate('trips');
//   query.select('first_name email trips');
//   query.exec(function (err, user) {
//   if (err) return handleError(err);
//     res.json(user)
// })
// })






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
