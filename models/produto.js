
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var produtoSchema = Schema({
  codigo    : {type: Number, required: true, unique: true},
  descricao : {type: String, required: true},
  classe    : {type: String, required: true},
  pontos    : {type: Number, required: true},
  precoTab  : [{
    data_in   : Date,
    data_fim  : Date,
    preco     : Number,
  }]
});

module.exports = mongoose.model('Produto', produtoSchema);
