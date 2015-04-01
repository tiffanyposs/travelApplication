var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var CommentSchema = new mongoose.Schema({
  content: String,
  suggestion_id: String,
  user_id: String
  // suggestion_id: {
  //   type: Schema.ObjectId,
  //   ref: 'suggestions'
  // },
  // user_id: {
  //   type: Schema.ObjectId,
  //   ref: 'users'
  // }
});

CommentSchema.plugin(timestamps);

module.exports = mongoose.model('Comment', CommentSchema);
