var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fableSchema = new Schema({
	title: {type: String},
	moral: {type: String},
	body: {type: String},
	emotionData: {
		anger: {type: Number},
		disgust: {type: Number},
		fear: {type: Number},
		joy: {type: Number},
		sadness: {type: Number}
	},
	normalizedEmotionData: {
		anger: {type: Number},
		disgust: {type: Number},
		fear: {type: Number},
		joy: {type: Number},
		sadness: {type: Number}
	}
});

module.exports = mongoose.model('fables', fableSchema);