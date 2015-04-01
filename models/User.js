var mongoose = require('mongoose');
var timestamps = require("mongoose-times");
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password: String,
  trips: [{
  	type: Schema.ObjectId,
  	ref: "Trip"
  }]
});

UserSchema.plugin(timestamps);

module.exports = mongoose.model('User', UserSchema);

