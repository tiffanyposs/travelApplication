var express = require('express');
var router = express.Router();

// var Trip = require('../models/Trip.js');
var Chat = require('../models/Chat.js');
var User = require('../models/User.js');

  //!!!!!!!!!!!!!
  //WEBSOCKET STUFF
  var WebSocketServer = require("ws").Server;
  var server = new WebSocketServer({port: 2000});
  var clients = [];

  server.on("connection", function(connection) {

  var updateChatroom = function(trip_id){
  	console.log('update')
  	var chatroom = Chat.find({'trip_id' : trip_id})
  	chatroom.populate('chat.user_id', 'first_name last_name _id taken_avatars');
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
  	});
  	console.log('adding trip')
  }

  // console.log("Client connected!");
  var trip_id = connection.upgradeReq.url.replace('/', '');


  var query = Chat.find({'trip_id' : trip_id});
  console.log(query)
  query.exec(function(err, chats){
    if (err) return handleError(err);
    console.log(chats)
    // checks if this trips chat history exists
    if(chats.length === 0){
    	addChatroom(trip_id, connection)
    }else{
    	updateChatroom(trip_id, connection)
    }
  })

  clients.push(connection);

  connection.on("close", function (){
    var x = clients.indexOf(connection);
    clients.splice(x, 1);
    console.log("client exited") 
  });


  connection.on("message", function(message){
    console.log(message)
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
