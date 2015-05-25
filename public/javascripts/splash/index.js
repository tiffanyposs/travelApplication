

//tracks the open modalexca
var close_modal;

$(document).keydown(function(e) {
  if (e.keyCode == 27){
    $(close_modal).click();
  }
});

var betaModal = function(first, last){


//adds a trip
// $('#current_trip').click(function(event){
  $('#beta_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300)
      .zIndex('200')
  close_modal = '#beta_close';
// })

$('#beta_close').click(function(event){
  $('#beta_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden').zIndex('-100')
      close_modal = '';
    });
});



// $('#trip_end_date').keypress(function(e){
//   if(e.keyCode == 13){
//     $('#trip_add').click();
//     $('#modal_close').click();
//   }
// });

}


var submitBeta = function(){


var first_name = $('#first_name').val();
var last_name = $('#last_name').val();
var email = $('#beta_email').val();
var group_size = $('#group_size').val();


	if(first_name != "" && last_name != "" && email != "" && group_size != ""){

	  var formData = {
	    first_name: $('#first_name').val(),
	    last_name: $('#last_name').val(),
	    email: $('#beta_email').val(),
	    group_size: $('#group_size').val(),

	  }

	  $('#beta_apply input').each(function(each){
	        this.value = '';
	   })

	    $.ajax({
	      url: '/betas',
	      type: 'POST',
	      data: formData,
	      success: function(data, textStatus, jqXHR)
	        {
	        	betaModal(formData.first_name, formData.last_name)
	        }
	    });  

	}

}



var noteModal = function(name){
	//adds a trip
// $('#current_trip').click(function(event){
  $('#note_modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300)
      .zIndex('200')
  close_modal = '#note_close';
// })

$('#note_close').click(function(event){
  $('#note_modal').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300,
    function(){
      $(this).css('visibility', 'hidden').zIndex('-100')
      close_modal = '';
    });
});



// $('#trip_end_date').keypress(function(e){
//   if(e.keyCode == 13){
//     $('#trip_add').click();
//     $('#modal_close').click();
//   }
// });


}



var submitNote = function(){

	var formData = {
	    name: $('#name').val(),
	    email: $('#email_note').val(),
	    note: $('#note').val()
  }

  $('#contact_us input').each(function(each){
        this.value = '';
   })

  $('#contact_us textarea').val('')

    $.ajax({
      url: '/notes',
      type: 'POST',
      data: formData,
      success: function(data, textStatus, jqXHR)
        {
        	noteModal(formData.name)
        	// console.log('hi')
        }
    });  

}







$('#submit_beta').click(function(){
	submitBeta()
})

$('#note_submit').click(function(){
	submitNote()
})

