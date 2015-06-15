
//these track what is clicked on
var current_url = document.URL;
var current_user;
var current_user_name;
var current_trip;
var current_category;
var current_suggestion;
var current_avatar;




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
        // console.log(data)
        current_user = data._id;
        current_user_name = data.first_name + " " + data.last_name;
        current_trip = data.last_trip;
        // console.log(current_trip)
        attendingTrips(data.trips)
        if(data.trips.length === 0){
            $('#current_trip').click()
        }
    }
  });
};

getUser();


//This renders the current user's trips
var userTripInfo = function(data){


    if(data.length > 0){
        $('#group_chat, #categories_nav, #friends_nav, #add_platupi').show('fold', 400);
    }else{
        $('#group_chat, #categories_nav, #friends_nav, #add_platupi').hide('fold', 400);        
    }

    //this sets the default of trip to the first one
    $('.trip_card_selected').attr('class', 'trip_card')
    var counter = 0;
    data.forEach(function(trip){

        var trip_card = $('<ul></ul>');
        if(counter === data.length - 1){

        $('#current_trip').text(trip.title);
        // current_trip = trip._id;
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
        trip_card.append(title, location, duration, description);
        trip_card.click(function(){

        	makeMap(trip.lat, trip.lng)

            $('#comment_suggestion_content, #suggestion_voting, #suggestion_avatar, #suggestion_comment_link').css('visibility', 'hidden')
            current_category = "";
            $('#categories').empty();
            $('#suggestion_content').empty();
            $('#comments').empty();
            current_suggestion = "";
            current_trip = $(this).attr('id');

            var last_trip = {
                last_trip: current_trip
            }


            $.ajax({
                    url: current_url + "users/settrip/" + current_user,
                    type: 'PUT',
                    data: last_trip,
                    success: function(data){
                        // console.log(data)
                    }
            }); 

            var avatar;

            if(trip.taken_avatars.length === 0){
                avatar = '/images/users.jpg'
            }else{
                trip.taken_avatars.forEach(function(each, index){
                    if(each.user_id === current_user){
                        avatar = '/images/hats/color_hats/' + each.avatar;

                    }
                    if(index === trip.taken_avatars.length - 1 && avatar === undefined){
                        avatar = '/images/users.jpg'
                    }
                })
            }

            // this sets the avatar
            current_avatar = avatar;
            $('.current_user_avatar').attr('src', avatar);

            //this function is in the chat.js file
            makeNewWebsocket()

            // THIS SETS THE INVITE MODAL TO HAVE THE CORRECT LINK
            // var invite_url = current_url + 'invite/' + current_trip + '/' + current_user;
            // $('#invite_url').text(invite_url).attr('href', invite_url)


            //when the add friends is clicked it make the 
            $('#add_friend').click(function(){

                var makeInviteUrl = function(){
                    // console.log('hello')

                var invite_body = {
                    user_id: current_user,
                    trip_id: current_trip
                }


                $.ajax({
                  url: current_url + 'invites',
                  type: 'POST',
                  data: invite_body,
                  success: function(data, textStatus, jqXHR)
                    {
                        // console.log(data)
                    }
                })
                }


                $.ajax({
                    url: current_url + 'invites/' + current_user + '/' + current_trip,
                    dataType: 'json',
                    success: function(data){
                        // console.log(data)
                        if(data.length === 0){
                            makeInviteUrl();
                        }else{
                            // console.log(data)
                            var invite_url = current_url + 'invites/' + data[0].domain_name;
                            $('#invite_url').text(invite_url).attr('href', invite_url);
                            $('#invite_url').text(invite_url).attr('href', invite_url);
                        }
                    }
                });       

            })

            var makeFriends = function(trip){
            $('#friends').empty();
            trip.attending.forEach(function(friend){
                if(typeof friend.user_id == "string"){
                    $.ajax({
                        url: current_url + 'users/' + friend.user_id,
                        dataType: 'json',
                        success: function(data){
                            if(data._id != current_user){
                                var name = $('<h2></h2>').text(data.first_name).attr('id', data._id);
                                name.attr('class', 'friend_name')
                                $('#friends').append(name)
                                    // .attr('id', data._id)
                                // name.click(function(){
                                //     alert('it worked!')
                                // })
                            }
                        }
                    });

                }else{
                    if( typeof friend.user_id == "object" ){
                        var name = $('<h2></h2>').text(friend.user_id.first_name).attr('id', friend.user_id._id);
                        name.attr('class', 'friend_name')
                        $('#friends').append(name)
                        // name.click(function(){
                        //     alert('it worked 2!')
                        // })
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

            var last_trip = {
                last_trip: current_trip
            }

            $.ajax({
                    url: current_url + "users/settrip/" + current_user,
                    type: 'PUT',
                    data: last_trip,
                    success: function(data){
                        // console.log(data)
                    }
            }); 


        })



    })
        // $('.trip_card:first').click()
        if(current_trip === undefined){
            $('.trip_card:first').click()
        }else{
            $('ul#' + current_trip + '.trip_card').click()
        }

}


//this gets the current user's trips they created then passes it to another function to render it
var getUserTrips = function(){
    $.ajax({
    url: current_url + 'trips',
    dataType: 'json',
    success: function(data){
        userTripInfo(data);
        // console.log(data)
    }
  })
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



//post request to POST a new trip
$('#trip_add').click(function(){

    var attending_data = {
        user_id: current_user
    }


  var formData = {
    title: $('#trip_name').val(),
    description: $('#trip_description').val(),
    start: $('#trip_start_date').val(),
    finish: $('#trip_end_date').val(),
    created_by: current_user,
    attending: attending_data,
    location: ""
  }




	 	var location = $('#trip_location').val();
	 	console.log(location)

		var plus = location.split(' ').join('+');
		// console.log(plus)
		console.log(plus)
	    

	    var stuff = {
	    	location: plus
	    }
	    console.log(stuff)


	    $.ajax({
	    	url: 'maps/find_geocode',
	    	dataType: 'json',
	    	type: 'POST',
	    	data: stuff,
	    	success: function(data){
	    		var lat = data.results[0].geometry.location.lat;
	    		var lng = data.results[0].geometry.location.lng;
	    		console.log(data)

	    		// formData.geolocation = {};
	    		formData.lat = lat;
	    		formData.lng = lng;

	    		formData.location = data.results[0].address_components[0].long_name;
	    		console.log(formData)
	    		// getActivites(lat, lng)
	    		// makeMap(lat, lng)
	    		makeTrip()

	    	}
	    })

		var makeTrip = function(){
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
		        $('#comment_suggestion_content, #suggestion_voting, #suggestion_avatar').css('visibility', 'hidden');
		        $('#view_trips').click();

		        }
		    });  

		}

})//end POST user trip info






// })//end POST user trip info

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

        // $("#categories h2").hover(
        //   function() {
        //     $( this ).attr('background-color', 'red');
        //     console.log('hi')
        //   }, function() {
        //     $( this ).attr('background-color', 'white');
        //     console.log('bye')
        //   }
        // );

        category_name.click(function(){
            $('#suggestion_content').empty();
            $('#comments').empty();

            // this toggles the chat

            

            current_suggestion = "";
            $('#comment_suggestion_content, #suggestion_voting, #suggestion_avatar, #suggestion_comment_link').css('visibility', 'hidden');


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
    trip_id: current_trip,
    user_id: current_user 
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

    console.log(data)
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
        created_by.attr('class', 'created_by');
        var date = $('<h3></h3>').text(suggestion.created.substring(0, 10)).attr('class', 'date');

        content_div.append(title, created_by, date)
        suggestion_info.append(content_div)

        // voting section 
        var suggestion_voting = $('<div></div').attr('class', 'suggestion_voting')
        var inside_voting = $('<div></div>');
        suggestion_voting.append(inside_voting);

        var up_vote_div = $('<div></div>');
        var up_span = $('<span></span').attr('class', 'fa fa-arrow-circle-up fa-2x green upvote_button')
        var up_count = $('<h2></h2>').attr('class', 'suggestion_upvote_count')
        

        var upvote_array = []
        suggestion.upvote.forEach(function(each, index){
            if(upvote_array.indexOf(each.user_id) === -1){
                upvote_array.push(each.user_id)
            }
            if(index === suggestion.upvote.length - 1){
                up_count.text(upvote_array.length)
            }
        })
        if(suggestion.upvote.length === 0){
            up_count.text('0')
        }

        up_vote_div.append(up_span, up_count)

        var down_vote_div = $('<div></div>');
        var down_span = $('<span></span>').attr('class', 'fa fa-arrow-circle-down fa-2x red downvote_button');
        var down_count = $('<h2></h2>').attr('class', 'suggestion_downvote_count')


        var downvote_array = []
        suggestion.downvote.forEach(function(each, index){
            if(downvote_array.indexOf(each.user_id) === -1){
                downvote_array.push(each.user_id)
            }
            if(index === suggestion.downvote.length - 1){
                down_count.text(downvote_array.length)
            }
        })

        if(suggestion.downvote.length === 0){
            down_count.text('0')
        }

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
              console.log(edit_link)
              var start = edit_link(0, 4);

              $('#suggestion_comment_link').text('Link')
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
        $('#suggestion_content').prepend(suggestion_card)



        suggestion_card.click(function(event){
            if($(this).attr('id') != current_suggestion){
            event.stopPropagation();
            $('#comments').empty();
            $('.suggestion_clicked').removeClass('suggestion_clicked')



            current_suggestion = suggestion._id;
            $(this).addClass('suggestion_clicked')


            //voting from the middle column
            $('.downvote_button').click(function(event){
                event.stopPropagation();
                $('#downvote').click();
            })

            $('.upvote_button').click(function(event){
                event.stopPropagation();
                $('#upvote').click();
            })


            var createSuggestionCard = function(data){
                $('#comment_suggestion_content, #suggestion_voting, #suggestion_avatar').css('visibility', 'visible')
                $('#suggestion_name').text(suggestion.user_id.first_name + ' ' + suggestion.user_id.last_name);
                $('#suggestion_date').text(data[0].created.substring(0, 10));
                $('#suggestion_comment_about').text(data[0].content);

                $('#suggestion_avatar').attr('class', '');

                var valid_url = ValidUrl(suggestion.link);
                // if there is a suggestion link render it
                //and checks if its valid

                var final_link = data[0].link;

                var start = data[0].link.substr(0, 4)

                if(start != 'http'){
                    final_link = 'http://' + final_link
                }

                if(suggestion.link && valid_url === true){
                    $('#suggestion_comment_link').css('visibility', 'visible')
                    $('#suggestion_comment_link').text('Link');
                    $('#suggestion_comment_link').attr('href', final_link);
                    $('#suggestion_comment_link').attr('class', 'valid_link');
                    $('#suggestion_comment_link').removeAttr("disabled");
                }else{
                    $('#suggestion_comment_link').css('visibility', 'visible')
                    $('#suggestion_comment_link').text('Link');
                    $('#suggestion_comment_link').removeAttr('href');
                    $('#suggestion_comment_link').attr('class', 'invalid_link')
                    $("#suggestion_comment_link").attr("disabled", "disabled");
                }

                var avatar;

                //this changes main avatar
                if(data[0].user_id.taken_avatars.length === 0){
                    avatar = '/images/users.jpg';
                }else{
                    if(data[0].user_id.taken_avatars.length > 0){
                    data[0].user_id.taken_avatars.forEach(function(each, index){
                        if(each.trip_id === current_trip){
                            avatar = '/images/hats/color_hats/' + each.avatar;
                        }
                    })
                    }else{
                            avatar = '/images/users.jpg'            
                        }   
                    }
                
                //this checks if the current suggestion is by the current user and make
                //the avatar change if they 
                if(data[0].user_id._id === current_user){
                    $('#suggestion_avatar img').attr('class', 'current_user_avatar')
                }else{
                    $('#suggestion_avatar img').attr('class', '')
                }

                $('#suggestion_avatar img').attr('src', avatar)
                $('#upvote_images').empty();
                $('#downvote_images').empty();

                //this safeguards from previous errors with double put requests
                var upvote_check = [];

                //this appends the little platipi for voting
                data[0].upvote.forEach(function(each, index){   
                    var found = false;
                    var image;
                    if(each.user_id.taken_avatars.length > 0 && upvote_check.indexOf(each.user_id._id) === -1){
                        upvote_check.push(each.user_id._id)
                        each.user_id.taken_avatars.forEach(function(y){
                            if(y.trip_id === current_trip && found === false){
                                found = true;
                                image = $('<img>');
                                image.attr('src', 'images/hats/color_hats/' + y.avatar)
                                $('#upvote_images').append(image) 
                                if(each.user_id._id === current_user){
                                    image.attr('class', 'current_user_avatar')
                                }

                            }
                        })
                    }

                    if(each.user_id.taken_avatars.length === 0){
                        image = $('<img>');
                        image.attr('src', 'images/users.jpg');
                        $('#upvote_images').append(image);
                        // console.log('appending image')
                        if(each.user_id._id === current_user){
                            image.attr('class', 'current_user_avatar')
                        }
                    }

                    //this shows the name on hover
                    image.hover(function(e){
                        $('#voting_hover_div').text(each.user_id.first_name + ' ' + each.user_id.last_name);
                        $('#voting_hover_div').css({
                            left: $(this).position().left + $(this).width()/2,
                            top: $(this).position().top - 20,
                            'border': '3px solid #98C06A',
                        }).show()
                    }, function(){
                        $('#voting_hover_div').hide()
                    })         
                })//end upvote

                //this safeguards from previous errors with double put requests
                var downvote_check = [];

                data[0].downvote.forEach(function(each, index){
                    var found = false;
                    var image_two;
                    if(each.user_id.taken_avatars.length > 0 && downvote_check.indexOf(each.user_id._id) === -1){
                        downvote_check.push(each.user_id._id)
                        each.user_id.taken_avatars.forEach(function(y){
                            if(y.trip_id === current_trip && found === false){
                                found = true;
                                image_two = $('<img>');
                                image_two.attr('src', 'images/hats/color_hats/' + y.avatar)
                                $('#downvote_images').append(image_two)
                                if(each.user_id._id === current_user){
                                    image_two.attr('class', 'current_user_avatar')
                                }                              
                            }
                        })
                    }

                    if(each.user_id.taken_avatars.length === 0){
                        image_two = $('<img>');
                        image_two.attr('src', 'images/users.jpg');
                        $('#downvote_images').append(image_two);
                        if(each.user_id._id === current_user){
                            image_two.attr('class', 'current_user_avatar')
                        } 
                    }

                    //this shows the name on hover
                    image_two.hover(function(e){
                        $('#voting_hover_div').text(each.user_id.first_name + ' ' + each.user_id.last_name);
                        $('#voting_hover_div').css({
                            left: $(this).position().left + $(this).width()/2,
                            top: $(this).position().top - 20,
                            'border': '3px solid #F33533',
                        }).show()
                    }, function(){
                        $('#voting_hover_div').hide()
                    })    
                })//end downvote
            }


            var getSuggestion = function(){
                $.ajax({
                url: current_url + 'suggestions/' + current_suggestion + '/one',
                dataType: 'json',
                success: function(data){
                  createSuggestionCard(data);
                }
                
              });
            }//end getSuggestion

            getSuggestion();
        }
        console.log('hiiii')
        })




    })
    $('.suggestion_card:first-child').click();



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





// // //this gets the last category posted in a group
// // //is called when you POST the category_submit
// var getLastSuggestion = function(){
//     $.ajax({
//     url: current_url + 'suggestions/' + current_category + "/last",
//     dataType: 'json',
//     success: function(data){
//         getSuggestionInfo(data);
//     }
//   });  
// }






// this posts a new suggestion
$('#suggestion_submit').click(function(){
  var formData = {
    title: $('#suggestion_title').val(),
    content: $('#suggestion_about').val(),
    link: $('#suggestion_link').val(),
    category_id: current_category,
    trip_id: current_trip,
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




