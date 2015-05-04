var addFriend = function(foundfriend, data){
    console.log(foundfriend)
    console.log(data)
    var user = {
        user_id: foundfriend._id
    }

    $.ajax({
            url: current_url + "trips/addfriend/" + data._id,
            type: 'PUT',
            data: user,
            success: function(data){
                console.log("Put Worked!")


            }
    });

    var trip = {
        trip_id: current_trip
    }

    $.ajax({
        url: current_url + 'users/addtrip/' + foundfriend._id,
        type: 'PUT',
        data: trip,
        success: function(data){
            console.log("Added to the user's trips")
        }
    })

    //ads it to the 
    $('#friends').prepend('<h2>' + foundfriend.first_name + '</h2>') 
}



var addFoundFriend = function(foundfriend){
    $('#found_friend').click(function(){
        // console.log(foundfriend)
        // console.log(current_trip)
    //checks if it is 
    $.ajax({
    url: current_url + 'trips/' + current_trip,
    dataType: 'json',
    success: function(data){
        attending_array = []
        data.attending.forEach(function(each){
            attending_array.push(each.user_id);
        })
        if(attending_array.indexOf(foundfriend._id) === -1){
            addFriend(foundfriend, data)
        }else{
            console.log('This friend is already added')
        }
    }
    });


    })
}


var showFriend = function(data){
        $('#found_friends').empty();
        // userTripInfo(data)
        if(data.length != 0){
            // console.log(data);
            var found = $('<p></p>').text('+ ' + data[0].first_name + ' ' + data[0].last_name);
            found.attr('id', 'found_friend').css('color', '#009ACD')
            $('#found_friends').append(found)
            addFoundFriend(data[0])
        }else{
            $('#found_friends').empty();
            var not_found = $('<p></p>').text("Didn't find your friend").css('color', 'red')
            $('#found_friends').append(not_found)
        }
}


var getFriend = function(email){
    $.ajax({
    url: current_url + 'users/findfriend/' + email,
    dataType: 'json',
    success: function(data){
        showFriend(data);
    }
  	});
}



$('#find_friend_submit').click(function(){
    var email = $('#friend_email').val()
    $('#friend_email').val('')
    // console.log(email)
    getFriend(email)
})






