var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var Schema = mongoose.Schema;

var SuggestionSchema = new mongoose.Schema({
  title: String,
  content: String,
  link: String,
  references: [
    {
      name: String,
      ref_id: String
    }
  ],
  geocode: {
    lat: Number,
    lng: Number
  },
  votes: [{
    user_id: {
    type: Schema.ObjectId,
    ref: 'User',
    },
    comment: String,
    vote: Boolean
  }],
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  category_id: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  trip_id: {
    type: Schema.ObjectId,
    ref: 'Trip'
  },
  archived: { type: Boolean, default: false}
});




SuggestionSchema.plugin(timestamps);

module.exports = mongoose.model('Suggestion', SuggestionSchema);
