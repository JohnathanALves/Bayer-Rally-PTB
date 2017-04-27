var Produto = require('../models/produto');
var Venda   = require('../models/venda');
var Moment  = require('moment');

module.exports = function(req, res, next){
  var produtos = req.body.produtos;
  var dataPed  = moment(req.body.dataPed);
  var venda    = new Venda();
  var productArray = [];
  for (int i = 0; i< produtos.lenght(); i++){ // array de produtos
      productArray[i] = {
        codigo      : codigo,
        descricao   : descricao,
        classe      : classe,
        pontos      : pontos,
        preco       : preco,
        qtde        : qtde
      };
  }
  venda.data  = dataPed;
  venda.vendedor = req.user._id;
  venda.produtos = productArray;
  venda.save(function(err){
    if(err){
      console.log('Erro ao salvar venda: '+err);
      return res.json({status: 'false'});
    }
    return res.json({status: true});
  });
}
