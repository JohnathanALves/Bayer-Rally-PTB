var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var vendaSchema = Schema({
  data      : Date,
  produtos  : [{
    codigo    : String,
    descricao  : String,
    classe    : String,
    pontos    : Number,
    preco     : Number,
    qtde      : Number
  }],
  vendedor    : { type: Number, ref: 'User'}
});

module.exports = mongoose.model('Venda', vendaSchema);
