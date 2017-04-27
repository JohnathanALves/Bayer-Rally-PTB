var Produto = require('../models/produto');

module.exports = function(req, res, next){
  Produto.find({})
}
