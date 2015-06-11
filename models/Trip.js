var mongoose = require('mongoose');
var timestamps = require("mongoose-times");

var Schema = mongoose.Schema;

var TripSchema = new Schema({
  location: String,
  lat: Number,
  lng: Number,
  title: String,
  description: String,
  duration: String,
  start: String,
  finish: String,
  created_by: {
  	type: Schema.ObjectId,
  	ref: "User",
  },
  attending: [{
    user_id: {
    	type: Schema.ObjectId,
    	ref: "User",
    }
  }],
  taken_avatars: [{
  user_id: {
  type: Schema.ObjectId,
  ref: "User"},
  avatar: String,
  }]


});

TripSchema.plugin(timestamps);

module.exports = mongoose.model('Trip', TripSchema);



