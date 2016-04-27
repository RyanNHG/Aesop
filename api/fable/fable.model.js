var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fableSchema = new Schema({
	title: {type: String},
	moral: {type: String},
	body: {type: String}
});

module.exports = mongoose.model('fables', fableSchema);