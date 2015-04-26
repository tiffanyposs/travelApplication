//this is for the current trip modal
//move to own file

// trip modal
var current_trip_section = document.getElementById('current_trip')
current_trip_section.addEventListener('click', function(){
  var modal = document.getElementById('overlay');
  if(modal.style.visibility === "visible"){
    modal.style.visibility = "hidden";
  }else{
    modal.style.visibility = "visible";
  }
  var modal_close = document.getElementById('modal_close')
  modal_close.addEventListener('click', function(){
    modal.style.visibility = "hidden";
  })
});

//toggles view
$('#add_trip').click(function(){
  // $('#trip_content').css('display', 'none');
  $('#trip_content').hide();
  // $('#make_trip_content').css('display', 'flex')
  $('#make_trip_content').show();
})

$('#view_trips').click(function(){
  // $('#trip_content').css('display', 'inherit');
  $('#trip_content').show();
  // $('#make_trip_content').css('display', 'none')
  $('#make_trip_content').hide();

})


// suggestion modal
var add_suggestion = document.getElementById('suggestion_header')
add_suggestion.addEventListener('click', function(){
  var modal = document.getElementById('suggestion_modal');
  if(modal.style.visibility === "visible"){
    modal.style.visibility = "hidden";
  }else{
    modal.style.visibility = "visible";
  }
  var suggestion_close = document.getElementById('suggestion_close')
  suggestion_close.addEventListener('click', function(){
    modal.style.visibility = "hidden";
  })
});



// comment modal
var add_category = document.getElementById('add_category')
add_category.addEventListener('click', function(){
  var modal = document.getElementById('category_modal');
  if(modal.style.visibility === "visible"){
    modal.style.visibility = "hidden";
  }else{
    modal.style.visibility = "visible";
  }
  var category_close = document.getElementById('category_close')
  category_close.addEventListener('click', function(){
    modal.style.visibility = "hidden";
  })
});



// comment modal
var add_friend = document.getElementById('add_friend')
add_friend.addEventListener('click', function(){
  var modal = document.getElementById('friend_modal');
  if(modal.style.visibility === "visible"){
    modal.style.visibility = "hidden";
  }else{
    modal.style.visibility = "visible";
  }
  var friend_close = document.getElementById('friend_close')
  friend_close.addEventListener('click', function(){
    modal.style.visibility = "hidden";
  })
});


// comment modal
var invite_friend = document.getElementById('invite_friends')
invite_friend.addEventListener('click', function(){
  var modal = document.getElementById('invite_modal');
  if(modal.style.visibility === "visible"){
    modal.style.visibility = "hidden";
  }else{
    modal.style.visibility = "visible";
  }
  var invite_close = document.getElementById('invite_close')
  invite_close.addEventListener('click', function(){
    modal.style.visibility = "hidden";
  })
});