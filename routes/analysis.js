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
var Beta = require('../models/Beta.js');
var Note = require('../models/Note.js')

var secretroute = '/supersecret/platinum/platupi';



var fileName = "../secrets/adminsecret.json";
var secret;


try {
  secret = require(fileName)
}
catch (err) {
  secret = {}
}


// Renders main analytics page
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
      req.session.secret
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

router.get(secretroute + '/trips', function(req, res) {
  Trip.find(function (err, trips) {
    if (err) return next(err);
    res.json(trips);
  });
});

router.get(secretroute + '/categories', function(req, res) {
  Category.find(function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});

router.get(secretroute + '/suggestions', function(req, res, next) {
  var query = Suggestion.find().populate('category_id user_id');
  query.exec(function (err, suggestions) {
    if (err) return handleError(err);
      res.json(suggestions);
  })
});

router.get(secretroute + '/comments', function(req, res) {
  Comment.find(function (err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

router.get(secretroute + '/betas', function(req, res) {
  Beta.find(function (err, betas) {
    if (err) return next(err);
    res.json(betas);
  });
});

router.get(secretroute + '/notes', function(req, res) {
  Note.find(function (err, notes) {
    if (err) return next(err);
    res.json(notes);
  });
});

module.exports = router;
