//these track what is clicked on
var current_url = document.URL;
var current_user;
var current_user_name;
var current_trip;
var current_category;
var current_suggestion;

var getUser = function(){
    $.ajax({
    url: current_url + 'users/stuff',
    dataType: 'json',
    success: function(data){
        current_user = data._id;
        current_user_name = data.first_name + " " + data.last_name;
    }
  });
}

getUser();


//This renders the current user's trips
var userTripInfo = function(data){
    //this sets the default of trip to the first one
    $('.trip_card_selected').attr('class', 'trip_card')
    var counter = 0;
    data.forEach(function(trip){
        console.log(trip)

        var trip_card = $('<ul></ul>');
        //selects the first trip in array
        if(counter === data.length - 1){
          // trip_card.attr('class', 'trip_card_selected')

        $('#current_trip').text(trip.title);
        current_trip = trip._id;
        $('#current_trip').append('<span class = "fa fa-arrow-down"></span>')
        }
        counter++;

          trip_card.attr('class', 'trip_card');

        trip_card.attr('id', trip._id);
        $( '#trip_list' ).prepend(trip_card)
        var title = $('<li></li>').text(trip.title);
        var location = $('<li></li>').text(trip.location);
        var duration = $('<li></li>').text(trip.duration);
        var description = $('<li></li>').text(trip.description);
        trip_card.append(title, location, duration, description)
        trip_card.click(function(){

            // empty or hide existing content
            $('#comment_suggestion_content, #comment_suggestion_info, #suggestion_comment_link').css('visibility', 'hidden')
            current_category = "";
            $('#categories').empty();
            $('#suggestion_content').empty();
            $('#comments').empty();
            current_suggestion = "";

            console.log(trip.attending)

            //this populates the friends
            $('#friends').empty();
            trip.attending.forEach(function(friend){
                $('#friends').prepend('<h2>' + friend.user_id.first_name + '</h2>')
            })

            
            // create cards
            $( '.trip_card_selected' ).attr('class', 'trip_card');
            $( this ).attr('class', 'trip_card_selected')
            current_trip = $(this).attr('id');
            var trip_name = this.children[0].innerHTML;
            $('#current_trip').text(trip_name);
            $('#current_trip').append('<span class = "fa fa-arrow-down"></span>');
            //calls to get the categories for selected trip
            getTripCategories()
        })

    })
        $('.trip_card:first').click()
        console.log(current_trip)

}


//this gets the current user's trips then passes it to another function to render it
var getUserTrips = function(){
    $.ajax({
    url: current_url + 'trips',
    dataType: 'json',
    success: function(data){
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
$('#trip_add').click(function(){
  var formData = {
    location: $('#trip_location').val(),
    title: $('#trip_name').val(),
    description: $('#trip_description').val(),
    start: $('#trip_start_date').val(),
    finish: $('#trip_end_date').val(),
    created_by: current_user
  }
    $.ajax({
      url: current_url + 'trips',
      type: 'POST',
      data: formData,
      success: function(data, textStatus, jqXHR)
        {
        // calls to get the last trip
        getLastTrip(),

        // this removes the content from the inputs
        $('#make_trip_content input').each(function(each){
        this.value = "";
        })

        //this deletes everything when you make a new post
        $('#suggestion_content').empty();
        $('#comments').empty();
        $('#categories').empty();
        current_suggestion = "";
        current_category = "";
        $('#comment_suggestion_content, #comment_suggestion_info, #suggestion_comment_link').css('visibility', 'hidden');
        $('#view_trips').click();

        }
    });  

})//end POST user trip info


// Start Category section, refers to the clicked on trip
//triggered when you click on a trip
var getTripCategories = function(){
    $.ajax({
    url: current_url + 'categories/' + current_trip,
    dataType: 'json',
    success: function(data){
      //removes old data

        $('#categories').empty();
        current_category = "";
      //renders new data
      getTripCategoryInfo(data)
    }
  });
}


var getTripCategoryInfo = function(data){
    data.forEach(function(category){
        var category_name = $('<h2></h2>').text(category.name);
        category_name.attr('id', category._id);
        $( '#categories' ).append(category_name);

        category_name.click(function(){
            $('#suggestion_content').empty();
            $('#comments').empty();
            current_suggestion = "";
            $('#comment_suggestion_content, #comment_suggestion_info, #suggestion_comment_link').css('visibility', 'hidden')


            $('.nav_clicked').attr('class', '')
            $(this).attr('class', 'nav_clicked')
            current_category = $(this).attr('id');
            getSuggestions();
        })
    })
}


// //this gets the last category posted in a group
// //is called when you POST the category_submit
var getLastCategory = function(){
    $.ajax({
    url: current_url + 'categories/' + current_trip + "/last",
    dataType: 'json',
    success: function(data){
        getTripCategoryInfo(data)
    }
  });  
}


// this posts a new category
$('#category_submit').click(function(){
  var formData = {
    name: $('#category_title').val(),
    trip_id : current_trip
  }
  $.ajax({
    url: current_url + "categories/" + current_trip,
    type: 'POST',
    data: formData,
    success: function(data, textStatus, jqXHR)
      {
        getLastCategory();
        $('#category_title').val('')

      }
  })
})// end getting categories


//triggered when you click on a trip
var getSuggestions = function(){
    $.ajax({
    url: current_url + 'suggestions/' + current_category,
    dataType: 'json',
    success: function(data){
      getSuggestionInfo(data)
    }
  });
}


var getSuggestionInfo = function(data){
    data.forEach(function(suggestion){
        var suggestion_card = $('<div></div').attr('class', 'suggestion_card')
        suggestion_card.attr('id', suggestion._id)
        var suggestion_info = $('<div></div').attr('class', 'suggestion_info')
        

        var content_div = $('<div></div>');
        var title = $('<h1></h1>').text(suggestion.title);
        var created_by = $('<h2></h2>').text("by: " + suggestion.user_id.first_name + " " + suggestion.user_id.last_name);
        var date = $('<h3></h3>').text(suggestion.created.substring(0, 10));

        content_div.append(title, created_by, date)
        suggestion_info.append(content_div)

        // voting section 
        var suggestion_voting = $('<div></div').attr('class', 'suggestion_voting')
        var inside_voting = $('<div></div>');
        suggestion_voting.append(inside_voting);

        var up_vote_div = $('<div></div>')
        var up_span = $('<span></span').attr('class', 'fa fa-arrow-circle-up fa-2x green')
        var up_count = $('<h2></h2>').text(suggestion.upvote.length).attr('class', 'suggestion_upvote_count')
        up_vote_div.append(up_span, up_count)

        var down_vote_div = $('<div></div>')
        var down_span = $('<span></span>').attr('class', 'fa fa-arrow-circle-down fa-2x red')
        var down_count = $('<h2></h2>').text(suggestion.downvote.length).attr('class', 'suggestion_downvote_count')
        down_vote_div.append(down_span, down_count)


        inside_voting.append(up_vote_div, down_vote_div)

        suggestion_card.append(suggestion_info, suggestion_voting);
        $('#suggestion_content').prepend(suggestion_card)

        suggestion_card.click(function(){
            $('#comments').empty();
            $('.suggestion_clicked').removeClass('suggestion_clicked')
            
            current_suggestion = suggestion._id;
            $(this).addClass('suggestion_clicked')
            $('#comment_suggestion_content, #comment_suggestion_info').css('visibility', 'visible')

            $('#suggestion_name').text(suggestion.user_id.first_name + ' ' + suggestion.user_id.first_name);
            $('#suggestion_date').text(suggestion.created.substring(0, 10));
            $('#suggestion_comment_about').text(suggestion.content);

            // if there is a suggestion link render it
            if(suggestion.link){
                $('#suggestion_comment_link').css('visibility', 'visible')
                $('#suggestion_comment_link').text('Link: ' + suggestion.link.substring(7, 20) + "....");
                $('#suggestion_comment_link').attr('href', suggestion.link);
            }else{
                $('#suggestion_comment_link').css('visibility', 'hidden')
            }

            $('#comment_suggestion_upvote').text(suggestion.upvote.length)
            $('#comment_suggestion_downvote').text(suggestion.downvote.length)
            getComments();

        })


    })
}




// //this gets the last category posted in a group
// //is called when you POST the category_submit
var getLastSuggestion = function(){
    $.ajax({
    url: current_url + 'suggestions/' + current_category + "/last",
    dataType: 'json',
    success: function(data){
        getSuggestionInfo(data)
    }
  });  
}



// this posts a new suggestion
$('#suggestion_submit').click(function(){
  var formData = {
    title: $('#suggestion_title').val(),
    content: $('#suggestion_about').val(),
    link: $('#suggestion_link').val(),
    category_id: current_category,
    user_id: current_user
  }
  $.ajax({
    url: current_url + "suggestions",
    type: 'POST',
    data: formData,
    success: function(data, textStatus, jqXHR)
      {
        $('#suggestion_input input').each(function(each){
            this.value = "";
        })
        getLastSuggestion()
      }
  })
})// end getting categories



// !!!!!!!!
// start getting comments
// !!!!!!!!!


//triggered when you click on a trip
var getComments = function(){
    $.ajax({
    url: current_url + 'comments/' + current_suggestion,
    dataType: 'json',
    success: function(data){
      getCommentInfo(data)
    }
  });
}


var getCommentInfo = function(data){
    data.forEach(function(comment){
        var comment_card = $('<div></div').attr('class', 'comment_card');

        var image_div = $('<div></div>');
        var img = $('<img>').attr('src', '/images/users.jpg');
        image_div.append(img);

        var comment_info = $('<div></div>').attr('class', 'comment_info');
        var info_inner_div = $('<div></div');

        var date_container = $('<div></div>');
        var name = $('<h2></h2>').text(comment.user_id.first_name + " " + comment.user_id.last_name);
        var date = $('<h2></h2').text(comment.created.substring(0, 10))
        date_container.append(name, date);

        var content = $('<h3></h3>').text(comment.content)

        info_inner_div.append(date_container, content);
        comment_info.append(info_inner_div)


        comment_card.append(image_div, comment_info)
        $('#comments').prepend(comment_card)

    })
}



// //this gets the last category posted in a group
// //is called when you POST the category_submit
var getLastComment = function(){
    $.ajax({
    url: current_url + 'comments/' + current_suggestion + "/last",
    dataType: 'json',
    success: function(data){
        getCommentInfo(data)
    }
  });  
}



//post comment
$('#comment_submit').click(function(){
  var formData = {
    content: $('#comment_input_area').val(),
    suggestion_id: current_suggestion,
    user_id: current_user,
  }
  $.ajax({
    url: current_url + "comments",
    type: 'POST',
    data: formData,
    success: function(data, textStatus, jqXHR)
      {
        $('#comment_input_area').val("");
        getLastComment()
      }
  })
})// end getting categories

