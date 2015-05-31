var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var Schema = mongoose.Schema;


var InviteSchema = new mongoose.Schema({
  content: String,
  trip_id: {
    type: Schema.ObjectId,
    ref: 'Trip'
  },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  domain_name: String
});

InviteSchema.plugin(timestamps);


module.exports = mongoose.model('Invite', InviteSchema);

