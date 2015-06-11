var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var Schema = mongoose.Schema;


var MapSchema = new mongoose.Schema();

MapSchema.plugin(timestamps);


module.exports = mongoose.model('Map', MapSchema);

