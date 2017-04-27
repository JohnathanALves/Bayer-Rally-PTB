var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendedorSchema = new Schema({
	cpf					: {type: String, maxlength: 11, unique: true},
	email				: {type: String, required: true, unique: true},
	fullName		: {type: String, required: true},
	revenda			: { type: Number, ref: 'Revenda' }
});


module.exports = mongoose.model('Vendedor', vendedorSchema);
