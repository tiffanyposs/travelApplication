//this is for the current trip modal
//move to own file
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