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

        image.hover(function(e){
            $('#voting_hover_div').text(current_user_name);
            $('#voting_hover_div').css({
                left: $(this).position().left + $(this).width()/2,
                top: $(this).position().top - 20,
                'border': '3px solid #F33533',
            }).show()
        }, function(){
            $('#voting_hover_div').hide()
        })  

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
	    }
		});
	}

getTripVotes()


})





// $('.upvote_button').click(function(e){
// 	e.stopPropagation();
// 	console.log('hiiii')
// })



var upvote_clicks = []





$('#upvote').click(function(){




	var user = {
		user_id: current_user
	}
	var vote_amount = 0;

	var makePutReqest = function(){
		$('#' + current_suggestion).find('.suggestion_upvote_count').text(vote_amount+1);

		var image = $('<img>');
		image.attr('src', current_avatar).attr('class', 'current_user_avatar')

        image.hover(function(e){
            $('#voting_hover_div').text(current_user_name);
            $('#voting_hover_div').css({
                left: $(this).position().left + $(this).width()/2,
                top: $(this).position().top - 20,
                'border': '3px solid #98C06A',
            }).show()
        }, function(){
            $('#voting_hover_div').hide()
        })  

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





