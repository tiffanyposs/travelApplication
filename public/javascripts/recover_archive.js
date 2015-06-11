// $('#archived')

// $(document).ready(function(){



$('#recover_archive').click(function(){


var renderArchiveSuggestions = function(suggestions){


	var heading_div = $('<div></div>').attr('class', 'archive_heading_card');
	var heading = $('<h3></h3>').text('Archived Suggestions');

	heading_div.append(heading);
	$('#archived').append(heading_div);

	suggestions.forEach(function(suggestion, index){

		console.log(suggestion)
		var suggestion_card = $('<div></div>').attr('class', 'archive_card');
		suggestion_card.attr('id', suggestion._id);
		var category = $('<h3></h3>').text('Category: ' + suggestion.category_id.name);
		var suggestion_title = $('<p></p>').text('Comment: ' + suggestion.title);
		var add_button = $('<button></button>').attr('class', 'fa fa-plus-circle');
		// add_button.attr('class', comment._id)
		suggestion_title.append(add_button);

		suggestion_card.append(category, suggestion_title)
		$('#archived').append(suggestion_card);

		add_button.click(function(){
			//romoves from immediate comments
			$('#' + suggestion._id).remove()

			var archive = {
				archived: false,
			}

		    $.ajax({
		            url: current_url + "suggestions/archive/" + suggestion._id + '/recover',
		            type: 'PUT',
		            data: archive,
		            timeout: 15000,
		    });	//ajax to fix


		    // if the deleted comment is part of the currently selected suggestion
		    if(current_category === suggestion.category_id._id){
		    	getLastSuggestion();
		    }


		})

	if(index === suggestions.length - 1){
		getArchivedComments()
	}

	})



}




  $.ajax({
    url: current_url + 'suggestions/archive/' + current_user + '/all', 
    dataType: 'json',
    success: function(data){
    	console.log(data)
    	if(data.length > 0){
    		renderArchiveSuggestions(data)
    	}else{
    		getArchivedComments()
    	}
    }
  });





})



//this empties all of the content
$('#archive_close').click(function(){
	$('#archived').empty();
})

// })