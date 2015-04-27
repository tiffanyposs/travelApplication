var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var Schema = mongoose.Schema;

var ChatSchema = new mongoose.Schema({
  trip_id: {
    type: Schema.ObjectId,
    ref: 'Trip'
  },
  chat: [{
    user_id: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    message: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
});

ChatSchema.plugin(timestamps);


module.exports = mongoose.model('Chat', ChatSchema);
