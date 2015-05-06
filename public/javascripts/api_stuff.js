//these track what is clicked on
var current_url = document.URL;
var current_user;
var current_user_name;
var current_trip;
var current_category;
var current_suggestion;
var current_comment;


var attendingTrips = function(trips){
    var finaltrips = [];
    var counter = 0;

    trips.forEach(function(each){
        finaltrips.push(each.trip_id)
        if(finaltrips.length === trips.length){
            userTripInfo(finaltrips)
        }
        counter++;
    })

}


var getUser = function(){
    $.ajax({
    url: current_url + 'users/stuff',
    dataType: 'json',
    success: function(data){
        current_user = data._id;
        current_user_name = data.first_name + " " + data.last_name;
        attendingTrips(data.trips)
    }
  });
};

getUser();


//This renders the current user's trips
var userTripInfo = function(data){

    //this hides the the content if theres no trips
    if(data.length > 0){
        $('#group_chat, #categories_nav, #friends_nav').show('fold', 400);
    }else{
        $('#group_chat, #categories_nav, #friends_nav').hide('fold', 400);
    }

    //this sets the default of trip to the first one
    $('.trip_card_selected').attr('class', 'trip_card')
    var counter = 0;
    data.forEach(function(trip){

        var trip_card = $('<ul></ul>');
        if(counter === data.length - 1){

        $('#current_trip').text(trip.title);
        current_trip = trip._id;
        $('#current_trip').append('<span class = "fa fa-arrow-down"></span>')
        }
        counter++;

        trip_card.attr('class', 'trip_card');
        console.log(trip_card)
        trip_card.attr('id', trip._id);
        $( '#trip_list' ).prepend(trip_card)
        var title = $('<li></li>').text(trip.title);
        var location = $('<li></li>').text(trip.location);
        var duration = $('<li></li>').text(trip.duration);
        var description = $('<li></li>').text(trip.description);
        trip_card.append(title, location, duration, description);
        trip_card.click(function(){
            $('#comment_suggestion_content, #comment_suggestion_info, #suggestion_comment_link').css('visibility', 'hidden')
            current_category = "";
            $('#categories').empty();
            $('#suggestion_content').empty();
            $('#comments').empty();
            current_suggestion = "";
            current_trip = $(this).attr('id');


            //this function is in the chat.js file
            makeNewWebsocket()

            // THIS SETS THE INVITE MODAL TO HAVE THE CORRECT LINK
            var invite_url = current_url + 'invite/' + current_trip + '/' + current_user;
            $('#invite_url').text(invite_url).attr('href', invite_url)

            var makeFriends = function(trip){
            $('#friends').empty();
            trip.attending.forEach(function(friend){
                if(typeof friend.user_id == "string"){
                    $.ajax({
                        url: current_url + 'users/' + friend.user_id,
                        dataType: 'json',
                        success: function(data){
                            if(data._id != current_user){
                                $('#friends').append('<h2>' + data.first_name + '</h2>');
                            }
                        }
                    });

                }else{
                    if( typeof friend.user_id == "object" ){
                        $('#friends').append('<h2>' + friend.user_id.first_name + '</h2>');
                    }
                }
            })

            }
            //call to get the most updated friends
              $.ajax({
                url: current_url + 'trips/' + this.id,
                dataType: 'json',
                success: function(data){
                    makeFriends(data)

                }
              });

            // create cards
            $( '.trip_card_selected' ).attr('class', 'trip_card');
            $( this ).attr('class', 'trip_card_selected')
            
            var trip_name = this.children[0].innerHTML;
            $('#current_trip').text(trip_name);
            $('#current_trip').append('<span class = "fa fa-arrow-down"></span>');
            // $('#chat_container').hide();
            // $('#suggestions, #comments_container').show();
            $('#chat_container').hide('slow', function(){
                    $('#suggestions, #comments_container').show('slow');
            });
            $('.group_clicked').attr('class', '');

            getTripCategories()
        })

    })
        $('.trip_card:first').click()


}


//this gets the current user's trips they created then passes it to another function to render it
var getUserTrips = function(){
    $.ajax({
    url: current_url + 'trips',
    dataType: 'json',
    success: function(data){
        userTripInfo(data);
    }
  });
}



// getUserTrips();





// this gets the trip someone just posted
var getLastTrip = function(){
    $.ajax({
    url: current_url + 'trips/last',
    dataType: 'json',
    success: function(data){
        if(data[0].attending.length === 0){
            updateAttending(data)
        }else if(data[0].attending.length > 0){
            userTripInfo(data);
        }else{
            // console.log('else')
        }
    }
  });  
}




var updateAttending = function(data){
    var user = {
        user_id: current_user
    }
    // console.log('updateAttending')
    // adds person to the friend list in trips
    $.ajax({
            url: current_url + "trips/addfriend/" + data[0]._id,
            type: 'PUT',
            data: user,
            timeout: 15000,
    });

    var trip = {
        trip_id: data[0]._id
    }
    //adds trip to person's trips
    $.ajax({
            url: current_url + "users/addtrip/" + current_user,
            type: 'PUT',
            data: trip,
            timeout: 15000,
    });
    getLastTrip();
}

//post request to POST a new trip
$('#trip_add').click(function(){

    var attending_data = {
        user_id: current_user
    }
  var formData = {
    location: $('#trip_location').val(),
    title: $('#trip_name').val(),
    description: $('#trip_description').val(),
    start: $('#trip_start_date').val(),
    finish: $('#trip_end_date').val(),
    created_by: current_user,
    attending: attending_data
  }
    $.ajax({
      url: current_url + 'trips',
      type: 'POST',
      data: formData,
      success: function(data, textStatus, jqXHR)
        {
        getLastTrip();

        // this removes the content from the inputs
        $('#make_trip_content input').each(function(each){
        this.value = "";
        })

        //this deletes everything when you make a new post
        $('#suggestion_content').empty();
        $('#getLastTrip').empty();
        $('#categories').empty();
        current_suggestion = "";
        current_category = "";
        $('#comment_suggestion_content, #comment_suggestion_info, #suggestion_comment_link').css('visibility', 'hidden');
        $('#view_trips').click();

        }
    });  

})//end POST user trip info


var getTripCategoryInfo = function(data){

    //this hides the suggestion if theres no category
    if(data.length > 0){
        $('#suggestion_header h1').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300)
            .zIndex('100')
    }else{
    $('#suggestion_header h1').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
        function(){
          $(this).css('visibility', 'hidden').zIndex('-100')
        });
    }

    data.forEach(function(category){
        var category_name = $('<h2></h2>').text(category.name);
        category_name.attr('id', category._id);
        category_name.attr('class', 'categories')
        $( '#categories' ).append(category_name);

        // $( '#categories' ).append(category_name).hide().show('slow');

        category_name.click(function(){
            $('#suggestion_content').empty();
            $('#comments').empty();

            // this toggles the chat
            $('#chat_container').hide('slow', function(){
                $('#suggestions, #comments_container').show('slow');
            }); 
            

            current_suggestion = "";
            $('#comment_suggestion_content, #comment_suggestion_info, #suggestion_comment_link').css('visibility', 'hidden');


            $('.nav_clicked, .group_clicked').attr('class', '');
            $(this).attr('class', 'nav_clicked');
            current_category = $(this).attr('id');
            getSuggestions();
        })
    })
    //clicks the first child on page load
    $('.categories:first-child').click();




}



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
      getTripCategoryInfo(data);
    }
  });
}


// //this gets the last category posted in a group
// //is called when you POST the category_submit
var getLastCategory = function(){
    $.ajax({
    url: current_url + 'categories/' + current_trip + "/last",
    dataType: 'json',
    success: function(data){
        getTripCategoryInfo(data);
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
        $('#category_title').val('');

      }
  })
})// end getting categories


//checks of something is valid url
function ValidUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}


var getSuggestionInfo = function(data){
    //this hides the comment box if there is no suggestion
    if(data.length > 0){
        $('#comment_input').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300)
            .zIndex('100')
    }else{
    $('#comment_input').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
        function(){
          $(this).css('visibility', 'hidden').zIndex('-100')
          close_modal = '';
        });
    }
    data.forEach(function(suggestion){
        
        var suggestion_card = $('<div></div>').attr('class', 'suggestion_card')
        suggestion_card.attr('id', suggestion._id)
        var suggestion_info = $('<div></div>').attr('class', 'suggestion_info')
        

        var content_div = $('<div></div>');
        var title = $('<h1></h1>').text(suggestion.title).attr('class', 'title');
        var created_by = $('<h2></h2>').text("by: " + suggestion.user_id.first_name + " " + suggestion.user_id.last_name);
        created_by.attr('class', 'created_by')
        var date = $('<h3></h3>').text(suggestion.created.substring(0, 10)).attr('class', 'date');

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

        //this is the editing pencil
        if(suggestion.user_id._id === current_user){
            var edit_div = $('<div></div>').attr('class', 'edit_div')
            var edit = $('<span></span>').attr('class', 'suggestion_pencil fa fa-pencil fa-lg').hide();
            edit_div.append(edit)
 
        //this shows the pencil on hover
        suggestion_card.hover(
            function(){
                var $pencil = $( this ).find('.suggestion_pencil').show('fade', 100);
                    $pencil.click(function(event){
                        // event.stopPropagation();
                    })
            }, function(){
                var $pencil = $( this ).find('.suggestion_pencil').hide('fade', 100);
        })


        //this is for updating a suggestion
        $('#suggestion_edit').click(function(){
            var edit_title = $('#edit_title').val();
            var edit_about = $('#edit_about').val();
            var edit_link = $('#edit_link').val();
            // if(edit_title)


            var suggestion_update = {
                title: edit_title,
                content: edit_about,
                link: edit_link
            }

              $.ajax({
                url: current_url + 'suggestions/' + current_suggestion + '/update',
                type: 'PUT',
                data: suggestion_update,
                dataType: 'json',
                success: function(data){
                }
              });
              $('#suggestion_comment_about').text(edit_about);
              $('#suggestion_comment_link').text(edit_link.substring(7, 20) + "....")
                        .attr('href', edit_link);
              $('#' + current_suggestion).find('.title').text(edit_title);
        });


        var edit_suggestion_modal = false;
        edit.click(function(event){
            edit_suggestion_modal = true;
            $('#edit_title').val(suggestion.title);
            $('#edit_about').val(suggestion.content);
            $('#edit_link').val(suggestion.link);
            $('#edit_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
        })

        $('#edit_close').click(function(event){
            edit_suggestion_modal = false;
          $('#edit_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
            function(){
              $(this).css('visibility', 'hidden');
            });
        })

        // if you press enter
        $('#edit_title, #edit_about, #edit_link').keypress(function(e){
          if(e.keyCode == 13 && edit_suggestion_modal === true){
            $('#suggestion_edit').click();
            $('#edit_close').click();
          }
        });

        //if you press esc
        $(document).keydown(function(e) {
          if (e.keyCode == 27 && edit_suggestion_modal === true){
            $('#edit_close').click();
          }
        });


        }

        inside_voting.append(up_vote_div, down_vote_div)

        suggestion_card.append(suggestion_info, suggestion_voting, edit_div);
        $('#suggestion_content').append(suggestion_card)

        suggestion_card.click(function(){
            $('#comments').empty();
            $('.suggestion_clicked').removeClass('suggestion_clicked')
            
            current_suggestion = suggestion._id;
            $(this).addClass('suggestion_clicked')



            var createSuggestionCard = function(data){
                $('#comment_suggestion_content, #comment_suggestion_info').css('visibility', 'visible')
                $('#suggestion_name').text(suggestion.user_id.first_name + ' ' + suggestion.user_id.last_name);
                $('#suggestion_date').text(data[0].created.substring(0, 10));
                $('#suggestion_comment_about').text(data[0].content);

                var valid_url = ValidUrl(suggestion.link);
                // if there is a suggestion link render it
                //and checks if its valid
                if(suggestion.link && valid_url === true){
                    $('#suggestion_comment_link').css('visibility', 'visible')
                    $('#suggestion_comment_link').text('Link: ' + data[0].link.substring(7, 20) + "....");
                    $('#suggestion_comment_link').attr('href', data[0].link);
                }else if(suggestion.link && valid_url === false){
                    $('#suggestion_comment_link').css('visibility', 'visible')
                    $('#suggestion_comment_link').text('Not Valid Link');
                    $('#suggestion_comment_link').removeAttr('href');
                }else{
                    $('#suggestion_comment_link').css('visibility', 'hidden')
                }

                $('#comment_suggestion_upvote').text(data[0].upvote.length)
                $('#comment_suggestion_downvote').text(data[0].downvote.length)
            }


            var getSuggestion = function(){
                $.ajax({
                url: current_url + 'suggestions/' + current_suggestion + '/one',
                dataType: 'json',
                success: function(data){
                  createSuggestionCard(data);
                }
                
              });
            }

            getSuggestion();
            getComments();

        })

        $('.suggestion_card:first-child').click();
    })
}


//triggered when you click on a trip
var getSuggestions = function(){
    $.ajax({
    url: current_url + 'suggestions/' + current_category,
    dataType: 'json',
    success: function(data){
      getSuggestionInfo(data);
    }    
  });
}

// //this gets the last category posted in a group
// //is called when you POST the category_submit
var getLastSuggestion = function(){
    $.ajax({
    url: current_url + 'suggestions/' + current_category + "/last",
    dataType: 'json',
    success: function(data){
        getSuggestionInfo(data);
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
        getLastSuggestion();
      }
  })
})// end getting categories


//triggered when you click on a trip
var getComments = function(){
    $.ajax({
    url: current_url + 'comments/' + current_suggestion,
    dataType: 'json',
    success: function(data){
      getCommentInfo(data);
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
        // var date = $('<h2></h2').text(comment.created.substring(0, 10))
        date_container.append(name)//, date);

        var content = $('<h3></h3>').text(comment.content);
        content.attr('class', comment._id)

        //this is for the pencil
        if(comment.user_id._id === current_user){
            var edit_div = $('<div></div>').attr('class', 'edit_comment')
            var edit = $('<span></span>').attr('class', 'comment_pencil fa fa-pencil fa-lg').hide();
            edit.attr('id', comment._id)
            edit_div.append(edit)
        }

        //when you hover on a comment it shows
        comment_card.hover(
            function(){
                var $comment_pencil = $( this ).find('.comment_pencil').show('fade', 300);
                    $comment_pencil.click(function(event){
                        event.stopPropagation();
                    })
            }, function(){
                var $comment_pencil = $( this ).find('.comment_pencil').hide('fade', 300);
        })



        //this is for updating a comment
        $('#comment_edit').click(function(){
            var edit_content = $('#edit_comment').val();

            var comment_update = {
                content: edit_content,
            }


              $.ajax({
                url: current_url + 'comments/' + current_comment + '/update',
                type: 'PUT',
                data: comment_update,
                dataType: 'json',
              })

            $('.' + current_comment).text(edit_content)
        });

        var edit_comment_modal = false;
        //triggers the modal
        edit.click(function(event){
            edit_comment_modal = true
            current_comment = $(this).attr('id')
            $('#edit_comment').val(comment.content);
            $('#edit_comment_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
        })

        $('#edit_comment_close').click(function(event){
            edit_comment_modal = false;
          $('#edit_comment_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
            function(){
              $(this).css('visibility', 'hidden')
            });
        })

        // if you press enter
        $('#edit_comment').keypress(function(e){
          if(e.keyCode == 13 && edit_comment_modal === true){
            $('#comment_edit').click();
            $('#edit_comment_close').click();
          }
        });

        //if you press esc
        $(document).keydown(function(e) {
          if (e.keyCode == 27 && edit_comment_modal === true){
            $('#edit_comment_close').click();
          }
        });

        info_inner_div.append(date_container, content);
        comment_info.append(info_inner_div)

        comment_card.append(image_div, comment_info, edit_div)
        $('#comments').append(comment_card)

    })
}



// //this gets the last category posted in a group
// //is called when you POST the category_submit
var getLastComment = function(){
    $.ajax({
    url: current_url + 'comments/' + current_suggestion + "/last",
    dataType: 'json',
    success: function(data){
        getCommentInfo(data);
    }
  });  
}



//post comment
$('#comment_submit').click(function(){
    if(current_suggestion != ""){
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
            getLastComment();
          }
      })
      $('#comment_input_area').blur();
    }
})// end getting categories


//comment press enter
$('#comment_input_area').keypress(function(e){
  if(e.keyCode == 13){
    $('#comment_submit').click();
  }
});

