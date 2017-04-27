var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var vendaSchema = Schema({
  _id       :  {type: Number},
  data      : Date,
  produtos  : [{
    codigo    : String,
    descicao  : String,
    classe    : String,
    pontos    : Number,
    preco     : Number
  }],
  vendedor    : { type: Number, ref: 'User'}
});

userSchema.plugin(autoIncrement.plugin, 'Venda');
module.exports = mongoose.model('Venda', vendaSchema);
