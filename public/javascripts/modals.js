//this is for the current trip modal
//move to own file

// // trip modal
// var current_trip_section = document.getElementById('current_trip')
// current_trip_section.addEventListener('click', function(){
//   var modal = document.getElementById('overlay');
//   if(modal.style.visibility === "visible"){
//     modal.style.visibility = "hidden";
//   }else{
//     modal.style.visibility = "visible";
//   }
//   var modal_close = document.getElementById('modal_close')
//   modal_close.addEventListener('click', function(){
//     modal.style.visibility = "hidden";
//   })
// });


$('#current_trip').click(function(event){
  $('#overlay').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
})

$('#modal_close').click(function(event){
  $('#overlay').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden')
    });
})


//toggles view
$('#add_trip').click(function(){
  // $('#trip_content').hide();
  // $('#make_trip_content').show();
    $('#trip_content').hide( "drop", { direction: "down" }, "slow",
      function(){
        $('#make_trip_content').show( "drop", { direction: "up" }, "slow" );
      });
})

$('#view_trips').click(function(){
  // $('#trip_content').show();
  // $('#make_trip_content').hide();
    $('#make_trip_content').hide( "drop", { direction: "down" }, "slow",
      function(){
        $('#trip_content').show( "drop", { direction: "up" }, "slow" );
      });
})


// // suggestion modal
// var add_suggestion = document.getElementById('suggestion_header')
// add_suggestion.addEventListener('click', function(){
//   var modal = document.getElementById('suggestion_modal');
//   if(modal.style.visibility === "visible"){
//     modal.style.visibility = "hidden";
//   }else{
//     modal.style.visibility = "visible";
//   }
//   var suggestion_close = document.getElementById('suggestion_close')
//   suggestion_close.addEventListener('click', function(){
//     modal.style.visibility = "hidden";
//   })
// });


$('#suggestion_header').click(function(event){
  $('#suggestion_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
})

$('#suggestion_close').click(function(event){
  $('#suggestion_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden')
    });
})



// // comment modal
// var add_category = document.getElementById('add_category')
// add_category.addEventListener('click', function(){
//   var modal = document.getElementById('category_modal');
//   if(modal.style.visibility === "visible"){
//     modal.style.visibility = "hidden";
//   }else{
//     modal.style.visibility = "visible";
//   }
//   var category_close = document.getElementById('category_close')
//   category_close.addEventListener('click', function(){
//     modal.style.visibility = "hidden";
//   })
// });



$('#add_category').click(function(event){
  $('#category_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
})

$('#category_close').click(function(event){
  $('#category_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden')
    });
})


// // comment modal
// var add_friend = document.getElementById('add_friend')
// add_friend.addEventListener('click', function(){
//   var modal = document.getElementById('friend_modal');
//   if(modal.style.visibility === "visible"){
//     modal.style.visibility = "hidden";
//   }else{
//     modal.style.visibility = "visible";
//   }
//   var friend_close = document.getElementById('friend_close')
//   friend_close.addEventListener('click', function(){
//     modal.style.visibility = "hidden";
//   })
// });



$('#add_friend').click(function(event){
  $('#friend_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
})

$('#friend_close').click(function(event){
  $('#friend_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden')
    });
})


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



$('#invite_friends').click(function(event){
  $('#invite_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
})

$('#invite_close').click(function(event){
  $('#invite_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden')
    });
})