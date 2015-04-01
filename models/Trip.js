var mongoose = require('mongoose');
var timestamps = require("mongoose-times");
var Schema = mongoose.Schema;

var TripSchema = new Schema({
  // user_id: String,tds
  location: String,
  title: String,
  description: String,
  duration: String,
  start_date: String,
  finish_date: String,
  created_by: [{
  	type: Schema.ObjectId,
  	ref: "User",
  }],
  attending: [{
  	type: Schema.ObjectId,
  	ref: "User"
  }]
});

TripSchema.plugin(timestamps);

module.exports = mongoose.model('Trip', TripSchema);




