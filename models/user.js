var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userID			: {type: String, 	required: true, unique: true},
	password		: {type: String, 	required: true},
	isVendedor	: {type: Boolean,	required: true}
});


module.exports = mongoose.model('User', userSchema);
