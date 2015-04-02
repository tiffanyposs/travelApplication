    var current_url = document.URL;
    var current_trip;
    var current_category;
    var current_suggestion;


//get user information
var userInfo = function(data){
    var first_name = $('<li></li>').text('First name: ' + data.first_name);
    var last_name = $('<li></li>').text('Last name ' + data.last_name);
    var username = $('<li></li>').text('Username ' + data.username);
    $('#user_container ul').append(first_name, last_name, username);
}



var getUser = function(){
    $.ajax({
    url: current_url + 'users/stuff',
    dataType: 'json',
    success: function(data){
        console.log(data);
        userInfo(data)
    }
  });
}

getUser();
//end get user information

//get user trip info
var userTripInfo = function(data){
    data.forEach(function(trip){
        console.log(trip)
        var trip_card = $('<div></div');
        trip_card.addClass('trip_card ')
        trip_card.attr('id', trip._id)
        $( '#trip_container' ).append(trip_card)

        var title = $('<p></p>').text(trip.title);
        var location = $('<p></p>').text(trip.location);
        var duration = $('<p></p>').text(trip.duration);
        var description = $('<p></p>').text(trip.description);
        trip_card.append(title, location, duration, description)

        trip_card.click(function(){
            $( '.trip_card' ).css('background-color', 'white')
            $(this).css('background-color', 'red')
            current_trip = $(this).attr('id');
            console.log(current_trip)
        })
    })
}


var getUserTrips = function(){
    $.ajax({
    url: current_url + 'trips',
    dataType: 'json',
    success: function(data){
        console.log(data);
        userTripInfo(data)
    }
  });
}

getUserTrips();
//end get user trip info


