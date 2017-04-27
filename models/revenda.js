var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var revendaSchema = Schema({
	cnpj           	: {type: String, maxlength: 14, required : true, unique: true},
	email          	: {type: String, required: true, unique: true},
	razao          	: {type: String, required: true},
  vendedores     	: [{type: Number, ref: 'User'}],
	vendas 					: [{type: Number, ref: 'Venda'}]
});

module.exports = mongoose.model('Revenda', revendaSchema);
