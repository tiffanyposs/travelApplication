var renderBetas = function(data){
	var counter = 0;
	data.forEach(function(beta){
		counter++;
		var number = $('<td></td>').text(counter);
		var first_name = $('<td></td>').text(beta.first_name);
		var last_name = $('<td></td>').text(beta.last_name);
		var email = $('<td></td>').text(beta.email);
		var group_size = $('<td></td>').text(beta.group_size);
		var date = $('<td></td>').text(moment(beta.created));

		var row = $('<tr></tr>')

		row.append(number, first_name, last_name, email, group_size, date);

		$('#beta_email').append(row)
	})
}


var allBetas = function(){
    $.ajax({
    url: current_url + '/betas',
    dataType: 'json',
    success: function(data){
        console.log(data);
        renderBetas(data)
    }
    });	
}

allBetas();
//end session



var renderNotes = function(data){
	var counter = 0;
	data.forEach(function(note){
		counter++;
		var number = $('<td></td>').text(counter);
		var name = $('<td></td>').text(note.name);
		var email = $('<td></td>').text(note.email);
		var note = $('<td></td>').text(note.note);
		var date = $('<td></td>').text(moment(note.created));

		var row = $('<tr></tr>');

		row.append(number, name, email, note, date)

		$('#note_list').append(row)
	})
	
}



var allNotes = function(){
    $.ajax({
    url: current_url + '/notes',
    dataType: 'json',
    success: function(data){
        renderNotes(data)
    }
    });
}

allNotes();
//end session