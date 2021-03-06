var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var moment = require('moment')


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

router.get('/reset', function(req, res){
  res.render('reset')
})



router.put('/reset', function(req, res, next) {
  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var query = User.find({ email: email, first_name: first_name, last_name: last_name });

  query.exec(function (err, user) {
    console.log(user)
    if (err) return handleError(err);
    if(user && req.body.password === req.body.confirm_password){
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      user.password = req.body.password;
      user.save(function(err){
        if (err) return handleError(err);
          // req.session.valid_user = true;
          // req.session.user_id = user._id;
          // req.session.login_time = moment();
          // res.redirect('/')
          res.json(user)
      })
    }
  })


});



// /* GET /users/stuff */
router.get('/stuff', function(req, res, next) {
  var query = User.findById(req.session.user_id).populate('trips.trip_id friends');
  query.select('username first_name last_name friends trips taken_avatars last_trip')
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

/* PUT /users/addtrip/trip_id */
router.put('/addtrip/:user_id', function(req, res, next) {
  console.log(req.body)
  User.findByIdAndUpdate(
    req.params.user_id,
    {$push: {"trips": req.body}},
    function(err, trips) {
        console.log(err);
    }
);
});

router.get('/:user_id', function(req, res, next) {
  var query = User.findById(req.params.user_id).populate('trips.trip_id friends');
  query.select('username first_name last_name friends trips')
  query.exec(function (err, user) {
    if (err) return handleError(err);
      res.json(user);
  })
});


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
      req.session.login_time = moment();
      res.redirect('/')
    }else{
      res.redirect('/')
    }
  })
})

// POST users/logout
router.post('/logout', function(req, res){
  console.log(req.session)
  req.session.valid_user = false;
  res.redirect('/')
})

//gets the last trip a user posted
router.get('/avatar/:trip_id/:user_id', function(req, res, next){
  var query = User.findById( req.params.user_id);
  query.exec(function( err, users){
    if (err) return handleError(err);
    res.json(users)
  })
})

// SETS AN AVATAR TO A USER THAT DOESNT EXIST
/* PUT users/avatar/:trip_id/:user_id/:update */
router.put('/avatar/:trip_id/:user_id/set', function(req, res, next) {
  console.log(req.body)
  req.body.trip_id = req.params.trip_id;
  User.update(
    {_id: req.params.user_id, 'taken_avatars.trip_id': req.params.trip_id},
    {$set: {'taken_avatars.$.avatar': req.body.avatar}},
    function(err, users) {
      console.log("Also Worked!")
      res.json(users)
    })
});

// PUSHES AN AVATAR TO A USER THAT DOESN'T EXIST
/* PUT users/avatar/:trip_id/:user_id/:update */
router.put('/avatar/:trip_id/:user_id/push', function(req, res, next) {
  console.log(req.body)
  req.body.trip_id = req.params.trip_id;
  User.findByIdAndUpdate(
    req.params.user_id,
    {$push: {'taken_avatars': req.body}},
    {safe: true, upsert: true},
    function(err, users) {
      console.log("Also Worked!")
      res.json(users)
    })
});

//this updates the last clicked trip 
router.put('/settrip/:user_id', function(req, res, next) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) return handleError(err);
    user.last_trip = req.body.last_trip;
    user.save(function (err) {
      if (err) return handleError(err);
      res.send(user);
    });
  });
});









// /* DELETE /todos/:id */
// router.delete('/:id', function(req, res, next) {
//   Todo.findByIdAndRemove(req.params.id, req.body, function (err, categories) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;
