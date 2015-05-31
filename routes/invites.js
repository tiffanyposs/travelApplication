var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");

var mongoose = require('mongoose');
var Invite = require('../models/Invite.js');

var Trip = require('../models/Trip.js');
var User = require('../models/User.js');


var randomWords = require('random-words')



//  /invites/user_id/trip_id
router.get('/:user_id/:trip_id', function(req, res, next) {
  var query = Invite.find({ $and : [{ user_id : req.params.user_id }, {trip_id : req.params.trip_id}]}).limit(1);
  query.populate('user_id trip_id')
  // query.populate('suggestion_id')
  query.exec(function(err, invites){
    if (err) return handleError(err);
    res.json(invites)
  })
});


/* POST /invites */
router.post('/', function(req, res, next) {
  var domain = randomWords(3).join('-') + '-' + Math.floor((Math.random() * 9999) + 1000);
  console.log(domain)
  var content = req.body;
  content.domain_name = domain;
  Invite.create(content, function (err, invites) {
    if (err) return next(err);
    res.json(invites)
  });
});


// /invites/:domain
router.get('/:domain_name', function(req, res, next) {
  var query = Invite.find({domain_name: req.params.domain_name});
  query.populate('trip_id user_id')
  query.exec(function(err, invite){
    if (err) return handleError(err);
      res.render('invite', {trip: invite, user: invite})
    
  })
});




// user login
// POST invites/:domain_name/session
router.post('/:domain_name/session', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  var query = User.findOne({ 'email': email }).select('email _id password trips');



  query.exec(function (err, user) {
    if (err) return handleError(err);
    if(user){
      var passwordMatches = bcrypt.compareSync(password, user.password);
    }if(passwordMatches){
      req.session.valid_user = true;
      req.session.user_id = user._id;




    var addTrips = function(){


    // var invite;
    console.log('hello ' + req.params.domain_name)
    var tripQuery = Invite.findOne({'domain_name': req.params.domain_name})
    tripQuery.populate('user_id trip_id')

    tripQuery.exec(function (err, invite){
      if (err) return handleError(err);
      
      console.log(invite)
 

     var makeTrip = function(){

       var user = {
           user_id: req.session.user_id
       }

       Trip.findByIdAndUpdate(
           invite.trip_id._id,
           {$push: {"attending": user}},
           function(err, trips) {
           }
       );

     }//end makeTrip

     var trip = {
       trip_id: invite.trip_id
     }

     User.findByIdAndUpdate(
         req.session.user_id,
         {$push: {"trips": trip}},
         function(err, trips) {
           makeTrip();
         }
     );
         res.redirect('/')

      })  
     }

     if(user.trips.length === 0){
       addTrips()
     }else{
       var trip_exists = false;
       user.trips.forEach(function(each, index){
         if(each.trip_id == req.params.trip_id){
           trip_exists = true;
         }
         if(index === user.trips.length - 1){
           if(trip_exists === false){
             addTrips();
           }else{
             res.redirect('/')
           }
         }
       })
     }
    }else{
      res.redirect('/login')
    }

  })//end user query
})





// only lets one email to sign up
// POST invites/signup
router.post('/:domain_name/signup', function(req, res){
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


          // var invite;
          console.log('hello ' + req.params.domain_name)
          var tripQuery = Invite.findOne({'domain_name': req.params.domain_name})
          tripQuery.populate('user_id trip_id')

          tripQuery.exec(function (err, invite){
            if (err) return handleError(err);
            
            console.log(invite)
          

        var makeTrip = function(){
          var user = {
              user_id: req.session.user_id
          }
          console.log(user)
        Trip.findByIdAndUpdate(
            invite.trip_id._id,
            {$push: {"attending": user}},
            function(err, trips) {
            }
        );
      }

      var trip = {
        trip_id: invite.trip_id._id
      }

      User.findByIdAndUpdate(
          req.session.user_id,
          {$push: {"trips": trip}},
          function(err, trips) {
            makeTrip();
          }
      );

          res.redirect('/');
        })

         } 
      });
    }
    else{
      res.redirect('/login')
    }
  })
})




module.exports = router;
