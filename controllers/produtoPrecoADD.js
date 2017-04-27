var Moment  = require('moment');
var Produto = require('../models/produto');


module.exports = function(req, res, next){
  var data_in = req.query.dtin,
    data_fim  = req.query.dtfim,
    preco     = req.query.preco,
    codigoProd= req.query.codigo;


  if(data_in == undefined || data_fim == undefined || preco == undefined){
    return res.json('erro undefined');
  }

  Produto.findOne({'codigo' : codigoProd}, function(err, produto){
    if(err){
      console.log('Erro ao encontrar produto: ' + err );
      return res.json('Erro ao encontrar produto: ' + err);
    }
    if(produto){
      var array = {
        'data_in'   : Moment(data_in, 'DD-MM-YYYY'),
        'data_fim'  : Moment(data_fim,'DD-MM-YYYY'),
        'preco'     : preco
      };
      produto.push(array);
      console.log('NOvo preco adicionado a: '+ produto.codigo);
      return res.json('Novo Preco adicionado.');
    }
  });
}
