var mongoose = require('mongoose');
var timestamps = require('mongoose-times');
var Schema = mongoose.Schema;


var CategorySchema = new mongoose.Schema({
  name: String,
  trip_id: {
    type: Schema.ObjectId,
    ref: 'Trip'
  }
});

CategorySchema.plugin(timestamps);

module.exports = mongoose.model('Category', CategorySchema);