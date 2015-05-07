//this file requires moment.js

var current_url = document.URL;

var renderSessions = function(data){

	var newSessionDay = 0;
	var newSessionWeek = 0;
	var newSessionMonth = 0;
	var newSessionThreeMonths = 0;
	var newSessionYear = 0;
	var totalLogins = 0;

	data.forEach(function(session, index){
		// console.log(session.session)
		var parsed = jQuery.parseJSON(session.session);


		// console.log(parsed.cookie)
		var now = moment();
		var dayAgo = moment().subtract(1, 'days');
		var weekAgo = moment().subtract(1, 'weeks');
		var monthAgo = moment().subtract(1, 'months');
		var threeMonthsAgo = moment().subtract(3, 'months');
		var yearAgo = moment().subtract(1, 'years');
		if(parsed.valid_user){
			totalLogins+=1
			if(parsed.login_time){
				if(moment(parsed.login_time).isBetween(dayAgo, now) === true){
					newSessionDay+=1
				}if(moment(parsed.login_time).isBetween(weekAgo, now) === true){
					newSessionWeek+=1
				}if(moment(parsed.login_time).isBetween(monthAgo, now) === true){
					newSessionMonth+=1
				}if(moment(parsed.login_time).isBetween(threeMonthsAgo, now) === true){
					newSessionThreeMonths+=1
				}if(moment(parsed.login_time).isBetween(yearAgo, now) === true){
					newSessionYear+=1
				}
			}

		}
		if(data.length - 1 === index){
			$('#total_logins').text(totalLogins)
			$('#day_logins').text(newSessionDay)
			$('#week_logins').text(newSessionWeek)
			$('#month_logins').text(newSessionMonth)
			$('#three_month_logins').text(newSessionThreeMonths)
			$('#year_logins').text(newSessionYear)
		}

	})
   
}


var allSessions = function(){
    $.ajax({
    url: 'http://localhost:3000' + '/analysis/supersecret/platinum/platupi/sessions',
    dataType: 'json',
    success: function(data){
        renderSessions(data);
    }
    });	
}

allSessions();
//end session







// var now = moment('2015-05-04T00:23:29.666Z');
// console.log(now);

var loginUsers = function(data){
	//sets the total amount of accounts
	var newAccountDay = 0;
	var newAccountWeek = 0;
	var newAccountMonth = 0;
	var newAccountThreeMonths = 0;
	var newAccountYear = 0;

	//sets total accounts
	$('#total_accounts').text(data.length)


	data.forEach(function(user, index){

		var row = $('<tr></tr>');
		$('#user_table table').append(row);

		var now = moment();
		var dayAgo = moment().subtract(1, 'days');
		var weekAgo = moment().subtract(1, 'weeks');
		var monthAgo = moment().subtract(1, 'months');
		var threeMonthsAgo = moment().subtract(3, 'months');
		var yearAgo = moment().subtract(1, 'years');

		if(moment(user.created).isBetween(dayAgo, now) === true){
			newAccountDay+=1
		}if(moment(user.created).isBetween(weekAgo, now) === true){
			newAccountWeek+=1
		}if(moment(user.created).isBetween(monthAgo, now) === true){
			newAccountMonth+=1
		}if(moment(user.created).isBetween(threeMonthsAgo, now) === true){
			newAccountThreeMonths+=1
		}if(moment(user.created).isBetween(yearAgo, now) === true){
			newAccountYear+=1
		}

		var date_stuff = moment(user.created)
		var final_date = date_stuff._d.toString().split(' ');
		var final_day = final_date.splice(0, 4).join(' ');
		var final_time = final_date.splice(0, 3).join(' ');

		var name = $('<td></td>').text(user.first_name + ' ' + user.last_name);
		var date = $('<td></td>').text(final_day);
		var time = $('<td></td>').text(final_time);
		row.append(name, date, time)


		if(data.length - 1 === index){
			$('#new_accounts_day').text(newAccountDay);
			$('#new_accounts_week').text(newAccountWeek);
			$('#new_accounts_month').text(newAccountMonth);
			$('#new_accounts_three_months').text(newAccountThreeMonths);
			$('#new_accounts_three_months').text(newAccountThreeMonths);
			$('#new_accounts_year').text(newAccountYear);
		}
	})
}



var siteStats = {}

//called from renderUsers
var renderContent = function(){
	console.log(siteStats)

	var total_users = siteStats.users.total_users;
	var total_trips = siteStats.trips.total_trips;
	var total_categories = siteStats.categories.total_categories;
	var total_suggestions = siteStats.suggestions.total_suggestions;
	var total_comments = siteStats.comments.total_comments;

	var friends_per_trip = siteStats.trips.friends_per_trip;
	var trips_per_user = siteStats.users.trips_per_user;

	var categories_per_trip = total_categories / total_trips;
	var suggestions_per_trip = total_suggestions / total_trips;
	var suggestions_per_category = total_suggestions / total_categories;
	var suggestions_per_user = total_suggestions / total_users;
	var comments_per_suggestion = total_comments / total_suggestions;
	var comments_per_category = total_comments / total_categories;
	var comments_per_trip = total_comments / total_trips;

	var total_entries_trip = total_categories + total_suggestions + total_comments / friends_per_trip;


	var total_votes = siteStats.suggestions.total_votes;
	var votes_per_suggestion = siteStats.suggestions.total_votes / total_suggestions;
	var suggestion_votes_to_friends_ratio = votes_per_suggestion.toFixed(2) + " : " + friends_per_trip.toFixed(2);
	var suggestion_votes_to_friends_percentage = (votes_per_suggestion / friends_per_trip * 100).toFixed() + "%"


	var totals = ["Total Users", total_users, 
	"Total Trips",  total_trips, 
	"Total Categories", total_categories, 
	"Total Suggestions", total_suggestions, 
	"Total Comments", total_comments,
	"Total Votes", total_votes,
	"Friends Per Trip (Average)", friends_per_trip,
	"Trips Per User (Average)", trips_per_user,
	"Categories per Trip (Average)", categories_per_trip,
	"Suggestions per Trip (Average)", suggestions_per_trip,
	"Suggestions per Category (Average)", suggestions_per_category,
	"Suggestions per User (Average)", suggestions_per_user,
	"Comments per Suggestion (Average)", comments_per_suggestion,
	"Comments per Category (Average)", comments_per_category,
	"Comments per Trip (Average)", comments_per_trip,
	"Votes Per Suggestion (Average)", votes_per_suggestion,
	"Votes Per Suggestion : Friends on Trip (Average)", suggestion_votes_to_friends_ratio,
	"Percentage to Vote on a Suggestion", suggestion_votes_to_friends_percentage,
	"Total Friend Inputs per Trip (excluding chat & voting, Average)", total_entries_trip];
	// var formatted_totals = [];

	for(var i = 0; i < totals.length; i+=2){
		var row = $('<tr></tr>');

		if(typeof totals[i + 1] === 'number'){
			var answer = totals[i + 1].toFixed(2);
		}else{
			var answer = totals[i + 1];
		}
		var title = $('<td></td>').text(totals[i])
		var data = $('<td></td>').text(answer);

		row.append(title, data);

		$('#totals_table').append(row);
	}


}





var renderUsers = function(users){

	siteStats.users = {}
	siteStats.users.total_users = users.length;

	user_trips_total = 0;

	users.forEach(function(user, index){

		user_trips_total += user.trips.length;
		if(users.length - 1 === index){
			//do stuff
			siteStats.users.trips_per_user = user_trips_total / users.length;

			renderContent();

		}
	})

}

//called at the end of comments
var allUsers = function(){
    $.ajax({
    url: current_url + '/users',
    dataType: 'json',
    success: function(data){
        loginUsers(data)
        renderUsers(data)
    }
    });
}





var renderComments = function(comments){

	siteStats.comments = {}
	siteStats.comments.total_comments = comments.length

	allUsers();
}



var allComments = function(){
    $.ajax({
    url: 'http://localhost:3000' + '/analysis/supersecret/platinum/platupi/comments',
    dataType: 'json',
    success: function(data){
        renderComments(data);
    }
    });	
}



var renderSuggestions = function(suggestions){
	siteStats.suggestions = {}
	siteStats.suggestions.total_suggestions = suggestions.length;

	var total_votes = 0;

	suggestions.forEach(function(suggestion, index){
		total_votes += suggestion.upvote.length;
		total_votes += suggestion.downvote.length;
		if(suggestions.length - 1 === index){
			siteStats.suggestions.total_votes = total_votes;
		}
	})

	allComments();

}



//called at the end of renderCategories
var allSuggestions = function(){
    $.ajax({
    url: 'http://localhost:3000' + '/analysis/supersecret/platinum/platupi/suggestions',
    dataType: 'json',
    success: function(data){
        renderSuggestions(data);
    }
    });	
}




// START CATEGORIES
var renderCategories = function(categories){
	siteStats.categories = {}

	//total number of categories
	siteStats.categories.total_categories = categories.length;

	var category_names = [];

	categories.forEach(function(category, index){
		category_names.push(category.name)

		if(categories.length - 1 === index){

			// array of category names
			siteStats.categories.category_names = category_names;
			allSuggestions();
		}


	})

}


//called at the end of renderTrips
var allCategories = function(){
    $.ajax({
    url: 'http://localhost:3000' + '/analysis/supersecret/platinum/platupi/categories',
    dataType: 'json',
    success: function(data){
        renderCategories(data);
    }
    });	
}









// BELOW HERE FOR RENDERING ON THE PAGE

var renderTrips = function(trips){

	siteStats.trips = {}

	//sets the trip length
	siteStats.trips.total_trips = trips.length;

	var total_attending = 0;

	var trip_locations = []

	trips.forEach(function(trip, index){

		// number of people attending per trip
		// console.log('Trips Attending: ' + trip.attending.length);
		total_attending += trip.attending.length;


		trip_locations.push(trip.location)

		if(trips.length - 1 === index){
			//do stuff

			//average number of friends per trip
			var friends_per_trip = total_attending / trips.length;
			siteStats.trips.friends_per_trip = friends_per_trip;
			

			// this is a string of all the trip locations input by users
			siteStats.trips.trip_locations = trip_locations;

			allCategories();

		}
	})

}


var allTrips = function(){
    $.ajax({
    url: 'http://localhost:3000' + '/analysis/supersecret/platinum/platupi/trips',
    dataType: 'json',
    success: function(data){
        renderTrips(data);
    }
    });	
}

allTrips();



