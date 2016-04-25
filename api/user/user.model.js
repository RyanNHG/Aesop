var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	email: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
	fableData: {
		liked: [Schema.Types.ObjectId],
		disliked: [Schema.Types.ObjectId]
	}
})

module.exports = mongoose.model('users', userSchema);