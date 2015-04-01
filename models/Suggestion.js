cvar mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var SuggestionSchema = new mongoose.Schema({
  title: String,
  content: String,
  link: String,
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  user_id: String,
  category_id: String
  // user_id: {
  //   type: Schema.ObjectId,
  //   ref: 'users'
  // },
  // category_id: {
  //   type: Schema.ObjectId,
  //   ref: 'categories'
  // },
});

SuggestionSchema.plugin(timestamps);

module.exports = mongoose.model('Suggestion', SuggestionSchema);
