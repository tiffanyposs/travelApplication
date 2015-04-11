//this is for the current trip modal
//move to own file

// trip modal
var current_trip = document.getElementById('current_trip')
current_trip.addEventListener('click', function(){
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
  $('#trip_content').css('display', 'none');
  $('#make_trip_content').css('display', 'flex')
})

$('#view_trips').click(function(){
  $('#trip_content').css('display', 'inherit');
  $('#make_trip_content').css('display', 'none')
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