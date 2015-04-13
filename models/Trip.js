var mongoose = require('mongoose');
var timestamps = require("mongoose-times");
var Schema = mongoose.Schema;

var TripSchema = new Schema({
  location: String,
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
  	type: Schema.ObjectId,
  	ref: "User",
  }]
});

TripSchema.plugin(timestamps);

module.exports = mongoose.model('Trip', TripSchema);




