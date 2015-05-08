

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
	console.log(current_platupus);
})


$('#choose_avatar').click(function(){
	$('#close_platupi').click();
})

})