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

	        }
	});		
	}


	
	var userExists = function(data){
	var array = []
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


	// var userExists = function(data){
	// var array = [];
	// vote_amount = data.upvote.length;

	// 	var downvote = function(){
	// 		if(data.downvote.length > 0){
	// 			data.downvote.forEach(function(each, index){
	// 				array.push(each.user_id);
	// 				if(index === data.upvote.length - 1 || data.upvote.length === 0){
	// 					if(array.indexOf(current_user) === -1){
	// 						makePutReqest()
	// 					}
	// 				}
	// 			})
	// 		}else{
	// 			if(array.indexOf(current_user) === -1){
	// 				makePutReqest()
	// 			}
	// 		}
	// 	}

	// 	if(data.upvote.length > 0){
	// 	data.upvote.forEach(function(each, index){
	// 		array.push(each.user_id);
	// 		console.log(array)
	// 		if(index === data.upvote.length - 1 || data.upvote.length === 0){
	// 			downvote();
	// 		}
	// 	})
	// 	}else{
	// 		downvote();
	// 	}

	// }


	var getTripVotes = function(){
	    $.ajax({
	    url: current_url + 'suggestions/' + current_suggestion + '/votes',
	    dataType: 'json',
	    success: function(data){
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
		// $('#comment_suggestion_upvote').text()
		$.ajax({
		        url: current_url + "suggestions/" + current_suggestion + '/downvote',
		        type: 'PUT',
		        data: user,
		        success: function(data){
		        }
		});		
	}


	
	var userExists = function(data){
	var array = []
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



	// var userExists = function(data){
	// var array = [];
	// vote_amount = data.upvote.length;

	// 	var downvote = function(){
	// 		if(data.downvote.length > 0){
	// 			data.downvote.forEach(function(each, index){
	// 				array.push(each.user_id);
	// 				if(index === data.upvote.length - 1 || data.upvote.length === 0){
	// 					if(array.indexOf(current_user) === -1){
	// 						makePutReqest()
	// 					}
	// 				}
	// 			})
	// 		}else{
	// 			if(array.indexOf(current_user) === -1){
	// 				makePutReqest()
	// 			}
	// 		}
	// 	}

	// 	if(data.upvote.length > 0){
	// 	data.upvote.forEach(function(each, index){
	// 		array.push(each.user_id);
	// 		if(index === data.upvote.length - 1 || data.upvote.length === 0){
	// 			downvote();
	// 		}
	// 	})
	// 	}else{
	// 		downvote();
	// 	}

	// }



	var getTripVotes = function(){
	    $.ajax({
	    url: current_url + 'suggestions/' + current_suggestion + '/votes',
	    dataType: 'json',
	    success: function(data){
	        userExists(data)
	    }
		});
	}

getTripVotes()


})




