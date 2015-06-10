var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var Schema = mongoose.Schema;


var CommentSchema = new mongoose.Schema({
  content: String,
  suggestion_id: {
    type: Schema.ObjectId,
    ref: 'Suggestion'
  },
  category_id: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  trip_id: {
    type: Schema.ObjectId,
    ref: 'Trip'
  },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  archived: { type: Boolean, default: false }
});

CommentSchema.plugin(timestamps);



module.exports = mongoose.model('Comment', CommentSchema);

