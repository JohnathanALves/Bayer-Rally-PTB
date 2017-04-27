var Produto = require('../models/produto');

module.exports = function(req, res, next){
  var codeProd = req.body.codigo,
    descProd  = req.body.descricao,
    classe    = req.body.classe,
    pontos    = req.body.pontos;

  if(codeProd == undefined || descProd == undefined || pontos == undefined){
    return res.json('erro undefined');
  }
  var produto = new Produto();
  produto.codigo      = codeProd;
  produto.descricao   = descProd;
  produto.classe      = classe;
  produto.pontos      = pontos;
  produto.save(function(err){
    if(err){
      console.log('erro ao adicionar produto: '+ err);
      return res.json('erro cadastro de novo produto');
    }
    return res.json('adicionado com sucesso');
  });
}
