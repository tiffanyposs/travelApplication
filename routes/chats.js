var express = require('express');
var router = express.Router();


// var Trip = require('../models/Trip.js');
var Chat = require('../models/Chat.js');


//!!!!!!!!!!!!!
//WEBSOCKET STUFF
var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 2000});
var clients = [];



server.on("connection", function(connection) {

var updateChatroom = function(trip_id){
	console.log('update')
	var chatroom = Chat.find({'trip_id' : trip_id})
	chatroom.populate('chat.user_id', 'first_name last_name _id');
	chatroom.exec(function(err, chats){
		chats[0].chat.forEach(function(each){
			var encoded_msg = JSON.stringify(each);
			connection.send(encoded_msg)
		})
	})
}

var addChatroom = function(trip_id){
	var trip = {
		trip_id: trip_id
	}
	Chat.create(trip, function (err, chat) {
	    if (err) return next(err);
	    // res.json(comments);
	    // console.log(chat)
	});
	console.log('adding trip')
}



  console.log("Client connected!");
  // console.log(connection.upgradeReq.url);

  var trip_id = connection.upgradeReq.url.replace('/', '');
  // console.log(trip_id);


  var query = Chat.find({'trip_id' : trip_id});
  console.log(query)
  query.exec(function(err, chats){
    if (err) return handleError(err);
    console.log(chats)
    // checks if this trips chat history exists
    if(chats.length === 0){
    	// console.log("it doesn't exist")
    	addChatroom(trip_id, connection)
    }else{
    	// console.log('it exists')
    	updateChatroom(trip_id, connection)
    }
    // res.json(comments)
    // console.log(chats)
  })

  clients.push(connection);

  connection.on("close", function (){
    var x = clients.indexOf(connection);
    clients.splice(x, 1); 
  });


  connection.on("message", function(message){
    // console.log(message)
    var msg = JSON.parse(message);

    var msg_data = {
    	user_id: msg.user_id,
    	message: msg.message
    }

	  Chat.update(
	    {"trip_id": msg.trip_id},
	    {$push: {"chat": msg_data}},
	    function(err, chat) {
	        // console.log(chat);
	    }
	  );



    clients.forEach(function(client){
        // client.send(msg);
        console.log(client.upgradeReq.url)
        if(client.upgradeReq.url === '/' + msg.trip_id){
          client.send(message)
        }
      });

  });
});




module.exports = router;
