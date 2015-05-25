var loginModal = function(){

// $('#current_trip').click(function(event){
  $('#login_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300)
      .zIndex('200')
  close_modal = '#login_close';
// })

$('#login_close').click(function(event){
  $('#login_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden').zIndex('-100')
      close_modal = '';
    });
});


}



$('#sign_in').click(function(){
  loginModal()
})