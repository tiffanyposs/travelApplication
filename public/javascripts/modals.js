
$(document).ready(function(){

//tracks the open modalexca
var close_modal;

$(document).keydown(function(e) {
  if (e.keyCode == 27){
    $(close_modal).click();
  }
});

//adds a trip
$('#current_trip').click(function(event){
  $('#overlay').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300)
      .zIndex('200')
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


//map suggestion modal
$('#add_map_suggestion').click(function(event){
  $('#map_suggestion_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
  close_modal = '#map_suggestion_close'
})

$('#map_suggestion_close').click(function(event){
  $('#map_suggestion_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden')
      close_modal = '';
    });
})

// $('#suggestion_link').keypress(function(e){
//   if(e.keyCode == 13){
//     $('#suggestion_submit').click();
//     $('#suggestion_close').click();
//   }
// });





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



//add suggestion
$('#add_platupi').click(function(event){
  $('#platupi_overlay').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
  close_modal = '#close_platupi';
})

$('#close_platupi').click(function(event){
  $('#platupi_overlay').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden')
      close_modal = '';
    });
})



//add friends
$('#recover_archive').click(function(event){
  $('#archive_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
  close_modal = '#archive_close';
})

$('#archive_close').click(function(event){
  $('#archive_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden');
      close_modal = '';
    });
})




//this is for the dropdown menu
var timer;
$('#dropdown_menu_trigger').hover(function(){
    clearTimeout( timer );
    $('#dropdown_menu').slideDown(200).css({
    left: $('#dropdown_menu_trigger').position().left - $('#dropdown_menu').width()/4,
    top: $('#heading_container').position().top + $('#heading_container').height(),   
    display: 'block' 
    });
}, function(){
     timer = setTimeout(function(){
         $('#dropdown_menu').slideUp(200, function(){
             $('#dropdown_menu').css('display','none');
         });
     }, 500);
});

$('#dropdown_menu').hover(function(){
    console.log('hello')
    clearTimeout( timer );
}, function(){
     timer = setTimeout(function(){
         $('#dropdown_menu').slideUp(200,function(){
             $('#dropdown_menu').css('display','none');
         });
     }, 500);
});

})//end document ready