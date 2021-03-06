var current_platupus = '';

$('#add_platupi').click(function(){

$('#platupi').empty();

var route = '../images/hats/color_hats/';
var grey_route = '../images/hats/grey_hats/';
var start = 'hat_';
var number = 1;
var end = '.png';
var total_avatars = 19;


var used_avatars = [];
console.log(used_avatars)

var makeAvatarModal = function(){

  for(var i = 1; i <= total_avatars; i++){
    if(used_avatars.indexOf(i) == -1){
    	var image = $('<img>').attr('src', route + start + i + end)
    		.attr('id', start + i)
    			.attr('class', 'platupus');
    	$('#platupi').append(image);
    }if(i === total_avatars){
        used_avatars.forEach(function(each){
          var grey_image = $('<img>').attr('src', grey_route + 'grey_' + start + each + end)
              .attr('class', 'taken_platupus');
          $('#platupi').append(grey_image);
        })
    }
  }


  $('.platupus').click(function(){
    //change this to toggle between classes, not changing the color here
  	$('.platupus').css('border', '3px solid lightgrey')
  	$(this).css('border', '3px solid #1e87c1');
  	current_platupus = $(this).attr('id');
  })

}

var logAvatars = function(avatars){
  avatars.forEach(function(each, index){
    if(each.avatar.length > 4){
      var image_num = parseInt(each.avatar.split('_')[1].split('.')[0]);
      if(used_avatars.indexOf(image_num) === -1){
        used_avatars.push(image_num);
      }
    }

    if(index === avatars.length - 1){
      makeAvatarModal()
    }
  })
  if(avatars.length === 0){
    makeAvatarModal();
  }
}

var checkTakenAvatars = function(){
    $.ajax({
    url: current_url + 'users/avatar/' + current_trip + '/' + current_user, 
    dataType: 'json',
    success: function(data){
        // console.log(data.taken_avatars)
    }
  });

    $.ajax({
    url: current_url + 'trips/avatar/' + current_trip + '/' + current_user, 
    dataType: 'json',
    success: function(data){
        logAvatars(data.taken_avatars)
    }
  });
}

checkTakenAvatars();




})


$('#choose_avatar').click(function(){

if(current_platupus != ""){

var avatar_file = {
  avatar: current_platupus + '.png',
  user_id: current_user
}

var user_avatar_file = {
  avatar: current_platupus + '.png',
  trip_id: current_user
}



var setAvatar = function(){
  console.log('set Avatar')
    $.ajax({
    url: current_url + 'trips/avatar/' + current_trip + '/' + current_user + '/set',
    type: 'PUT',
    dataType: 'json',
    data: avatar_file,
    success: function(data){
      // console.log('it set')
    }
  });



    $.ajax({
    url: current_url + 'users/avatar/' + current_trip + '/' + current_user + '/set',
    type: 'PUT',
    dataType: 'json',
    data: user_avatar_file,
    success: function(data){
    }
  });

    $('.current_user_avatar').attr('src', '/images/hats/color_hats/' + current_platupus + '.png')
    current_avatar = '/images/hats/color_hats/' + current_platupus + '.png';

}


var pushAvatar = function(){
    $.ajax({
    url: current_url + 'trips/avatar/' + current_trip + '/' + current_user + '/push', 
    type: 'PUT',
    dataType: 'json',
    data: avatar_file,
    success: function(data){
    }
  });

    $.ajax({
    url: current_url + 'users/avatar/' + current_trip + '/' + current_user + '/push', 
    type: 'PUT',
    dataType: 'json',
    data: user_avatar_file,
    success: function(data){
    }
  });

    $('.current_user_avatar').attr('src', '/images/hats/color_hats/' + current_platupus + '.png')
    current_avatar = '/images/hats/color_hats/' + current_platupus + '.png';

}



var updateAvatars = function(avatars){
  if(avatars.length === 0){
    pushAvatar();
  }else{

  var found = false;
  avatars.forEach(function(each, index){    
    if(each.user_id === current_user){
      found = true;
      setAvatar();
    }

    if(index === avatars.length - 1 && found === false){
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
        updateAvatars(data.taken_avatars)
    }
  });
}

getAvatars();



}

  $('#close_platupi').click();


})
