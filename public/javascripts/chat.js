

  

//use this code for testing locally
$('#group_chat').click(function(){


$('#chat').empty();
//local
// var client = new WebSocket("ws://localhost:2000/" + current_trip);

//test server
// var client = new WebSocket("ws://45.55.221.131:2000/" + current_trip);

//tripppper
var client = new WebSocket("ws://tripppper.com:2000/" + current_trip);



$('.nav_clicked').attr('class', '');
$(this).attr('class', 'group_clicked');


$('#chat_submit').click(function(){
  var msg = {
    trip_id: current_trip,
    name: current_user_name,
    user_id: current_user,
    message: $('#chat_input_box').val()
  }
  var encoded_msg = JSON.stringify(msg);
  client.send(encoded_msg)
  $('#chat_input_box').val('')
})


$('#chat_input_box').keypress(function(e){
  if(e.keyCode == 13){
    $('#chat_submit').click();
  }
});


// listen for messages
client.addEventListener("message", function(message){
  var hash_message = JSON.parse(message.data)
  // console.log(hash_message)
  var new_chat_card = $('<div></div>')

  //controls if the content is rendered as current user or other user
  if(hash_message.user_id === current_user || hash_message.user_id._id === current_user){
    new_chat_card.attr('class', 'chat_card chat_card_current');
  }else{
    new_chat_card.attr('class', 'chat_card chat_card_other');
  }
  

  if(hash_message['name']){
    var name = $('<h3></h3>').text(hash_message['name'])
  }else{
    var fullname = hash_message.user_id.first_name + ' ' + hash_message.user_id.last_name;
    var name = $('<h3></h3>').text(fullname);
  }



  var split_message = hash_message.message.split(' ');

  var message_section = []


  var counter = 0
  split_message.forEach(function(word, index){
    var end_digits = word.charAt(word.length-3) + word.charAt(word.length-2) + word.charAt(word.length- 1);
    var first_digits = word.charAt(0) + word.charAt(1) + word.charAt(2) + word.charAt(3);
    if(end_digits === "jpg" || end_digits === "png" || end_digits === "gif"){
      var image = $('<img>').attr('src', word).css('width', '400px');
      new_chat_card.prepend(image)
      }else if(first_digits === "http" || first_digits === "www."){
        if(message_section.length > 0){
          new_chat_card.append(message_section.join(' '))
          message_section = [];
        }
        var link = $('<a></a>').attr('href', word).text(word);
        link.attr('target', '_blank')
        new_chat_card.append(link);
      }else{
        message_section.push(word)
      }
      console.log(index)
      console.log(split_message.length - 1 )
      if(index === split_message.length - 1 && message_section.length > 0){
        var card_content = $('<p></p>').text(message_section.join(' '))
        new_chat_card.append(card_content)    
      }
  })




  new_chat_card.prepend(name)
  $('#chat').append(new_chat_card)

  //scrolls down
  $('#chat').stop().animate({
    scrollTop: $("#chat")[0].scrollHeight
  }, 1000);

});

  //toggles the chat
  $('#suggestions, #comments_container').hide('slow', function(){
    $('#chat_container').show('slow')
    $('#chat').stop().animate({
      scrollTop: $("#chat")[0].scrollHeight
    }, 100);

    // $('#chat').scrollTop($('#chat')[0].scrollHeight)
  });
  


})




