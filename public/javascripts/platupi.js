


$('#add_platupi').click(function(){

$('#platupi').empty();

var route = '../images/hats/color_hats/'
var start = 'hat_';
var number = 1;
var end = '.png';

var current_platupus = '';

for(var i = 1; i < 20; i++){
	var image = $('<img>').attr('src', route + start + i + end)
		.attr('id', start + i)
			.attr('class', 'platupus');
	$('#platupi').append(image);
}


$('.platupus').click(function(){
	$('.platupus').css('border', '3px solid lightgrey')
	$(this).css('border', '3px solid orange');
	current_platupus = $(this).attr('id');
	// console.log(current_trip)
	// console.log(current_platupus);
})


$('#choose_avatar').click(function(){

var avatar_file = {
	avatar: current_platupus + '.png',
  user_id: current_user
}

var user_avatar_file = {
  avatar: current_platupus + '.png',
  trip_id: current_user
}


var setAvatar = function(){
    $.ajax({
    url: current_url + 'trips/avatar/' + current_trip + '/' + current_user + '/set',
    type: 'PUT',
    dataType: 'json',
    data: avatar_file,
    success: function(data){
    	console.log(data)
    	console.log('it set')
    }
  });



    $.ajax({
    url: current_url + 'users/avatar/' + current_trip + '/' + current_user + '/set',
    type: 'PUT',
    dataType: 'json',
    data: user_avatar_file,
    success: function(data){
    	console.log(data)
    	console.log('users set')
    }
  });

    $('.current_user_avatar').attr('src', '/images/hats/color_hats/' + current_platupus + '.png')
    current_avatar = '/images/hats/color_hats/' + current_platupus + '.png';

}


var pushAvatar = function(){
  // avatar_file.user_id = current_user;
    $.ajax({
    url: current_url + 'trips/avatar/' + current_trip + '/' + current_user + '/push', 
    type: 'PUT',
    dataType: 'json',
    data: avatar_file,
    success: function(data){
    	console.log(data)
    	console.log('it pushed')
    }
  });

    $.ajax({
    url: current_url + 'users/avatar/' + current_trip + '/' + current_user + '/push', 
    type: 'PUT',
    dataType: 'json',
    data: user_avatar_file,
    success: function(data){
    	console.log(data)
    	console.log('users pushed')

    }
  });

    $('.current_user_avatar').attr('src', '/images/hats/color_hats/' + current_platupus + '.png')
    current_avatar = '/images/hats/color_hats/' + current_platupus + '.png';

}




var updateAvatars = function(avatars){
	console.log(avatars)
	if(avatars.length === 0){
		console.log('push no avatars choosen')
		pushAvatar();
	}else{

	avatars.forEach(function(each, index){
    console.log(each)
		var found = false;
		if(each.user_id === current_user){
			console.log('set');
			found = true;
			setAvatar();
		}

		if(index === avatars.length - 1 && found === false){
			console.log('push user not found');
			pushAvatar();
		}
	})

  }
}


var getAvatars = function(){
    $.ajax({
    url: current_url + 'trips/avatar/' + current_trip + '/' + current_user, 
    dataType: 'json',
    success: function(data){
        console.log(data)
        updateAvatars(data.taken_avatars)
    }
  });
}

getAvatars();




  //   $.ajax({
  //   url: current_url + 'trips/avatar/' + current_trip + '/' + current_user, 
  //   method: 'PUT',
  //   data: avatar_file,
  //   dataType: 'json',
  //   success: function(data){
  //       console.log('IT WORKED!')    }
  // });



	$('#close_platupi').click();
})

})