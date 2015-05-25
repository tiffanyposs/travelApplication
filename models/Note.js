var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var Schema = mongoose.Schema;


var NoteSchema = new mongoose.Schema({
  name: String,
  email: String,
  note: String
});

NoteSchema.plugin(timestamps);


module.exports = mongoose.model('Note', NoteSchema);

