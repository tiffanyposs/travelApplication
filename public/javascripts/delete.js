$('#suggestion_delete').click(function(e){

	var archive = {
		archived: true
	}

    $.ajax({
            url: current_url + "suggestions/archive/" + current_suggestion,
            type: 'PUT',
            data: archive,
            timeout: 15000,
    });

    //removes the archived suggestion
    $('#' + current_suggestion).remove()
    //closes the modal
    $('#edit_close').click()
    //clicks a new suggestion
    $('#suggestion_content div').first().click();
})

