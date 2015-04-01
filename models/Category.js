var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var CategorySchema = new mongoose.Schema({
  name: String,
  // trip_id: {
  //   type: Schema.ObjectId,
  //   ref: 'trips'
  // }
  trip_id: String
});

CategorySchema.plugin(timestamps);

module.exports = mongoose.model('Category', CategorySchema);