
// var upvote_clicks = []

// $('#upvote').click(function(){

// 	var user = {
// 		user_id: current_user
// 	}

// 	var vote_amount = 0;

// 	var makePutReqest = function(){
// 	$('#comment_suggestion_upvote').text(vote_amount+1);

// 	var image = $('<img>');
// 	image.attr('src', current_avatar);
// 	image.attr('class', 'current_user_avatar').attr('class', 'current_user_avatar')
// 	$('#upvote_images').append(image)

// 	// $('.suggestion_upvote_count').text(vote_amount+1)
// 	$('#' + current_suggestion).find('.suggestion_upvote_count').text(vote_amount+1);

// 	$.ajax({
// 	        url: current_url + "suggestions/" + current_suggestion + '/upvote',
// 	        type: 'PUT',
// 	        data: user,
// 	        success: function(data){

// 	        }
// 	});		
// 	}

// 	var userExists = function(data){
// 		// console.log('userexists')
// 	var array = []
// 	vote_amount = data.upvote.length;

// 		if(data.upvote.length === 0 && data.downvote.length === 0){
// 			makePutReqest()
// 			console.log('if')
// 		}else{
// 			console.log('else')
// 			var downvote = function(){
// 				data.downvote.forEach(function(each, index){
// 					array.push(each.user_id);
// 					console.log(array)		
// 					if(index === data.upvote.length - 1 && array.indexOf(current_user) === -1){
// 						makePutReqest()
// 						console.log('make put request')
// 					}
// 				})
// 			}

// 			data.upvote.forEach(function(each, index){
// 				array.push(each.user_id);
// 				console.log(array)
// 				if(index === data.upvote.length - 1){
// 					downvote();
// 				}
// 			})
// 		}

// 	}


// 	var getTripVotes = function(){
// 	    $.ajax({
// 	    url: current_url + 'suggestions/' + current_suggestion + '/votes',
// 	    dataType: 'json',
// 	    success: function(data){
// 	    	userExists(data)
// 	    }
// 	});
// }


// getTripVotes()


// })



var downvote_clicks = []

$('#downvote').click(function(){
	var user = {
		user_id: current_user
	}
	var vote_amount = 0;

	var makePutReqest = function(){
		$('#comment_suggestion_downvote').text(vote_amount+1)
		$('#' + current_suggestion).find('.suggestion_downvote_count').text(vote_amount+1);
		// $('#comment_suggestion_upvote').text()

		var image = $('<img>');
		image.attr('src', current_avatar).attr('class', 'current_user_avatar')
		$('#downvote_images').append(image)

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
	});
	data.upvote.forEach(function(each){
		array.push(each.user_id);
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
	    	userExists(data)
	    // 	if(downvote_clicks.indexOf(current_suggestion) > -1){

	    // 	}else{
	    // 	downvote_clicks.push(current_suggestion)
	    //     userExists(data)
	    // }
	    }
		});
	}

getTripVotes()


})





var upvote_clicks = []

$('#upvote').click(function(){
	var user = {
		user_id: current_user
	}
	var vote_amount = 0;

	var makePutReqest = function(){
		$('#comment_suggestion_upvote').text(vote_amount+1)
		$('#' + current_suggestion).find('.suggestion_upvote_count').text(vote_amount+1);
		// $('#comment_suggestion_upvote').text()

		var image = $('<img>');
		image.attr('src', current_avatar).attr('class', 'current_user_avatar')
		$('#upvote_images').append(image)

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
	vote_amount = data.downvote.length;
	data.downvote.forEach(function(each){
		array.push(each.user_id);
	});
	data.upvote.forEach(function(each){
		array.push(each.user_id);
	});
	if(array.indexOf(current_user) === -1){
		makePutReqest()
	}
	}


	// var userExists = function(data){
	// var array = []
	// vote_amount = data.downvote.length;
	// data.downvote.forEach(function(each, index){
	// 	array.push(each.user_id);
	// 	if(index === data.downvote.length - 1){
	// 		data.upvote.forEach(function(each, index_two){
	// 			array.push(each.user_id);
	// 			if(index_two === data.upvote.length && array.indexOf(current_user) === -1){
	// 				makePutReqest()
	// 			}
	// 		});			
	// 	}
	// });


	// }





	var getTripVotes = function(){
	    $.ajax({
	    url: current_url + 'suggestions/' + current_suggestion + '/votes',
	    dataType: 'json',
	    success: function(data){
	    	userExists(data)
	    // 	if(downvote_clicks.indexOf(current_suggestion) > -1){

	    // 	}else{
	    // 	downvote_clicks.push(current_suggestion)
	    //     userExists(data)
	    // }
	    }
		});
	}

getTripVotes()


})

