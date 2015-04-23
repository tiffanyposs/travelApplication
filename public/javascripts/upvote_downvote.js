$('#upvote').click(function(){
	var user = {
		user_id: current_user
	}

	var vote_amount = 0;

	var makePutReqest = function(){
	$('#comment_suggestion_upvote').text(vote_amount+1);
	// $('.suggestion_upvote_count').text(vote_amount+1)
	$('#' + current_suggestion).find('.suggestion_upvote_count').text(vote_amount+1);

	$.ajax({
	        url: current_url + "suggestions/" + current_suggestion + '/upvote',
	        type: 'PUT',
	        data: user,
	        success: function(data){
	        	console.log("Put Worked!")

	        }
	});		
	}

	// var exists = false;
	// var userExists = function(data){
	// vote_amount = data.upvote.length;
	// data.upvote.forEach(function(each){
	// 	if(each.user_id === current_user){
	// 		// console.log('same')
	// 		exists = true;
	// 	}
	// })
	// 	if(exists === false){
	// 		makePutReqest()
	// 	}
	// }
	var array = []
	var userExists = function(data){
	vote_amount = data.upvote.length;
	data.upvote.forEach(function(each){
		array.push(each.user_id);
		console.log(array)
	})
	data.downvote.forEach(function(each){
		array.push(each.user_id);
		console.log(array)
	})
	if(array.indexOf(current_user) === -1){
		makePutReqest()
	}
	}


	var getTripVotes = function(){
	    $.ajax({
	    url: current_url + 'suggestions/' + current_suggestion + '/votes',
	    dataType: 'json',
	    success: function(data){
	        console.log(data);
	        // userTripInfo(data)
	        userExists(data)
	    }
	});
}

getTripVotes()


})




$('#downvote').click(function(){
	var user = {
		user_id: current_user
	}
	var vote_amount = 0;

	var makePutReqest = function(){
		$('#comment_suggestion_downvote').text(vote_amount+1)
		$('#' + current_suggestion).find('.suggestion_downvote_count').text(vote_amount+1);

		$.ajax({
		        url: current_url + "suggestions/" + current_suggestion + '/downvote',
		        type: 'PUT',
		        data: user,
		        success: function(data){
		        	console.log("Put Worked!")

		        }
		});		
	}

	// var exists = false;
	// var userExists = function(data){
	// 	vote_amount = data.downvote.length;
	// 	// console.log(vote_amount)
	// 	data.downvote.forEach(function(each){
	// 		// console.log(each)
	// 		if(each.user_id === current_user){
	// 			console.log('same')
	// 			exists = true;
	// 		}
	// 	})
	// 	if(exists === false){
	// 		makePutReqest()
	// 	}
	// }

	var array = []
	var userExists = function(data){
	vote_amount = data.downvote.length;
	data.downvote.forEach(function(each){
		array.push(each.user_id);
		console.log(array)
	});
	data.upvote.forEach(function(each){
		array.push(each.user_id);
		console.log(array)
	});
	if(array.indexOf(current_user) === -1){
		makePutReqest()
	}
	}

	var getTripVotes = function(){
	    $.ajax({
	    url: current_url + 'suggestions/' + current_suggestion + '/votes',
	    dataType: 'json',
	    success: function(data){
	        // console.log(data);
	        // userTripInfo(data)
	        userExists(data)
	    }
		});
	}

getTripVotes()


})




