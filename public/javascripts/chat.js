// need to have variable outside so its can close
// existing websockets if needed
var client;
//this is called from the trip card on click
var makeNewWebsocket = function(){

$('#chat').empty();

if(client != undefined){
  client.close();
  client = undefined;
}

// client = new WebSocket("ws://localhost:2000/" + current_trip);

//test server
client = new WebSocket("ws://45.55.221.131:2000/" + current_trip);

//tripppper

//production server
// client = new WebSocket("ws://104.131.57.112:2000/" + current_trip);

$('#chat_submit').click(function(){
  if($('#chat_input_box').val().trim() != ""){
  var msg = {
    trip_id: current_trip,
    name: current_user_name,
    user_id: current_user,
    message: $('#chat_input_box').val().trim(),
    avatar: current_avatar
  }
 

  var encoded_msg = JSON.stringify(msg);
  client.send(encoded_msg)
   $('#chat_input_box').val('');
  }
})


// $('#comment_input_area').blur();

$('#chat_input_box').keypress(function(e){
  if(e.keyCode == 13 && $('#chat_input_box').val().trim() != ""){
    e.preventDefault();
    $('#chat_submit').click();
  }
});


// listen for messages
client.addEventListener("message", function(message){

  // console.log(message)
  var hash_message = JSON.parse(message.data)
  // console.log(hash_message)
  var new_chat_card = $('<div></div>')


  //controls if the content is rendered as current user or other user
  if(hash_message.user_id === current_user || hash_message.user_id._id === current_user){
    new_chat_card.attr('class', 'chat_card chat_card_current');
  }else{
    new_chat_card.attr('class', 'chat_card chat_card_other');
  }

  var avatar_div = $('<div></div>');

  if(hash_message['name']){
    var name = $('<h4></h4>').text(hash_message['name'])
  }else{
    var fullname = hash_message.user_id.first_name + ' ' + hash_message.user_id.last_name;
    var name = $('<h4></h4>').text(fullname);
  }

        var avatar;
        var platupus = $('<img>')

        //this is for loading the old messages from the database
        if(hash_message.user_id.taken_avatars){
        if(hash_message.user_id.taken_avatars.length === 0){
            avatar = '/images/users.jpg'
            if(hash_message.user_id === current_user){
              platupus.attr('class', 'current_user_avatar')
            }
        }else{
            // this sets the avatar for each
            hash_message.user_id.taken_avatars.forEach(function(each, index){
                if(hash_message.user_id._id === current_user){
                  platupus.attr('class', 'current_user_avatar')
                }
                if(each.trip_id === current_trip){
                    avatar = '/images/hats/color_hats/' + each.avatar;
                }
            })
        }
      }else{
        avatar = hash_message.avatar
        if(hash_message.user_id === current_user){
          platupus.attr('class', 'current_user_avatar')
        }
      }


  platupus.attr('src', avatar);
  avatar_div.append(platupus, name);
  new_chat_card.append(avatar_div);

  var split_message = hash_message.message.split(' ');

  var message_section = []


  var counter = 0
  var content_div = $('<div></div>');
  split_message.forEach(function(word, index){
    var end_digits = word.charAt(word.length-3) + word.charAt(word.length-2) + word.charAt(word.length- 1);
    var first_digits = word.charAt(0) + word.charAt(1) + word.charAt(2) + word.charAt(3);
    if(end_digits === "jpg" || end_digits === "png" || end_digits === "gif"){
      var image = $('<img>').attr('src', word);
      var image_div = $('<div></div>');
      image_div.append(image);
      content_div.prepend(image_div);
      }else if(first_digits === "http" || first_digits === "www."){
        if(message_section.length > 0){
          var p = $('<p></p>').text(message_section.join(' '))
          content_div.append(p)
          message_section = [];
        }
        var link = $('<a></a>').attr('href', word).text(word);
        link.attr('target', '_blank')
        content_div.append(link)
      }else{
        message_section.push(word)
      }

      if(index === split_message.length - 1){

        if(message_section.length > 0){
          var card_content = $('<p></p>').text(message_section.join(' '));
          content_div.append(card_content);
        }
        new_chat_card.append(content_div) 
      }
  })
  $('#chat').append(new_chat_card)
  //scrolls down
  $('#chat').stop().animate({
    scrollTop: $("#chat")[0].scrollHeight
  }, 1000);

});

}

//this changes the group chat and closes the rest
$('#group_chat').click(function(){
  $('#suggestion_container, #map-container').hide('slow', function(){
    $('#chat_container').show('slow')
    $('#chat').stop().animate({
      scrollTop: $("#chat")[0].scrollHeight
    }, 100);

  });

})

//this opens explore
$('#explore').click(function(){

$('#chat_container').hide('slow', function(){
    $('#suggestion_container, #map-container').show('slow');
}); 

})
