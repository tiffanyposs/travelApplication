var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var Schema = mongoose.Schema;


var CommentSchema = new mongoose.Schema({
  content: String,
  suggestion_id: {
    type: Schema.ObjectId,
    ref: 'Suggestion'
  },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
});

CommentSchema.plugin(timestamps);


module.exports = mongoose.model('Comment', CommentSchema);

