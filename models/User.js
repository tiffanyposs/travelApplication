var mongoose = require('mongoose');
var timestamps = require("mongoose-times");

var Schema = mongoose.Schema;


var UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password: String,
  image: String,
  trips: [{
    trip_id: {
  	type: Schema.ObjectId,
  	ref: "Trip"
    }
  }],
  friends: [{
  	type: Schema.ObjectId,
  	ref: "User"
  }],
  taken_avatars: [{
    trip_id: {
      type: Schema.ObjectId,
      ref: "Trip"
    },
    avatar: String
  }],
  last_trip: {
    type: Schema.ObjectId,
    ref: "Trip"
  }
});

UserSchema.plugin(timestamps);




module.exports = mongoose.model('User', UserSchema);

