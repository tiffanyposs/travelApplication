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

// /* GET /users/id */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});


// POST users/signup
router.post('/signup', function(req, res){
  if(req.body.password === req.body.confirm_password){
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    User.create(req.body, function (err, users) {
      if (err) return next(err);
       else{
        req.session.valid_user = true;
        res.render('secret');
       } 
    });
  }
  else{
    res.redirect('/login')
  }
})//end /user post


// POST users/session
router.post('/session', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  var query = User.findOne({ 'email': email });
  query.exec(function (err, user) {
    if (err) return handleError(err);
    if(user){
      var passwordMatches = bcrypt.compareSync(password, user.password);
    }if(passwordMatches){
      req.session.valid_user = true;
      res.render('secret')
    }else{
      res.redirect('/login')
    }
  })
})

// POST users/logout
router.post('/logout', function(req, res){
  req.session.valid_user = false;
  res.redirect('/login')
})

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
router.get('/signin/:first_name', function(req, res, next){
  var query = User.find({ 'first_name': req.params.first_name }).populate('trips');
  query.select('first_name email trips');
  query.exec(function (err, user) {
  if (err) return handleError(err);
    res.json(user)
})
})






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
