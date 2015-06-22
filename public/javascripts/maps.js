var map;
var latLng = {};


//this will make markers
var makeMarker = function(lat, lng, title){
	var myLatlng = new google.maps.LatLng(lat, lng);

	var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      title: title
	});

}






//this makes the map
var makeMap = function(lat, lng){

	latLng.lat = lat;
	latLng.lng = lng;

	console.log('hello')
	var myLatlng = new google.maps.LatLng(lat, lng);
	//this is the properties to configure how your map will look, there are more options
	var mapOptions = {
	center: { lat: lat, lng: lng },
	zoom: 13
	};
	// var map creates a new google map with the id
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    // var makeMarkers = function(){
    // var marker = new google.maps.Marker({
    //       position: myLatlng,
    //       map: map,
    //       title: 'Hello World!'
    // });     
    // }



  var open = false
  $('#open_button').click(function(){
    if(open === false){
    	// console.log(false)
      $('#map_button').animate({right: '0'}, 'slow')
      $('#suggestion_container').hide('slow', function(){
        $('#map-container').animate({
            width: '100%',
        }, {
            duration: 'slow',
            // specialEasing:{
            //     width: 'slide',
            //     height: 'slide'
            // },
            start: function(){
                $('#map_suggestions').show(1000).css({'display': 'flex', 'display': '-webkit-flex'})
                // map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                $('#open_button').attr('class', 'fa fa-long-arrow-left fa-2x')
                // $('#map_button').animate({right: '0'}, 'slow')
                open = true;

            },
            complete: function(){
                // getFood(mapOptions.center.lat, mapOptions.center.lng)
            }
        })
      });
    }else{
      $('#map_button').animate({right: '40%'}, 'slow')
      $('#about_place').hide('slow')
      $('#suggestion_container').show('slow', function(){

        $('#map-container').animate({
            width: '60%',
        }, {
            duration: 'slow',
            start: function(){
                $('#map_suggestions').hide(1000)
                // map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                $('#open_button').attr('class', 'fa fa-long-arrow-right fa-2x');

                open = false
            },
            complete: function(){}
        })
      });

    }
    })//end click
}





//this autocompletes the trip location
  var autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('trip_location')),
      {
      	//this is for counties or regions
        // types: ['(regions)'],
        types: ['(cities)']
        // componentRestrictions: countryRestrict
  });





var aboutPlace = function(place, lat, lng){
	// console.log(place)
	//populates the info

	console.log(lat)
	console.log(lng)

	$('#about_place_info').empty();

	$h3 = $('<h3></h3>')
	$h4 = $('<h4></h4>')

	var name = $h3.clone().text(place.name)
	var address = $h4.clone().text(place.formatted_address)
	var number = $h4.clone().text(place.formatted_phone_number)
	var rating = $h4.clone().text(place.rating);

	var link = $('<a></a>').attr('href', place.website).attr('target', 'blank').text(place.website);

	$('#about_place_info').append(name, address, number, rating, link)



	//renders the categories in the modal
	var makeCategoryCards = function(data){
		// $('map_suggestion_category')
		// console.log(data)
		$('#map_suggestion_category').empty()
		data.forEach(function(each){
			var $card = $('<div></div>').attr('class', 'category_sug_card')
			var $category_name = $('<h4></h4>').text(each.name)
			var $add_button = $('<button></button>').text('Add It!')

			$card.append($category_name, $add_button)
			$('#map_suggestion_category').append($card)

			$add_button.click(function(){

				// console.log(place)
				// console.log(each)
				// console.log(data)

				var content = {
					'title': place.name,
					'link': place.website,
				    'user_id': current_user,
				    'category_id': each._id,
				    'trip_id': current_trip,
				    'archived': false
				}

				var votes = {
					'user_id': current_user,
					'vote': true,
					'comment': 'I want to do this'
				}

				var reference = {
					'name': 'Google',
					'ref_id': place.place_id
				}

				var geolocation = {
					'lat': lat,
					'lng': lng
				}

				// var geocode = {
				// 	'lat': ,
				// 	'lng':
				// }

				var makeVote = function(id){
				  $.ajax({    
				    url: current_url + "suggestions/votes/" + id,
				    type: 'PUT',
				    data: votes,
				    timeout: 1000,
				    success: function(data){
				    	console.log(data)
				      }
				  })
				}

				var makeReference = function(id){
					// console.log('make reference!')
				  $.ajax({    
				    url: current_url + "suggestions/reference/" + id,
				    type: 'PUT',
				    data: reference,
				    timeout: 1000,
				    success: function(data){
				    	console.log(data)
				      }
				  })
				}


				var makeGeocode = function(id){
					// console.log('make reference!')
				  $.ajax({    
				    url: current_url + "suggestions/geocode/" + id,
				    type: 'PUT',
				    data: geolocation,
				    timeout: 1000,
				    success: function(data){
				    	console.log(data)
				      }
				  })
				}
		

			  $.ajax({    
			    url: current_url + "suggestions",
			    type: 'POST',
			    data: content,
			    success: function(data){
			    	$('#map_suggestion_close').click()
			    	$('#close_about_place').click()
			        makeReference(data._id)
			        makeVote(data._id)
			        makeGeocode(data._id)
			        getLastSuggestion(data._id)
			        // makereference
			      }
			  })


			})

		})
	}

	//when someone clicks the add button
	$('#add_map_suggestion').click(function(){
	    $.ajax({
		    url: current_url + 'categories/' + current_trip,
		    dataType: 'json',
		    success: function(data){
		    	// console.log(data)
		    	makeCategoryCards(data)
		       
		    }
	  	});

	})//add click


	$('.category_sug_card button').click(function(){
		// console.log(place.name)
	})

}




//gets the gooogle place details
var getDetails = function(place_id, lat, lng){

	var request = {
		placeId: place_id
	}

	var service = new google.maps.places.PlacesService(map);

	service.getDetails(request, callback);

	function callback(place, status) {
	  if (status == google.maps.places.PlacesServiceStatus.OK) {
	    // createMarker(place);
	    // console.log(place)
	    console.log(lat)
	    aboutPlace(place, lat, lng)
	  }
	}

}



var makeCards = function(title, data){
	var categoryDiv = $('<div></div>')
		.attr('class', 'search_heading')
		.append($('<h3></h3>').text(title));
	$('#search-suggestions').append(categoryDiv)
	// var title_head = $('<h3><h3>').text(title);
	// categoryDiv.append(title_head)

	data.results.forEach(function(each){
		// console.log(each)

		var $card = $('<div></div>').attr('class', 'search_suggestion_card');
		var $name = $('<h3></h3>').text(each.name);
		var $price_level = $('<p></p>').text('Price Level: ' + each.price_level);
		var $rating = $('<p></p>').text('Rating: ' + each.rating);
		var $star = $('<span></span>').attr('class', 'fa fa-star-o add_star')

		$card.click(function(event){
			// console.log(each)
			getDetails(each.place_id, each.geometry.location.lat, each.geometry.location.lng)

			var place = $('#map_suggestions').position();
			var width = $('#map_suggestions').width();
			var height = $('#map_suggestions').height();

			// console.log(place)
			// console.log(width)
			// console.log(height)

			$('#about_place').css({
				left: width
			}).animate({top: $(this).position().top + $(this).height()}).show('slow')

			$('#close_about_place').click(function(){
				$('#about_place').hide('slow')
			})
		})

		$card.append($name, $price_level, $rating, $star);
		$('#search-suggestions').append($card)



		makeMarker(each.geometry.location.lat, each.geometry.location.lng, each.name)
	})

}



//THIS GETS THE THE RESULTS FROM GOOGLE PLACES
var getFood = function(lat, lng){
    var title = 'Food'

    $.ajax({
        url: 'maps/food',
        type: 'POST',
        dataType: 'json',
        data: latLng,
        success: function(data){
            // console.log(data)
            makeCards(title, data)
            // renderFood(data)
            // getDetails(data)
        }
    });

}

var getLodging = function(lat, lng){
	var title = 'Lodging';
	$.ajax({
        url: 'maps/lodging',
        type: 'POST',
        dataType: 'json',
        data: latLng,
        success: function(data){
        	// console.log(data)
        	makeCards(title, data)
        	// renderLodging(data)
        }
    });
}

var getNightlife = function(lat, lng){
	var title = 'Nightlife';
	$.ajax({
        url: 'maps/nightlife',
        type: 'POST',
        dataType: 'json',
        data: latLng,
        success: function(data){
        	// console.log(data)
        	makeCards(title, data)
        	// renderNightlife(data)
        }
    });
}

var getCulture = function(lat, lng){
	var title = 'Culture';
		$.ajax({
	        url: 'maps/culture',
	        type: 'POST',
	        dataType: 'json',
	        data: latLng,
	        success: function(data){
	        	// console.log(data)
	        	makeCards(title, data)
	        	// renderCulture(data)
	        }
	    });
}


var getParks = function(lat, lng){
	var title = 'Parks';
	$.ajax({
        url: 'maps/parks',
        type: 'POST',
        dataType: 'json',
        data: latLng,
        success: function(data){
        	// console.log(data)
        	makeCards(title, data)
        	// renderParks(data)
        }
    });
}


var getShopping = function(lat, lng){
	var title = 'Shopping';
	$.ajax({
        url: 'maps/shopping',
        type: 'POST',
        dataType: 'json',
        data: latLng,
        success: function(data){
        	// console.log(data)
        	makeCards(title, data)
        	// renderShopping(data)
        }
    });
}



//this is for clicking on the buttons to find things
$('button#find_food.search_button').click(function(){
	if($(this).attr('class') != 'search_button search_button_clicked'){
		getFood(latLng.lat, latLng.lng)
	}
	
})

$('button#find_lodging.search_button').click(function(){
	if($(this).attr('class') != 'search_button search_button_clicked'){
		getLodging(latLng.lat, latLng.lng)
	}
})

$('button#find_nightlife.search_button').click(function(){
	if($(this).attr('class') != 'search_button search_button_clicked'){
		getNightlife(latLng.lat, latLng.lng)
	}
})

$('button#find_culture.search_button').click(function(){
	if($(this).attr('class') != 'search_button search_button_clicked'){
		getCulture(latLng.lat, latLng.lng)
	}
})

$('button#find_parks.search_button').click(function(){
	if($(this).attr('class') != 'search_button search_button_clicked'){
		getParks(latLng.lat, latLng.lng)
	}
})

$('button#find_shopping.search_button').click(function(){
	if($(this).attr('class') != 'search_button search_button_clicked'){
		getShopping(latLng.lat, latLng.lng)
	}
})

//this toggles the button
$('.search_button').click(function(){
	$(this).toggleClass('search_button_clicked')
})



