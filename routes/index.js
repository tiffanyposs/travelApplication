var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");


var Trip = require('../models/Trip.js');
var User = require('../models/User.js');


/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session)
  if(req.session.valid_user === true){
    res.render('index');
  }else{
  	res.render('splash')
  }
});

router.get('/login', function(req, res){
	res.render('login')
})


router.get('/chat', function(req, res){
	res.render('chat')
})





// POST users/signup
// only lets one email to sign up
router.post('/invite/:trip_id/signup', function(req, res){
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

		    var makeTrip = function(){
			    var user = {
			        user_id: req.session.user_id
			    }
			    console.log(user)
				Trip.findByIdAndUpdate(
				    req.params.trip_id,
				    {$push: {"attending": user}},
				    function(err, trips) {
				    }
				);
			}

			var trip = {
				trip_id: req.params.trip_id
			}

			User.findByIdAndUpdate(
			    req.session.user_id,
			    {$push: {"trips": trip}},
			    function(err, trips) {
			    	makeTrip();
			    }
			);
          
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
router.post('/invite/:trip_id/session', function(req, res){
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

	    var makeTrip = function(){
	    var user = {
	        user_id: req.session.user_id
	    }

		Trip.findByIdAndUpdate(
		    req.params.trip_id,
		    {$push: {"attending": user}},
		    function(err, trips) {
		    }
		);

		}//end makeTrip

		var trip = {
			trip_id: req.params.trip_id
		}

		User.findByIdAndUpdate(
		    req.session.user_id,
		    {$push: {"trips": trip}},
		    function(err, trips) {
		    	makeTrip();
		    }
		);
      	res.redirect('/')
  		}//end addTrips

  		if(user.trips.length === 0){
  			addTrips()
  		}else{
  			var trip_exists = false;
  			user.trips.forEach(function(each, index){
  				if(each.trip_id == req.params.trip_id){
  					console.log('found it!');
  					trip_exists = true;
  				}
  				if(index === user.trips.length - 1){
  					if(trip_exists === false){
  						console.log('adding trip')
  						addTrips();
  					}else{
  						console.log('not adding trip')
  						res.redirect('/')
  					}
  				}
  			})
  		}
    }else{
    	// console.log('else')
      res.redirect('/login')
    }
  })
})




//this is for people to invite people to their site
// /invite/:trip_id/:user_id
router.get('/invite/:trip_id/:user_id', function(req, res, next) {
  var the_trip = Trip.findById(req.params.trip_id).select('trip');
  var the_user = User.findById(req.params.user_id).select('first_name last_name');
  the_user.exec(function(err, user){
  	if (err) return handleError(err);
	  the_trip.exec(function(err, trip){
	  	if (err) return handleError(err);
	  	res.render('invite', {trip: trip, user: user})
	  })
  })
});

module.exports = router;
