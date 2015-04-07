//these track what is clicked on
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
        // console.log(data);
        userInfo(data)
    }
  });
}

getUser();
//end get user information




//This renders the current user's trips
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
            getTripCategories()
        })
    })
}


//this gets the current user's trips then passes it to another function to render it
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


// this gets the trip someone just posted
var getLastTrip = function(){
    $.ajax({
    url: current_url + 'trips/last',
    dataType: 'json',
    success: function(data){
        userTripInfo(data)
    }
  });  
}



//post request to POST a new trip
$('#trip_submit').click(function(){
  var formData = {
    location: $('#location').val(),
    title: $('#title').val(),
    description: $('#description').val(),
    duration: $('#duration').val(),
    start_date: $('#start_date').val(),
    finish_date: $('#finish_date').val()
  }
  // console.log(formData)
$.ajax({
  url: current_url + 'trips',
  type: 'POST',
  data: formData,
  success: function(data, textStatus, jqXHR)
    {
      // calls to get the last trip
      getLastTrip(),
      // this removes the content from the inputs
      $('#trip_input input').each(function(each){
        this.value = "";
      })
    }
});  

})
//end POST user trip info



// Start Category section, refers to the clicked on trip

//triggered when you click on a trip
var getTripCategories = function(){
    $.ajax({
    url: current_url + 'categories/' + current_trip,
    dataType: 'json',
    success: function(data){
      //removes old data
      if($('#category_container').children().length > 0){
        $('#category_container').empty();
        current_category = "";
      };
      //renders new data
      getTripCategoryInfo(data)
    }
  });
}

var getTripCategoryInfo = function(data){
    data.forEach(function(category){
        console.log(category)
        var category_card = $('<div></div');
        category_card.addClass('category_card')
        category_card.attr('id', category._id)
        $( '#category_container' ).append(category_card)

        var name = $('<p></p>').text(category.name);
        category_card.append(name)

        category_card.click(function(){
            $( '.category_card' ).css('background-color', 'white')
            $(this).css('background-color', 'purple')
            current_category = $(this).attr('id');
            console.log(current_category)
            // getTripCategories()
        })
    })
}

//this gets the last category posted in a group
//is called when you POST the category_submit
var getLastCategory = function(){
    $.ajax({
    url: current_url + 'categories/' + current_trip + "/last",
    dataType: 'json',
    success: function(data){
        console.log(data);
        // renders the new post on the page
        // userTripInfo(data)
        getTripCategoryInfo(data)
    }
  });  
}



// this posts a new category
$('#category_submit').click(function(){
  var formData = {
    name: $('#category_name').val(),
    trip_id : current_trip
  }
  $.ajax({
    url: current_url + "categories/" + current_trip,
    type: 'POST',
    data: formData,
    success: function(data, textStatus, jqXHR)
      {
        getLastCategory();
        $('#category_input input').each(function(each){
        this.value = "";
      })
      }
  })
})// end getting categories
