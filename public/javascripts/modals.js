$(document).ready(function(){

//tracks the open modalexca
var close_modal;


$('#chat_input').hide();



$(document).keydown(function(e) {
  if (e.keyCode == 27){
    $(close_modal).click();
  }
});

//adds a trip
$('#current_trip').click(function(event){
  $('#overlay').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300)
      .zIndex('100')
  close_modal = '#modal_close'
})

$('#modal_close').click(function(event){
  $('#overlay').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden').zIndex('-100')
      close_modal = '';
    });
});

$('#trip_end_date').keypress(function(e){
  if(e.keyCode == 13){
    $('#trip_add').click();
    $('#modal_close').click();
  }
});



// $('html').click(function() {
//   if(close_modal != ''){
//     $('#modal_close').click();
//   }
// });

// $('#overlay > div').click(function(event){
//     event.stopPropagation();
// });


//toggles view of trips
$('#add_trip').click(function(){
    $('#trip_content').hide( "drop", { direction: "down" }, "slow",
      function(){
        $('#make_trip_content').show( "drop", { direction: "up" }, "slow" );
      });
})

$('#view_trips').click(function(){
    $('#make_trip_content').hide( "drop", { direction: "down" }, "slow",
      function(){
        $('#trip_content').show( "drop", { direction: "up" }, "slow" );
      });
})





//add suggestion
$('#suggestion_header').click(function(event){
  $('#suggestion_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
  close_modal = '#suggestion_close'
})

$('#suggestion_close').click(function(event){
  $('#suggestion_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden')
      close_modal = '';
    });
})

$('#suggestion_link').keypress(function(e){
  if(e.keyCode == 13){
    $('#suggestion_submit').click();
    $('#suggestion_close').click();
  }
});




//adds comments
$('#add_category').click(function(event){
  $('#category_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
  close_modal = '#category_close';
})

$('#category_close').click(function(event){
  $('#category_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden');
      close_modal = '';
    });
})

$('#category_title').keypress(function(e){
  if(e.keyCode == 13){
    $('#category_submit').click();
    $('#category_close').click();
  }
});



//add friends
$('#add_friend').click(function(event){
  $('#friend_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
  close_modal = '#friend_close';
})

$('#friend_close').click(function(event){
  $('#friend_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden');
      close_modal = '';
    });
})

$('#friend_email').keypress(function(e){
  if(e.keyCode == 13){
    $('#find_friend_submit').click();
  }
});



//invite friends
$('#invite_friends').click(function(event){
  $('#invite_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
  close_modal = '#invite_close';
})

$('#invite_close').click(function(event){
  $('#invite_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden')
      close_modal = '';
    });
})




})//end document ready