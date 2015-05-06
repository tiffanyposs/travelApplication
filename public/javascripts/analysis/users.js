console.log('users')

//this file requires moment.js

var current_url = document.URL;


// var now = moment('2015-05-04T00:23:29.666Z');
// console.log(now);

var renderUsers = function(data){
	//sets the total amount of accounts
	var newAccountDay = 0;
	var newAccountWeek = 0;
	var newAccountMonth = 0;
	var newAccountThreeMonths = 0;
	var newAccountYear = 0;

	//sets total accounts
	$('#total_accounts').text(data.length)


	data.forEach(function(user, index){
		console.log(user);

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

		console.log(newAccountYear)


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


var allUsers = function(){
    $.ajax({
    url: current_url + '/users/all',
    dataType: 'json',
    success: function(data){
        renderUsers(data)
    }
    });
}

allUsers();



// var weekAgo = moment().subtract(1, 'w');

// console.log(weekAgo)
// $('#new_accounts_week')
// $('#current_sessions')
// $('#total_sessions_week')
// $('#total_sessions_month')
// $('#total_sessions_year')
// $('total_sessions')

$('#new_accounts_day')
$('#new_accounts_week')
$('#new_accounts_month')
$('#new_accounts_three_months')

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
			console.log(parsed)
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
