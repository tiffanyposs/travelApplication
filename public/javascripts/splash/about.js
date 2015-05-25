	$('.image_div').hover(function(){
		$(this).find($('.pic_note')).delay(200).slideDown(400);
	}, function(){
		$(this).find($('.pic_note')).delay(600).slideUp(400);
	}
	)