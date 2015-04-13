// $('#comment_suggestion_upvote')
// $('#comment_suggestion_downvote')



$('#upvote').click(function(){
	var data = {
		user_id: current_user
	}
	console.log('hi')
	$.ajax({
	        url: current_url + "suggestions/" + current_suggestion + '/upvote',
	        type: 'PUT',
	        data: data,
	        success: function(data){
	        	console.log("Put Worked!")
	        }
	});
})



$('#downvote').click(function(){
	var data = {
		user_id: current_user
	}
	console.log('hi')
	$.ajax({
	        url: current_url + "suggestions/" + current_suggestion + '/downvote',
	        type: 'PUT',
	        data: data,
	        success: function(data){
	        	console.log("Put Worked!")
	        }
	});
})

// $('#downvote').click(function(){

// })






