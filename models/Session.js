var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var Schema = mongoose.Schema;


var SessionSchema = new mongoose.Schema();

SessionSchema.plugin(timestamps);


module.exports = mongoose.model('Session', SessionSchema);

