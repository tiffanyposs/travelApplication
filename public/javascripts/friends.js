var addFriend = function(foundfriend, data){
    console.log(foundfriend)
    console.log(data)
    var user = {
        user_id: foundfriend._id
    }
    console.log(user)
    $.ajax({
            url: current_url + "trips/addfriend/" + data._id,
            type: 'PUT',
            data: user,
            success: function(data){
                console.log("Put Worked!")

            }
    }); 
}



var addFoundFriend = function(foundfriend){
    console.log('add friends ' + foundfriend)
    $('#found_friend').click(function(){
        // console.log(foundfriend._id)
        // console.log(current_trip)
    //checks if it is 
    $.ajax({
    url: current_url + 'trips/' + current_trip,
    dataType: 'json',
    success: function(data){
        var friend_attending = false;
        console.log(data)
        data.attending.forEach(function(each){
            if(each.user_id === foundfriend._id){
                friend_attending = true;
            }
        });
        if(data.created_by === found_friend._id){
            friend_attending = true;
        }
        
        if(friend_attending === false){
            addFriend(foundfriend, data)
        }else{
            console.log('This friend is already added')
        }

        // console.log(data)
        // console.log(foundfriend)
    }
    });


    })
}



var getFriend = function(email){
    $.ajax({
    url: current_url + 'users/findfriend/' + email,
    dataType: 'json',
    success: function(data){
        $('#found_friends').empty();
        // userTripInfo(data)
        if(data.length != 0){
        	console.log(data);
        	var found = $('<p></p>').text('+ ' + data[0].first_name + ' ' + data[0].last_name);
            found.attr('id', 'found_friend')
        	$('#found_friends').append(found)
            addFoundFriend(data[0])
        }else{
            $('#found_friends').empty();
        	var not_found = $('<p></p>').text("Didn't find your friend")
        	$('#found_friends').append(not_found)
        }
    }
  	});
}



$('#find_friend_submit').click(function(){
    var email = $('#friend_email').val()
    $('#friend_email').val('')
    console.log(email)
    getFriend(email)
})






