var mongoose = require('mongoose');
var timestamps = require('mongoose-times');
var Schema = mongoose.Schema;

var SuggestionSchema = new mongoose.Schema({
  title: String,
  content: String,
  link: String,
  upvote: [{
    type: Schema.ObjectId,
    ref: 'User',
    voted: {type: Boolean, default: false}
  }],
  downvote: [{
    type: Schema.ObjectId,
    ref: 'User',
    voted: {type: Boolean, default: false}
  }],
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  category_id: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
});

SuggestionSchema.plugin(timestamps);

module.exports = mongoose.model('Suggestion', SuggestionSchema);
