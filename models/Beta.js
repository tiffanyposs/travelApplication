var mongoose = require('mongoose');
var timestamps = require('mongoose-times');

var Schema = mongoose.Schema;


var BetaSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	group_size: String
});

BetaSchema.plugin(timestamps);

module.exports = mongoose.model('Beta', BetaSchema);