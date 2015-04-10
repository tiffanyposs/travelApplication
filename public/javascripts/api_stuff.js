//these track what is clicked on
var current_url = document.URL;
var current_user;
var current_user_name;
var current_trip;
// var current_trip_title;
var current_category;
var current_suggestion;

//get user information
// var userInfo = function(data){
//     var first_name = $('<li></li>').text('First name: ' + data.first_name);
//     var last_name = $('<li></li>').text('Last name ' + data.last_name);
//     var username = $('<li></li>').text('Username ' + data.username);
//     $('#user_container ul').append(first_name, last_name, username);
// }

var getUser = function(){
    $.ajax({
    url: current_url + 'users/stuff',
    dataType: 'json',
    success: function(data){
        current_user = data._id;
        current_user_name = data.first_name + " " + data.last_name;
        // userInfo(data)
    }
  });
}

getUser();
//end get user information








//This renders the current user's trips
var userTripInfo = function(data){
    //this sets the default of trip to the first one
    $('#current_trip').text(data[0].title);
    current_trip = data[0]._id;
    $('#current_trip').append('<span class = "fa fa-arrow-down"></span>')
    // console.log(current_trip)
    var counter = 0;
    data.forEach(function(trip){
        var trip_card = $('<ul></ul>');
        //selects the first trip in array
        if(counter === 0){
          trip_card.attr('class', 'trip_card_selected')
        }else{
          trip_card.attr('class', 'trip_card');
        }
        counter++;

        trip_card.attr('id', trip._id);
        $( '#trip_list' ).append(trip_card)

        var title = $('<li></li>').text(trip.title);
        var location = $('<li></li>').text(trip.location);
        var duration = $('<li></li>').text(trip.duration);
        var description = $('<li></li>').text(trip.description);
        trip_card.append(title, location, duration, description)
        trip_card.click(function(){
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
}


//this gets the current user's trips then passes it to another function to render it
var getUserTrips = function(){
    $.ajax({
    url: current_url + 'trips',
    dataType: 'json',
    success: function(data){
        // console.log(data);
        userTripInfo(data)
    }
  });
}


getUserTrips();




// // this gets the trip someone just posted
// var getLastTrip = function(){
//     $.ajax({
//     url: current_url + 'trips/last',
//     dataType: 'json',
//     success: function(data){
//         userTripInfo(data)
//     }
//   });  
// }



// //post request to POST a new trip
// $('#trip_submit').click(function(){
//   var formData = {
//     location: $('#location').val(),
//     title: $('#title').val(),
//     description: $('#description').val(),
//     duration: $('#duration').val(),
//     start_date: $('#start_date').val(),
//     finish_date: $('#finish_date').val()
//   }
//   // console.log(formData)
// $.ajax({
//   url: current_url + 'trips',
//   type: 'POST',
//   data: formData,
//   success: function(data, textStatus, jqXHR)
//     {
//       // calls to get the last trip
//       getLastTrip(),
//       // this removes the content from the inputs
//       $('#trip_input input').each(function(each){
//         this.value = "";
//       })
//     }
// });  

// })
// //end POST user trip info



// Start Category section, refers to the clicked on trip

//triggered when you click on a trip
var getTripCategories = function(){
    $.ajax({
    url: current_url + 'categories/' + current_trip,
    dataType: 'json',
    success: function(data){
      //removes old data
      if($('#categories').children().length > 0){
        $('#categories').empty();
        current_category = "";
      };
      //renders new data
      getTripCategoryInfo(data)
    }
  });
}

var getTripCategoryInfo = function(data){
    data.forEach(function(category){
        console.log(category._id)
        var category_name = $('<h2></h2>').text(category.name);
        category_name.attr('id', category._id);
        $( '#categories' ).append(category_name);

        category_name.click(function(){
            $('.nav_clicked').attr('class', '')
            $(this).attr('class', 'nav_clicked')
            current_category = $(this).attr('id');
            console.log(current_category);
            getSuggestions();
        })
    })
}

// //this gets the last category posted in a group
// //is called when you POST the category_submit
// var getLastCategory = function(){
//     $.ajax({
//     url: current_url + 'categories/' + current_trip + "/last",
//     dataType: 'json',
//     success: function(data){
//         console.log(data);
//         // renders the new post on the page
//         // userTripInfo(data)
//         getTripCategoryInfo(data)
//     }
//   });  
// }



// // this posts a new category
// $('#category_submit').click(function(){
//   var formData = {
//     name: $('#category_name').val(),
//     trip_id : current_trip
//   }
//   $.ajax({
//     url: current_url + "categories/" + current_trip,
//     type: 'POST',
//     data: formData,
//     success: function(data, textStatus, jqXHR)
//       {
//         getLastCategory();
//         $('#category_input input').each(function(each){
//         this.value = "";
//       })
//       }
//   })
// })// end getting categories





//triggered when you click on a trip
var getSuggestions = function(){
    $.ajax({
    url: current_url + 'suggestions/' + current_category,
    dataType: 'json',
    success: function(data){
      console.log(data);
      //removes old data
      // if($('#categories').children().length > 0){
      //   $('#categories').empty();
      //   current_category = "";
      // };
      //renders new data
      // getTripCategoryInfo(data)
      getSuggestionInfo(data)
    }
  });
}

var getSuggestionInfo = function(data){
    $('#suggestion_content').empty();
    data.forEach(function(suggestion){
        console.log(suggestion)
        //empties existing content


        var suggestion_card = $('<div></div').attr('class', 'suggestion_card')
        // suggestion_card.attr('id', suggestion._id)
        var suggestion_info = $('<div></div').attr('class', 'suggestion_info')
        

        var content_div = $('<div></div>');
        var title = $('<h1></h1>').text(suggestion.title);
        var created_by = $('<h2></h2>').text("by: " + suggestion.user_id.first_name + " " + suggestion.user_id.last_name);
        var date = $('<h3></h3>').text(suggestion.created.substring(0, 10));

        content_div.append(title, created_by, date)
        suggestion_info.append(content_div)
        console.log(date)

        // voting section 
        var suggestion_voting = $('<div></div').attr('class', 'suggestion_voting')
        var inside_voting = $('<div></div>');
        suggestion_voting.append(inside_voting);

        var up_vote_div = $('<div></div>')
        var up_span = $('<span></span').attr('class', 'fa fa-arrow-circle-up fa-2x green')
        var up_count = $('<h2></h2>').text(suggestion.upvote.length)
        up_vote_div.append(up_span, up_count)

        var down_vote_div = $('<div></div>')
        var down_span = $('<span></span>').attr('class', 'fa fa-arrow-circle-down fa-2x red')
        var down_count = $('<h2></h2>').text(suggestion.downvote.length)
        down_vote_div.append(down_span, down_count)


        inside_voting.append(up_vote_div, down_vote_div)

        suggestion_card.append(suggestion_info, suggestion_voting);
        $('#suggestion_content').append(suggestion_card)

        suggestion_card.click(function(){
            alert(suggestion.title)
        })

        // var category_name = $('<h2></h2>').text(category.name);
        // category_name.attr('id', category._id);
        // $( '#categories' ).append(category_name);

        // category_name.click(function(){
        //     $('.nav_clicked').attr('class', '')
        //     $(this).attr('class', 'nav_clicked')
        //     current_category = $(this).attr('id');
        //     console.log(current_category)
        // })
    })
}



            // <div class = 'suggestion_card'>
            //     <div class = 'suggestion_info'>
            //         <div>
            //             <h1>Suggestion Title</h1>
            //             <h2>By: Jamie</h2>
            //             <h3>April 25th, 2015</h3>
            //         </div>
            //     </div>


            //     <div class = 'suggestion_voting'>
            //             <div>
            //                 <div>
            //                     <span class = 'fa fa-arrow-circle-up fa-2x green'></span>
            //                     <h2>0</h2>
            //                 </div>
            //                 <div>
            //                     <span class = 'fa fa-arrow-circle-down fa-2x red'></span>
            //                     <h2>0</h2>
            //                 </div>
            //             </div>
            //     </div>
            // </div>




// //this gets the last category posted in a group
// //is called when you POST the category_submit
// var getLastCategory = function(){
//     $.ajax({
//     url: current_url + 'categories/' + current_trip + "/last",
//     dataType: 'json',
//     success: function(data){
//         console.log(data);
//         // renders the new post on the page
//         // userTripInfo(data)
//         getTripCategoryInfo(data)
//     }
//   });  
// }



// this posts a new category
$('#suggestion_submit').click(function(){
  var formData = {
    title: $('#suggestion_title').val(),
    content: $('#suggestion_about').val(),
    link: $('suggestion_link').val(),
    category_id: current_category,
    user_id: current_user
  }
  $.ajax({
    url: current_url + "suggestions",
    type: 'POST',
    data: formData,
    success: function(data, textStatus, jqXHR)
      {
      //   getLastCategory();
        $('#suggestion_input input').each(function(each){
            this.value = "";
        })
        console.log('it posted')
      }
  })
})// end getting categories
