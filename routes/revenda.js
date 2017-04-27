var express = require('express');
var router  = express.Router();

module.exports = function(passport){


  router.post('/vendedor/novo', function(req, res, next){
		if(req.isAuthenticated()){
			if(!req.user.isVendedor){
				var cadastra = require('../controllers/vendedorSignup')(req, res, next);
			} else {
				return res.json({status:'false'});
			}
		}
  });

	 router.post('/produto/novo', function(req, res, next){
	 	var novoProduto = require('../controllers/produtoCreate')(req, res, next);
	 });

  return router;
}
